'use client';

import { getCurrentUser } from '@/lib/actions/auth.action'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { updateUserName } from '@/lib/actions/extra.action';
import { toast } from 'sonner';

enum EditOrNoEdit{
    EDIT = 'EDIT',
   NO = 'NO',
}

// Account handling component
const Account = () => {
    const [user, setUser] = useState<any>(null);
    const [newName, setNewName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setNewName(currentUser?.name || '');
        };

        fetchUser();
    }, []);

    const handleUpdateName = async () => {
        if (!newName || newName === user?.name) return;

        setIsUpdating(true);
        await updateUserName(user?.id, newName); // 👈 make sure to pass UID or user id
        setUser({ ...user, name: newName });
        setIsUpdating(false)
        toast.success("Your name has been updated!")
        setEditStatus(EditOrNoEdit.NO);
    };


    const [editStatus, setEditStatus] = useState<EditOrNoEdit>(EditOrNoEdit.NO);
    
    const handleEditRedirect = async() => {
        setEditStatus(EditOrNoEdit.EDIT);
    }
    
    const handleNoEditRedirect = async() => {
        setEditStatus(EditOrNoEdit.NO);
    }

    return (
        <div className='flex flex-col justify-center items-center gap-4 dark-gradient mt-4 mb-4 py-16 rounded-4xl w-1/2 self-center-safe'>
            <div className='flex flex-col w-full items-center gap-1'>
                <Image src='/user-avatar.png' alt="user-account" width={70} height={70} className='rounded-full bg-[#333333] p-1' />
                <div className='flex flex-row gap-1 items-center'>
                    <p className='text-[20px] text-black font-medium'>Upload profile picture</p>
                    <Image src='/upload1.svg' alt='upload' width={15} height={15}/>
                </div>
            </div>

            <div className='text-sm text-center'>
                <p className='text-black text-[20px]'><strong>Email:</strong> {user?.email}</p>
            </div>

            {editStatus == "NO" ?
            <div className='flex flex-col items-center gap-0.5'>
                <div className='flex flex-row items-center gap-2'>
                    <label htmlFor='name' className='text-black text-[20px] font-bold'>Name:</label>
                    <p className='text-black text-[20px]'> {user?.name}</p>
                </div>
                <button
                    onClick={handleEditRedirect}
                    disabled={isUpdating}
                    className='bg-blue-500 text-white px-2 py-1 rounded text-sm disabled:opacity-50 text-[15px] hover:bg-[#2744ff]! cursor-pointer'
                >
                    Edit Name
                </button>
            </div>
            : 
            <div className='flex flex-col items-center gap-2'>
                <label htmlFor='name' className='text-black text-[20px] font-bold'>Edit Name:</label>
                <input
                    id='name'
                    type='text'
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className='border p-1 rounded text-sm text-[20px]'
                />
                <button
                    onClick={handleUpdateName}
                    disabled={isUpdating}
                    className='bg-blue-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50 text-[17px]'
                >
                    {isUpdating ?  'Updating...' 
                     : 'Update Name'}
                </button>
            </div>}
            
        </div>
    );
};

export default Account;
