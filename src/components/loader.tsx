"use client";
import { useLoaderContext } from "@/core/context/LoaderContext";
import {Spinner} from "@heroui/spinner";
import React from 'react';

const loader: React.FC = () => {
    const { isLoading, canSee } = useLoaderContext();

    return (
        <div className={`appLoader ${canSee ? "bg-neutral-600 bg-opacity-50" : "bg-white"}  ${isLoading ? "isLoading" : "isLoaded"}`}>
            <Spinner />
        </div>
    );
};

export default loader;