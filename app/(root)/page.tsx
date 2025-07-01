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
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Interview? Ace it with AI.</h2>
        <p className='text-lg'>
          Practice real interview questions with AI-Powered personalisation & get instant assessment 
        </p>

        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview">Start an interview</Link>
        </Button>
      </div>

      <Image src="/robot.png" alt='robot' width={400} height={400} className='max-sm:hidden' />
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