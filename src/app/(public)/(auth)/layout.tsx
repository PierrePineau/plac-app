"use client";

import { Image } from "@heroui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-brand-950">
      <div className="p-8 flex flex-col items-center sm:items-start sm:w-1/2 relative">
        <img src="/asset/img/whiteLogo.svg" alt="Logo Plac" className="h-8" />
        <div className="flex flex-col max-w-lg">
          <h1 className="text-neutral-50 text-3xl sm:text-5xl mt-4 sm:mt-6 font-medium text-center sm:text-left">
            Gérer vos chantiers plus facilement.
          </h1>
          <p className="text-brand-850 text-base sm:text-paragraphMedium mt-2 sm:mt-4 text-center sm:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        
        <picture className="w-full h-full max-h-[600px] bottom-0 left-0 right-0 absolute pl-8 flex flex-col justify-end">
          <Image alt={"Illustration"} className="hidden sm:block w-full max-h-[600px] object-cover object-left-top mt-auto rounded-tl" radius="none" src={"/asset/img/landingPage.png"} width="100%" />
        </picture>
        {/* <img
          src=""
          alt="Illustration"
          className="w-full mt-4 object-cover hidden sm:block"
        /> */}
      </div>
      <div className="p-4 sm:p-0 sm:w-1/2 flex justify-center items-center">
        <div className="bg-white sm:min-h-screen p-6 sm:px-20 sm:py-10 w-full flex flex-col justify-center rounded sm:rounded-none">
          {children}
        </div>
      </div>
    </div>
  );
}
