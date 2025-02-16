"use client";
import { useLoaderContext } from "@/core/context/LoaderContext";
import {Spinner} from "@heroui/spinner";
import React, { useEffect } from 'react';

const loader: React.FC = () => {
    const { isLoading } = useLoaderContext();

    return (
        <div className={`appLoader bg-neutral-600 bg-opacity-50 ${isLoading ? "isLoading" : "isLoaded"}`}>
            <Spinner />
        </div>
    );
};

export default loader;