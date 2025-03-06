"use client";
import Btn from "@/components/btn";
import { get } from "@/core/services/api.helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OauthConnect = () => {
    const router = useRouter();
    const [loading, setIsLoading] = useState(false);
    const [currentProvider, setCurrentProvider] = useState("");
    const providers = [
        {
            identifier: "google",
            name: "Google",
            icon: "/asset/img/googleLogo.svg",
        },
        // {
        //     name: "Facebook",
        //     icon: "/asset/img/facebookLogo.svg",
        //     url: "/auth/facebook"
        // }
    ];

    const getOauthUrl = async (provider: string) => {
        setCurrentProvider(provider);
        setIsLoading(true);
        console.log("provider:", provider);
        
        const response = await get<ResponseApi>(`/api/oauth/connect/${provider}`);
        console.log("resp:", response);
        if (response.success && response.data) {
            const redirectUrl = response.data.targetUrl ? response.data.targetUrl : response.data[0].targetUrl;
            console.log("targetUrl:", redirectUrl);
            router.push(redirectUrl);
        }
        setIsLoading(false);
    };

    // On check dans l'url si on a un code pour se connecter
    useEffect(() => {
        // Params
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("oauth");

        console.log("params:", Object.fromEntries(urlParams.entries()));

        // Headers
    }, []);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center my-4 w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 text-sm">OU</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <ul>
                {
                    providers.map((provider, index) => (
                        <li>
                            <Btn
                                key={index}
                                variant="light"
                                className="w-full"
                                onPress={() => getOauthUrl(provider.identifier)}
                                isLoading={loading && currentProvider === provider.identifier}
                                isDisabled={loading}
                            >
                                <img
                                    src={provider.icon}
                                    alt={provider.name}
                                    width="25"
                                    height="25"
                                />
                                Se connecter avec {provider.name}
                            </Btn>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default OauthConnect;