import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({ id, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
    const feedback = null as Feedback | null;

    const normalisedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('D MMM, YYYY');



    return (
        <div className='card-order w-[360px] max-sm:w-full min-h-96'>
            <div className='card-interview'>
                <div>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-[#2B60DE]'>
                        <p className='badge-text'>{normalisedType}</p>
                    </div>
                    <Image src={getRandomInterviewCover()} alt="cover-image" width={90} height={90} className='rounded-full object-fit size-[70px]' />
                    <h3 className='mt-5 capitalize text-black'>
                        {role} Interview
                    </h3>

                    <div className='flex flex-row gap-5 mt-3'>
                        <div className='flex flex-row gap-2'>
                            <Image src="/calendar.svg" alt='calendar' width={22} height={22} />
                            <p className='text-black'>{formattedDate}</p>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p className='text-black'>{feedback?.totalScore || '---'}/100</p>
                        </div>
                    </div>
                    <p className='line-clamp-2 mt-5 text-black'>{feedback?.finalAssessment || "You haven't taken the interview yet. Take it now to improve your skills" }</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <DisplayTechIcons techStack={techstack} />
                    <Button className='btn-int-card'>
                        <Link href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}>
                            {feedback ? 'Check Feedback' : 'View Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
  )
}

export default InterviewCard