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
        </>
    )
}

export default NavBar