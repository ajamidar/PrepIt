import { isAuthenticated } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import AccountOrHome from '../components/NavBar'
import NavBar from '../components/NavBar'

const RootLayout = async ({ children }: { children: ReactNode}) => {
  const isUserAuthenicated = await isAuthenticated();

  if(!isUserAuthenicated) redirect('/landing');

  let isAccountPage = false;

  return (
    <div className='root-layout'>
      <nav className='py-4 max-sm:px-8 flex flex-row justify-between items-center'>
        <Link href="/" className='flex items-center justify-start gap-1 link pl-1'>
              <div className='flex flex-col justify-start'>
                  <div className='flex flex-row gap-1'>
                  <Image src="/logo4.svg" alt="logo" width={50} height={38} />
                  <h1 className='prep-it'>PrepIt</h1>
                </div>
                <div className='flex flex-row'>
                  <p className='under-root-logo'>World's</p>
                  <p className='under-root-logo text-[#ffb700]! font-bold'>&nbsp;#1</p>
                  <p className='under-root-logo'>&nbsp;AI-Powered Interview preparation tool</p>
                </div>
              </div>
            </Link>
            <NavBar />
      </nav>
      <hr className='mb-3' />

      {children}
    </div>
  )
}

export default RootLayout