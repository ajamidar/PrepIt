'use client';
import Slideshow from '@/app/components/SlideShow'
import SmallScreenSlideShow from '@/app/components/SmallScreenSlideshow'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { motion, useViewportScroll, useTransform, useScroll, useMotionValue, animate, useInView } from 'framer-motion'
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

  const x = useTransform(boxScrollXProgress, [0, 0.7], [-100, 0])
  const xRight = useTransform(rightSectionScroll, [0, 0.7], [100, 0]) 

  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true }); // Runs once when in view
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.floor(latest));
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, 100, {
        duration: 2.5,
        ease: "easeOut"
      });

      const unsubscribe = rounded.on("change", latest => {
        setDisplayCount(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView]); // 👈 re-run effect when element enters view

  const count200Ref = useRef(null);
  const isBoostInView = useInView(count200Ref, { once: true });

  const boostCount = useMotionValue(0);
  const roundedBoost = useTransform(boostCount, latest => Math.floor(latest));
  const [display200Count, setDisplayBoostCount] = useState(0);

  useEffect(() => {
    if (isBoostInView) {
      const controls = animate(boostCount, 200, {
        duration: 2.5,
        ease: "easeOut"
      });

      const unsubscribe = roundedBoost.on("change", latest => {
        setDisplayBoostCount(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isBoostInView]);

  const count10Ref = useRef(null);
  const is10BoostInView = useInView(count10Ref, { once: true });

  const boost10Count = useMotionValue(0);
  const rounded10Boost = useTransform(boost10Count, latest => Math.floor(latest));
  const [display10Count, setDisplay10BoostCount] = useState(0);

  useEffect(() => {
    if (is10BoostInView) {
      const controls = animate(boost10Count, 10, {
        duration: 1.5,
        ease: "easeOut"
      });

      const unsubscribe = rounded10Boost.on("change", latest => {
        setDisplay10BoostCount(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [is10BoostInView]);


  return (
    <>
      <div className='flex flex-col mt-0 py-0 mb-30'>
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

        <hr/>
        
        <div className='bg-gradient-to-b from-[#d9f1fb2f] to-[#fff5cb75] pt-5 pb-5'>
          <section className='card-cta mb-0 mr-12 ml-12 max-sm:mr-8 max-sm:ml-8'>
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
        </div>
        
        <div className='flex flex-col min-sm:hidden py-6 px-8'>
          <h2>Some reviews...</h2>
          <SmallScreenSlideShow />
        </div>

        <section ref={ref} className='flex flex-col items-center h-[740px] bg-gradient-to-b from-[#fff5cb75] to-[#aee7ff6f] pb-2 rounded-t-xl max-sm:h-[300px]'>
          <span className='flex flex-row py-0 gap-2.5 mt-6 max-sm:gap-1'>
            <h1 className='text-black max-sm:text-[17px] text-center'>Practice for Interviews like</h1>
            <h1 className='text-[#487cff] max-sm:text-[17px] font-extrabold'>NEVER</h1>
            <h1 className='text-black max-sm:text-[17px]'>before</h1>
          </span>
          <motion.div style={{ y, scale }} className="flex justify-center items-center p-0.5 bg-[#3333330e] rounded-3xl mt-2 max-sm:px-12 max-sm:bg-transparent">
            <Image src='/home-page.png' alt='home-page' width={700} height={700} className='rounded-3xl w-2xl max-sm:w-xl'></Image>
          </motion.div>
        </section>

        <section ref={leftRef} className='flex flex-col items-center bg-gradient-to-b from-[#aee7ff6f] to-[#fff5cb75]'>
          <motion.div className="flex justify-center items-center rounded-2xl mt-1 pb-4 pt-8 mb-2">
          <span className='flex flex-row py-0 gap-2.5 mt-9 max-sm:gap-1'>
            <h1 className='text-black max-sm:text-[15px] text-center'>Using</h1>
            <h1 className='text-[#c850ff] max-sm:text-[15px] font-extrabold'>AI-Powered</h1>
            <h1 className='text-black max-sm:text-[15px]'>Mock Interviews & Feedback</h1>
          </span>
          </motion.div>
        </section>

        <section ref={rightRef} className='flex flex-col items-center bg-gradient-to-b from-[#fff5cb75] to-[#aee7ff6f]'>
          <motion.div style={{ x:xRight }} className="flex justify-center items-center p-0.5 bg-[#3333330e] rounded-xl max-sm:px-15 max-sm:bg-transparent">
            <Image src='/interview-gen.png' alt='home-page' height={700} width={700} className='rounded-lg max-sm:w-xl'></Image>
          </motion.div>
        </section>

        <section ref={leftRef} className='pb-7 flex flex-col items-center bg-gradient-to-b from-[#aee7ff6f] to-[#fff5cb75] '>
          <motion.div style={{ x }} className="flex justify-center items-center p-0.5 bg-[#3333330e] rounded-3xl mt-3 max-sm:px-15 max-sm:bg-transparent">
            <Image src='/feedback.png' alt='home-page' height={500} width={700} className='rounded-3xl max-sm:w-xl'></Image>
          </motion.div>
        </section>

        <section ref={leftRef} className='flex flex-col items-center bg-gradient-to-b from-[#fff5cb75] to-[#aee7ff6f]'>
          <motion.div className="flex justify-center items-center rounded-2xl mt-1 pb-4 pt-8 mb-2">
          <span className='flex flex-row py-0 gap-2.5 mt-9 max-sm:gap-1'>
            <h1 className='text-[#000000] max-sm:text-[15px] text-center'>Get</h1>
            <h1 className='text-[#ff9036] max-sm:text-[15px] font-extrabold'>MORE</h1>
            <h1 className='text-black max-sm:text-[15px]'>than just great custom interviews</h1>
          </span>
          </motion.div>
        </section>

        <section className='flex flex-row items-center bg-gradient-to-b from-[#aee7ff6f] to-[#fff5cb75] pt-6 pb-50'>
          <motion.div ref={countRef} className="flex flex-col justify-center items-center p-7 ml-45 bg-[#000000c9] rounded-xl max-sm:px-2 max-sm:ml-10">
            <Image src='/tech.svg' alt='home-page' height={100} width={100} className='rounded-lg max-sm:w-xl'></Image>
            <span className='flex flex-col py-0 items-center justify-center gap-1 mt-5 max-sm:gap-1'>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px] text-center'>Choose your ideal techstack from</h1>
              <span className='flex flex-row py-0 max-sm:gap-1'>
                <motion.h1 className='text-[#51ff36] text-lg max-sm:text-[10px] font-extrabold'>
                  {displayCount}
                </motion.h1>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>+ Technologies and languages</h1>
              </span>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>from across the globe 🌎🚀</h1>
            </span>
          </motion.div>
          <motion.div ref={count200Ref} className="flex flex-col justify-center items-center p-6 ml-20 bg-[#000000c9] rounded-xl max-sm:px-2">
            <Image src='/up-graph.svg' alt='home-page' height={100} width={100} className='rounded-lg max-sm:w-xl max-sm:h-min'></Image>
            <span className='flex flex-col py-0 items-center justify-center gap-1 mt-5 max-sm:gap-1'>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px] text-center'>Ace your next job Interview</h1>
              <span className='flex flex-row py-0 max-sm:gap-1'>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>Boost your knowledge by</h1>
                <h1 className='text-[#51ff36] text-lg max-sm:text-[10px] font-extrabold'>&nbsp;{display200Count}</h1>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>%</h1>
              </span>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>and gain more confidence ⭐✨</h1>
            </span>
          </motion.div>
          <motion.div ref={count10Ref} className="flex flex-col justify-center items-center p-7 ml-20 bg-[#000000c9] rounded-xl max-sm:px-2">
            <Image src='/brain.svg' alt='home-page' height={100} width={100} className='rounded-lg max-sm:w-xl'></Image>
            <span className='flex flex-col py-0 items-center justify-center gap-1 mt-4 max-sm:gap-1'>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px] text-center'>Go above and beyond with</h1>
              <span className='flex flex-row py-0 max-sm:gap-1'>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>upto</h1>
                <h1 className='text-[#51ff36] text-lg max-sm:text-[10px] font-extrabold'>&nbsp;{display10Count}</h1>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>+ FREE high quality</h1>
              </span>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[10px]'>interviews ready for you 🧠✅</h1>
            </span>
          </motion.div>
        </section>

      </div>
    </>
  )
}

export default page