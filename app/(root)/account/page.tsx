import Account from '@/app/components/Account';
import { getCurrentUser } from '@/lib/actions/auth.action'
import Image from 'next/image';
import React from 'react'

const page = async() => {

    const user = await getCurrentUser();
    const userName = user?.name;
    const userEmail = user?.email;


    return (
        <>
        <Account />

        </>
    )
}

export default page