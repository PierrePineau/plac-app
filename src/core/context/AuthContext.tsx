import React, { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

interface AuthContextProps {
	user: AuthenticateUser | null;
}

const AuthContext = createContext<AuthContextProps>({
	user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { user } = useAuthStore();
	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export function AuthGuard({
	children,
	role = "ROLE_USER",
 }: {
	children: React.ReactNode;
	role: "ROLE_ADMIN" | "ROLE_USER";
}) {
	const router = useRouter();
	const { checkAuth } = useAuthStore();
	const [render, setRender] = useState(false);
	
	useEffect(() => {
		setRender(false);
		
		checkAuth(role).then((bool) => {
			if (!bool) {
				router.push("/login");
				setRender(false);
				return;
			}

			// if (!user) {
			// 	console.log("No user");
			// 	router.push("/login");
			// 	setRender(false);
			// 	return;
			// }

			// // En fonction du role demandé, je voudrais vérifié si l'utilisateur a le bon role. (Si l'utilisateur à le role ROLE_SUPER_ADMIN, il a aussi ROLE_ADMIN et ROLE_USER)
			// if (!user.roles.includes(role) && !user.roles.includes("ROLE_SUPER_ADMIN")) {
			// 	router.push("/login");
			// 	setRender(false);
			// 	return;
			// }

			setRender(true);
		});

	}, []);
    
	if (!render) {
		return <></>;
	}else {
		return children as JSX.Element;
	}
}
