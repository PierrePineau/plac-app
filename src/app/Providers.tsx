'use client';

import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider className='flex flex-col bg-white h-full grow'>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  )
}