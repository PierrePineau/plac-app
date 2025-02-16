import React, { createContext, useContext, useState, ReactNode } from "react";
import Loader from "@/components/loader";

interface LoaderContextProps {
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	canSee: boolean;
	setCanSee: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps>({
	isLoading: false,
	setIsLoading: () => {},
	canSee: true,
	setCanSee: () => {},
});

export const useLoaderContext = () => useContext(LoaderContext);

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [canSee, setCanSee] = useState(true);
	
	return <LoaderContext.Provider value={{ isLoading, setIsLoading, canSee, setCanSee: () => {} }}>
		<Loader />
		{children}</LoaderContext.Provider>;
};