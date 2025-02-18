import { create } from "zustand";
import { post, get } from "../core/services/api.helper";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
	iat: number;
	exp: number;
	roles: string[];
	username: string; // email
}

interface AuthResponse {
	token: string;
    [key: string]: any;
}

interface AuthState {
	user: AuthenticateUser | null;
	isAuthenticated: boolean;
	checkAuth: (role: string) => Promise<boolean>;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string, authTarget? : string) => Promise<boolean>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	checkAuth: async (role) => {
		try {
			const token = localStorage.getItem("jwtToken");
			if (!token) {
				set({ isAuthenticated: false });
				return false;
			}
			const decoded = jwtDecode<JwtPayload>(token);
			// console.log(token);
			
			// On vérifie si le token est encore valide
			// TODO : Auto refresh token
			if (decoded.exp * 1000 < Date.now()) {
				set({ isAuthenticated: false });
				return false;
			}

			// On vérifie si le role est bon
			if (!decoded.roles.includes(role)) {
				set({ isAuthenticated: false });
				return false;
			}

			set({
				user: {
					email: decoded.username,
					roles: decoded.roles,
				},
				isAuthenticated: true,
			});
			// console.log({
			// 	user: {
			// 		email: decoded.username,
			// 		roles: decoded.roles,
			// 	},
			// 	isAuthenticated: true,
			// });
			
			return true;
		} catch (error) {
			set({ isAuthenticated: false });
		}
		return false;
	},
	isLoading: false,
	error: null,
	login: async (email, password, authTarget = "user") => {
		set({ isLoading: true, error: null, user: null });
		try {
            // Si on lui passe n'importe qui il passera par le login user
            const path = authTarget === "admin" ? "/api/admin/login_check" : "/api/app/login_check";
			const data = await post<AuthResponse>(path, { username: email, password }, { skipAuth: true });
			if ("token" in data && typeof data.token === "string") {
				const decoded = jwtDecode<JwtPayload>(data.token);
				localStorage.setItem("jwtToken", data.token);
				// localStorage.setItem("userId", decoded.username);
			    set({ user: {
                    email: decoded.username,
                    roles: decoded.roles
                }, isLoading: false, isAuthenticated: true });

				console.log(data);
				// const { setUser } = 
				return true;
			}
			console.log(data);

			return false;
		} catch (error) {
			set({ isAuthenticated: false, isLoading: false });
			set({ error: "Invalid credentials or network error", isLoading: false });

			return false;
		}
	},
	logout: async () => {
		try {
			// await get("/api/logout", { authTarget: "user" }); // Balek de se logout sur l'api
			set({ user: null, isAuthenticated: false });
			localStorage.removeItem("jwtToken"); // On retir aussi le token admin
		} catch (error) {}
	},
}));
