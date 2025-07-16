import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const RootLayout = async ({ children }: { children: ReactNode}) => {
  const isUserAuthenicated = await isAuthenticated();

  if(!isUserAuthenicated) redirect('/landing');

  return (
    <div className='root-layout'>
      <nav className='flex flex-row gap-193 align-middle'>
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
        <Link href="/account" className='flex items-center link'>
          <div className='flex flex-col w-full items-center gap-0.5'>
            <Image src='/image1.jpeg' alt="user-account" width={50} height={50} className='rounded-full' />
            <p className='text-[12px] text-black font-medium text-center'>Your Account</p>
          </div>
        </Link>
      </nav>
      <hr className='mb-3' />

      {children}
    </div>
  )
}

export default RootLayout