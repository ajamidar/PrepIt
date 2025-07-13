import { Button } from '@/components/ui/button'
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '../components/InterviewCard'
import Slideshow from '../components/SlideShow'
import SmallScreenSlideShow from '../components/SmallScreenSlideshow'
import { getCurrentUser,  } from '@/lib/actions/auth.action'
import { getInterviewByUserId, getLatestInterviews } from '@/lib/actions/general.action'

const page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })
  ]);

  const hasPastInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;

  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-22'>
          <div className='flex flex-col gap-1 max-w-lg'>
            <h2 className='text-extrabold'>HAVE AN INTERVIEW?</h2>
            <p className='text-lg text-neutral-950'>
              Let us help prepare you like the million others. 
            </p>
          </div>
        
          <div className='flex flex-col gap-1 max-w-lg'>
            <Button asChild className='btn-primary max-sm:w-full'>
              <Link href="/interview">Generate a Mock Interview</Link>
            </Button>
          </div>
      </div>
    
      <Slideshow />
    </section>
    <div className='flex flex-col min-sm:hidden py-6'>
      <h2>Some reviews...</h2>
      <SmallScreenSlideShow />
    </div>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>

      <div className='interviews-section'>
        {
        hasPastInterviews ? (
          userInterviews?.map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))) : (
        <p className='text-black'>You haven&apos;t taken any interviews yet</p>
        )
      }

        
      </div>

    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an interview</h2>

      <div className='interviews-section'>
        {
        hasUpcomingInterviews ? (
          latestInterviews?.map((interview) => (
          <InterviewCard {...interview} key={interview.id} />
        ))) : (
        <p className='text-black'>There are no new interviews available</p>
          )
        }
      </div>
    </section>
    </>
  )
}

export default page