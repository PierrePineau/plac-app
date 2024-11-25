import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
import { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  crossOrigin: "anonymous",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
        locale: false,
      },
    ]
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*", // You can specify the domains you want to allow here
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,POST,PUT,DELETE,OPTIONS",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "X-Requested-With, Content-Type, Authorization",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

const config = (phase: string): NextConfig => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    return withPWA({
      dest: "public",
    })(nextConfig);
  }
  return nextConfig;
};

export default config;
