import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode}) => {
  const isUserAuthenicated = await isAuthenticated();

  if(!isUserAuthenicated) redirect('/sign-in');

  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className='flex items-center gap-2 link'>
        <div className='flex flex-col'>
            <div className='flex flex-row gap-1'>
              <Image src="/logo4.svg" alt="logo" width={50} height={38} />
              <h1 className='prep-it'>PrepIt</h1>
            </div>
            <div>
              <p className='under-root-logo'>World's #1 AI-Powered Interview preparation tool</p>
            </div>
        </div>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout