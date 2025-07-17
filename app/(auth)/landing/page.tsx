'use client';
import Slideshow from '@/app/components/SlideShow'
import SmallScreenSlideShow from '@/app/components/SmallScreenSlideshow'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import { motion, useViewportScroll, useTransform, useScroll } from 'framer-motion'
import { useRef } from 'react'


const page = () => {

  const redirectSignUp = () => {
    toast.success('Sign Up for Free to generate an Interview instantly');
  }

  const ref = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  // Get scroll progress relative to the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // when it enters to when it leaves
  })

  const { scrollYProgress: boxScrollXProgress } = useScroll({
    target: leftRef,
    offset: ['start end', 'end start'],
  })

  const {scrollYProgress: rightSectionScroll} = useScroll({
    target: rightRef,
    offset: ['start end', 'end start'],
  })

  // Animate vertical movement and scale
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4])

  const x = useTransform(boxScrollXProgress, [0, 1], [-75, 0])
  const xRight = useTransform(rightSectionScroll, [0, 1], [75, 0]) 

  return (
    <>
      <div className='flex flex-col mt-0 py-0 mb-5'>
        <nav className='py-4 px-16 max-sm:px-8'>
            <Link href="/" className='flex items-center gap-2 link'>
            <div className='flex flex-col'>
                <div className='flex flex-row gap-1'>
                <Image src="/logo4.svg" alt="logo" width={50} height={38} />
                <h1 className='prep-it'>PrepIt</h1>
              </div>
              <div>
                <p className='under-root-logo'>World's #1 AI-Powered Interview preparation tool</p>
              </div>
            </div>
            </Link>
        </nav>

        <hr className='mb-5' />
        
        <section className='card-cta mb-0 mr-8 ml-8'>
          <div className='flex flex-col gap-22'>
              <div className='flex flex-col gap-1 max-w-lg'>
                  <h2 className='text-extrabold'>HAVE AN INTERVIEW?</h2>
                  <p className='text-lg text-[#333333]'>
                  Let us help you prepare like the million others. 
                  </p>
              </div>
              
              <div className='flex flex-col gap-1 max-w-lg'>
                  <Button asChild className='btn-primary max-sm:w-full' onClick={redirectSignUp}>
                  <Link href="/landing/sign-up">Generate a Mock Interview</Link>
                  </Button>
              </div>
          </div>
          <Slideshow />
        </section>
        
        <div className='flex flex-col min-sm:hidden py-6 px-8'>
          <h2>Some reviews...</h2>
          <SmallScreenSlideShow />
        </div>

        <section ref={ref} className='mt-12 flex flex-col items-center h-[740px] bg-gradient-to-b from-[#afb0b16f] to-[#38383875] pb-2 rounded-t-xl max-sm:h-[400px]'>
          <span className='flex flex-row py-0 gap-2.5 mt-6'>
            <h1 className='text-[#333333] max-sm:text-[15px] text-center'>Practice for Interviews like</h1>
            <h1 className='text-[#487cff] max-sm:text-[15px] font-extrabold'>NEVER</h1>
            <h1 className='max-sm:text-[15px]'>before</h1>
          </span>
          <motion.div style={{ y, scale }} className="flex justify-center items-center rounded-2xl mt-2 max-sm:px-6">
            <Image src='/home-page.png' alt='home-page' width={700} height={700} className='rounded-3xl w-2xl max-sm:w-xl'></Image>
          </motion.div>
        </section>

        <section ref={leftRef} className='flex flex-col items-center bg-gradient-to-b from-[#38383875] to-[#afb0b16f]'>
          <motion.div className="flex justify-center items-center rounded-2xl mt-1 pb-4 pt-8 mb-2 max-sm:px-6">
          <span className='flex flex-row py-0 gap-2.5 mt-9'>
            <h1 className='text-[#333333] max-sm:text-[15px] text-center'>Using</h1>
            <h1 className='text-[#c850ff] max-sm:text-[15px] font-extrabold'>AI-Powered</h1>
            <h1 className='max-sm:text-[15px]'>Mock Interviews & Feedback</h1>
          </span>
          </motion.div>
        </section>

        <section ref={rightRef} className='flex flex-col items-center bg-gradient-to-b from-[#afb0b16f] to-[#38383875]'>
          <motion.div style={{ x:xRight }} className="flex justify-center items-center rounded-2xl max-sm:px-10">
            <Image src='/interview-gen.png' alt='home-page' height={700} width={700} className='rounded-lg'></Image>
          </motion.div>
        </section>

        <section ref={leftRef} className='pb-7 flex flex-col items-center bg-gradient-to-b from-[#38383875] to-[#afb0b16f] '>
          <motion.div style={{ x }} className="flex justify-center items-center rounded-2xl mt-3 pt-4 max-sm:px-10">
            <Image src='/feedback.png' alt='home-page' height={500} width={700} className='rounded-lg'></Image>
          </motion.div>
        </section>


      </div>
    </>
  )
}

export default page