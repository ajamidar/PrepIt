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
          <Image src="/logo.svg" alt="logo" width={42} height={36} />
          <h1 className='prep-it'>PrepIt</h1>
        </Link>
      </nav>

      {children}
    </div>
  )
}

export default RootLayout