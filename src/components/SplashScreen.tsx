"use client";
import {Spinner} from "@heroui/spinner";
import React, { useEffect, useState } from 'react';

const Splashscreen: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        if (document.readyState === "complete") {
            setLoading(false);
        }else {
            window.addEventListener("load", handleLoad, { once: true });

            return () => {
                window.removeEventListener("load", handleLoad);
            };
        }
    }, []);

    // FOR TESTING
    // return (
    //     <div className="AppLoader">
    //         <Spinner />
    //     </div> 
    // );

    return (
        <div className={`splashScreen ${loading ? "isLoading" : "isLoaded"}`}>
            <Spinner />
        </div>
    );
};

export default Splashscreen;