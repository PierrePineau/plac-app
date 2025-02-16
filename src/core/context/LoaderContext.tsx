import React, { createContext, useContext, useState, ReactNode } from "react";
import Loader from "@/components/loader";

interface LoaderContextProps {
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps>({
	isLoading: false,
	setIsLoading: () => {},
});

export const useLoaderContext = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	
	return <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
		<Loader />
		{children}</LoaderContext.Provider>;
};