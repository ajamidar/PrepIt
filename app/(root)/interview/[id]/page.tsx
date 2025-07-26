import Agent from '@/app/components/AgentInterview';
import DisplayTechIcons from '@/app/components/DisplayTechIcons';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/general.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }:RouteParams) => {
    const { id } = await params;
    const interview = await getInterviewById(id);
    const user = await getCurrentUser();

    if(!interview) redirect('/')

  return (
    <>
        <div className='flex flex-row gap-4 justify-between'>
            <div className='flex flex-row gap-2 items-center max-sm:flex-col'>
                <div className='flex flex-row gap-0 items-center'>
                    <Image src='/root-logo2.png' alt='cover-img' width={50} height={50} className='rounded-full object-cover size-[40px]' />
                    <h3 className='capitalize text-[#1c2f7c]'>{interview.role}</h3>
                </div>
                <DisplayTechIcons techStack={interview.techstack} />
            </div>
            <p className='bg-gradient-to-b from-[#cd29ff] to-[#8800ff] text-white px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
        </div>
        <Agent userName={user?.name || ''} userId={user?.id} interviewId={id} type="interview" questions={interview.questions} />
    </>
  )
}

export default page