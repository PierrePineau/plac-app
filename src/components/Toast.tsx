import { Alert } from "@heroui/react";
import React from "react";

interface ToastProps {
    color?: "default" | "primary" | "secondary" | "success" | "danger" | "warning";
	children: React.ReactNode;
	className?: string;
}

export default function Toast({ children, className = "", color = "default" }: ToastProps) {
	// On fait un merge de la classe par défaut avec la classe passée en props
	return (
        <div className="fixed bottom-0 right-0 p-4 z-50">
            <Alert color={color} className={`rounded-md ${className}`}>
                {children}
            </Alert>
        </div>
	);
}
