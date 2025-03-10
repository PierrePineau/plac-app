"use client";
import Btn from "@components/btn";
import { get } from "@/core/services/api.helper";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { useLoaderContext } from "@/core/context/LoaderContext";

const OauthConnect = () => {
    const router = useRouter();
    const [providerLoading, setProviderLoading] = useState(false);
    const {isLoading, setIsLoading} = useLoaderContext();
    const [currentProvider, setCurrentProvider] = useState("");
    const { authenticateUserByToken } = useAuthStore();
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
        setProviderLoading(true);
        
        const response = await get<ResponseApi>(`/api/oauth/connect/${provider}`);
        if (response.success && response.data) { 
            const data = response.data as {
                targetUrl: string;
                service: string;
            };                             
            router.push(data.targetUrl);
        }
        setProviderLoading(false);
    };

    const getOauthUser = async (token: string) => {
        setIsLoading(true);
        const isAuth = await authenticateUserByToken(token);
        setIsLoading(false);

        if (isAuth) {
            router.push("/");
        }
    }

    // On check dans l'url si on a un code pour se connecter
    useEffect(() => {
        // Params
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("oauth");
        // On récupère le cookie "oauth_token" pour se connecter
        const token = urlParams.get("token");

        // Je voudrais retirer le code/token de l'url
        if (token) {
            window.history.replaceState({}, document.title, "/login");
        }

        if (code && token) {
            getOauthUser(token);
        }

        return () => {
            setIsLoading(false);
        }
    }, []);


    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center my-4 w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 text-sm">OU</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <ul>
                {
                    providers.map((provider, index) => (
                        <li key={index}>
                            <Btn
                                key={index}
                                variant="light"
                                className="w-full"
                                onPress={() => getOauthUrl(provider.identifier)}
                                isLoading={providerLoading && currentProvider === provider.identifier}
                                isDisabled={providerLoading}
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