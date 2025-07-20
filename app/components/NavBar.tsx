'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

enum AccountPageOrHomePage{
    HOME = 'HOME',
   ACCOUNT = 'ACCOUNT',
}

const NavBar = () => {

    const [homeStatus, setHomeStatus] = useState<AccountPageOrHomePage>(AccountPageOrHomePage.HOME);

    const handleAccountRedirect = async() => {
        setHomeStatus(AccountPageOrHomePage.ACCOUNT);
    }
    
    const handleHomeRedirect = async() => {
        setHomeStatus(AccountPageOrHomePage.HOME);
    }

    return (
        <>
        <nav className='py-4 max-sm:px-8 flex flex-row justify-between items-center'>
        <Link href="/" className='flex items-center justify-start gap-1 link pl-1' onClick={handleHomeRedirect}>
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
            {homeStatus ==  'HOME' ? 
        <Link href="/account" className='flex items-center link pr-1' onClick={handleAccountRedirect}>
          <div className='flex flex-col w-full items-center gap-0.5'>
            <Image src='/image1.jpeg' alt="user-account" width={50} height={50} className='rounded-full' />
            <p className='text-[12px] text-black font-medium text-center'>Your Account</p>
          </div>
        </Link>
          : 
        <Link href="/" className='flex items-center link pr-1' onClick={handleHomeRedirect}>
          <div className='flex flex-col w-full items-center gap-0.5'>
            <Image src='/image1.jpeg' alt="user-account" width={50} height={50} className='rounded-full' />
            <p className='text-[12px] text-black font-medium text-center'>Home Page</p>
          </div>
        </Link>}
      </nav>
        
        </>
    )
}

export default NavBar