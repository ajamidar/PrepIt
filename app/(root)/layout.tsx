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
      <NavBar />
      <hr className='mb-3' />

      {children}
    </div>
  )
}

export default RootLayout