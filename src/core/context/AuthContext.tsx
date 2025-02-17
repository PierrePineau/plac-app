import React, { createContext, useContext, useState, ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuthStore } from "@/store/admin/adminAuthStore";
import { useAuthStore } from "@/store/user/useAuthStore";

interface AuthContextProps {
	user: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState({});
	const { isAdminAuthenticated } = useAdminAuthStore();
	const { isAuthenticated } = useAuthStore();

	// const router = useRouter();
	// useEffect(() => {
	// 	const token = localStorage.getItem("adminToken");
	// 	if (!token) {
	// 		router.push("/admin/login");
	// 	}
	// }, [router]);
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
	const [render, setRender] = useState(false);
	useEffect(() => {
    	// const tokenKey = role === "ROLE_ADMIN" ? "adminToken" : "userToken";
		const token = localStorage.getItem("jwtToken");
		if (!token) {
			router.push("/admin/login");
		}

		if (token) {
			setRender(true);
		}
	}, [router]);
    
	if (!render) {
		return <></>;
	}else {
		return children as JSX.Element;
	}
}
