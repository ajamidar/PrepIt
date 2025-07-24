'use client';

import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { deleteInterviewById } from '@/lib/actions/extra.action';
import Link from 'next/link';
import { toast } from 'sonner';

const DeleteInterviewPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const handleRedirectHome = () => {
    toast.success('Redirecting you to the home page');
    router.push('/');
  };

  const handleDelete = async () => {
    const result = await deleteInterviewById(id);

    if (result.success) {
      toast.success('Interview deleted successfully.');
      router.push('/');
    } else {
      toast.error('Failed to delete the interview. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center pt-10'>
      <div className='dark-gradient flex flex-col justify-center items-center py-10 px-5 rounded-2xl gap-4 w-7/12'>
        <p className='text-black font-extrabold text-xl'>Are you sure you want to delete this Interview?</p>
        <div className='flex flex-row justify-center items-center gap-4'>
          <Button className='bg-[#6b81ff] text-xl hover:bg-[#7277c0] cursor-pointer' onClick={handleRedirectHome}>Cancel</Button>
          <Button className='bg-[#ff6b6b] text-xl hover:bg-[#bc7a7a] cursor-pointer' onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInterviewPage;
