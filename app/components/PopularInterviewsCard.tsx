import dayjs from 'dayjs'
import Image from 'next/image';
import { getRandomInterviewCover } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { toast } from 'sonner';


const PopularInterviewsCard = async ({ id, userId, role, type, techstack, createdAt }: InterviewCardProps) => {

    const user = await getCurrentUser();
    const userID = user?.id;


    const feedback = userId && id ? await getFeedbackByInterviewId({ interviewId: id, userId: userID! }) : null

    const normalisedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('D MMM, YYYY');

    

    return (
        <div className='card-order w-[360px] max-sm:w-full min-h-96'>
            <div className='card-interview'>
                <div>
                    <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-[#2B60DE] flex flex-col gap-0.5 justify-center items-center'>
                        <p className='badge-text text-center'>{normalisedType}</p>
                    </div>
                    <Image src='/root-logo2.png' alt="cover-image" width={100} height={100} className='rounded-full object-fill size-[100px]  '/>
                    <h3 className='mt-2 capitalize text-black'>
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
                            {feedback ? 'Check Feedback' : 'Take Interview'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
  )
}

export default PopularInterviewsCard