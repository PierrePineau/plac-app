'use client';

import {HeroUIProvider} from '@heroui/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider className='flex flex-row bg-white h-full grow'>
      {children}
    </HeroUIProvider>
  )
}