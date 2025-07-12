import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import InterviewCard from '../components/InterviewCard'

const page = () => {
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
    
      <Image src="/root-logo2.png" alt='robot' width={420} height={420} className='max-sm:hidden root-logo-pic' />
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>

      <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
            <InterviewCard {... interview} key={interview.id} />
        ))}

        {/*<p>You haven&apos;t taken any interviews yet</p>*/}
      </div>

    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an interview</h2>

      <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
            <InterviewCard {... interview} key={interview.id} />
        ))}

      </div>
    </section>
    </>
  )
}

export default page