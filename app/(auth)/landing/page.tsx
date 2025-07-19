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
import { Bruno_Ace } from 'next/font/google';
import LandingPictures from '@/app/components/LandingPictures';


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

  const fadeInRef = useRef(null);
  const isFadeInView = useInView(fadeInRef, { once: true });


  return (
    <>
      <div className='flex flex-col mt-0 py-0 bg-gradient-to-b from-[#b6e9ff54] to-[#d9f1fb2f]'>
        <nav className='py-4 max-sm:px-8 flex flex-row justify-between items-center'>
            <Link href="/" className='flex items-center justify-start gap-1 link pl-14'>
              <div className='flex flex-col justify-start'>
                  <div className='flex flex-row gap-1'>
                  <Image src="/logo4.svg" alt="logo" width={50} height={38} />
                  <h1 className='prep-it'>PrepIt</h1>
                </div>
                <div className='flex flex-row'>
                  <p className='under-root-logo'>World's</p>
                  <p className='under-root-logo text-[#ffb700]! font-bold'>&nbsp;#1</p>
                  <p className='under-root-logo'>&nbsp;AI-Powered Interview preparation tool</p>
                </div>
              </div>
            </Link>
            <div className='justify-end pr-14'>
              <Button className='btn-tertiary'>
                <Link href='/landing/sign-in'>Sign In</Link>
              </Button>
            </div>
        </nav>

        <hr/>

        <LandingPictures />
        
        <div className='bg-gradient-to-b from-[#d9f1fb2f] to-[#fff5cb75] pt-5 pb-5'>
          <section className='card-cta mb-0 mr-14 ml-14 max-sm:mr-8 max-sm:ml-8'>
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
        
        <div className='flex flex-col min-sm:hidden py-6 px-8 bg-[#fff5cb75]'>
          <h2>Some reviews...</h2>
          <SmallScreenSlideShow />
        </div>

        <section ref={ref} className='flex flex-col items-center h-[740px] bg-gradient-to-b from-[#fff5cb75] to-[#aee7ff6f] pb-2 rounded-t-xl max-sm:h-[300px]'>
          <span className='flex flex-row py-0 gap-2.5 mt-6 max-sm:gap-1'>
            <h1 className='text-black max-sm:text-[17px] text-center'>Practice for Interviews like</h1>
            <h1 className='text-[#487cff] max-sm:text-[17px] font-extrabold'>NEVER</h1>
            <h1 className='text-black max-sm:text-[17px]'>before</h1>
          </span>
          <motion.div style={{ y, scale }} className="flex justify-center items-center p-0.5 bg-[#3333330e] rounded-3xl mt-2 max-sm:px-12 max-sm:bg-transparent max-sm:mb-4 max-sm:mt-0">
            <Image src='/home-page.png' alt='home-page' width={700} height={700} className='rounded-3xl w-2xl max-sm:w-xl link'></Image>
          </motion.div>
        </section>

        <section ref={leftRef} className='flex flex-col items-center bg-gradient-to-b from-[#aee7ff6f] to-[#fff5cb75] '>
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
            <Image src='/interview-gen.png' alt='home-page' height={700} width={700} className='rounded-lg max-sm:w-xl link'></Image>
          </motion.div>
        </section>

        <section ref={leftRef} className='pb-7 flex flex-col items-center bg-gradient-to-b from-[#aee7ff6f] to-[#fff5cb75] max-sm:pb-1'>
          <motion.div style={{ x }} className="flex justify-center items-center p-0.5 bg-[#3333330e] rounded-3xl mt-3 max-sm:px-15 max-sm:bg-transparent">
            <Image src='/feedback.png' alt='home-page' height={500} width={700} className='rounded-3xl max-sm:w-xl link'></Image>
          </motion.div>
        </section>

        <section className='flex flex-col items-center bg-gradient-to-b from-[#fff5cb75] to-[#aee7ff6f]'>
          <motion.div className="flex justify-center items-center rounded-2xl mt-1 pb-4 pt-8 mb-2 max-sm:pt-1 max-sm:mt-0">
          <span className='flex flex-row py-0 gap-2.5 mt-9 max-sm:gap-1'>
            <h1 className='text-[#000000] max-sm:text-[15px] text-center'>Get</h1>
            <h1 className='text-[#ff9036] max-sm:text-[15px] font-extrabold'>MORE</h1>
            <h1 className='text-black max-sm:text-[15px]'>than just great custom interviews</h1>
          </span>
          </motion.div>
        </section>

        <section className='flex flex-row items-center justify-center gap-10 bg-gradient-to-b from-[#aee7ff6f] to-[#fff5cb75] pt-6 pb-5 max-sm:overflow-hidden max-sm:pt-0'>
          <motion.div ref={countRef} className="flex flex-col justify-center items-center p-7  bg-[#000000c9] rounded-xl max-sm:px-2 max-sm:ml-5 max-sm:w-3xl show-card">
            <Image src='/tech.svg' alt='home-page' height={100} width={100} className='rounded-lg max-sm:w-1/2'></Image>
            <span className='flex flex-col py-0 items-center justify-center gap-1 mt-5 max-sm:gap-0.5'>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px] text-center'>Choose your ideal techstack from</h1>
              <span className='flex flex-row py-0 max-sm:gap-0'>
                <motion.h1 className='text-[#51ff36] text-lg max-sm:text-[5.5px] font-extrabold'>
                  {displayCount}
                </motion.h1>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>+ Technologies and languages</h1>
              </span>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>from across the globe 🌎🚀</h1>
            </span>
          </motion.div>
          <motion.div ref={count200Ref} className="flex flex-col justify-center items-center p-6 bg-[#000000c9] rounded-xl max-sm:px-2 max-sm:ml-2 max-sm:w-3xl show-card">
            <Image src='/up-graph.svg' alt='home-page' height={100} width={100} className='rounded-lg max-sm:h-min max-sm:w-1/2'></Image>
            <span className='flex flex-col py-0 items-center justify-center gap-1 mt-5 max-sm:gap-0.5'>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px] text-center'>Ace your next job Interview</h1>
              <span className='flex flex-row py-0 max-sm:gap-0'>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>Boost your knowledge by</h1>
                <h1 className='text-[#51ff36] text-lg max-sm:text-[5.5px] font-extrabold'>&nbsp;{display200Count}</h1>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>%</h1>
              </span>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>and gain more confidence ⭐✨</h1>
            </span>
          </motion.div>
          <motion.div ref={count10Ref} className="flex flex-col justify-center items-center p-7  bg-[#000000c9] rounded-xl max-sm:px-2 max-sm:ml-2 max-sm:mr-5 max-sm:w-3xl show-card">
            <Image src='/brain.svg' alt='home-page' height={100} width={100} className='rounded-lg max-sm:w-1/2'></Image>
            <span className='flex flex-col py-0 items-center justify-center gap-1 mt-4 max-sm:gap-0.5'>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px] text-center'>Go above and beyond with</h1>
              <span className='flex flex-row py-0 max-sm:gap-0'>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>upto</h1>
                <h1 className='text-[#51ff36] text-lg max-sm:text-[5.5px] font-extrabold'>&nbsp;{display10Count}</h1>
                <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>+ FREE high quality</h1>
              </span>
              <h1 className='text-[#FFFFFF] text-lg max-sm:text-[5.5px]'>interviews ready for you 🧠✅</h1>
            </span>
          </motion.div>
        </section>

        <section className='flex flex-col items-center bg-gradient-to-b from-[#fff5cb75] to-[#aee7ff6f]'>
          <motion.div className="flex justify-center items-center rounded-2xl mt-1 pt-13 mb-2 max-sm:pt-1 max-sm:mt-0">
          <span className='flex flex-row py-0 gap-2.5 mt-9 max-sm:gap-1'>
            <h1 className='text-[#000000] max-sm:text-[15px] text-center'>Generate your first Interview within seconds</h1>
            <h1 className='text-[#31e505] max-sm:text-[15px] font-extrabold'>NOW</h1>
          </span>
          </motion.div>
        </section>

        <motion.section className='flex flex-row justify-center items-center bg-gradient-to-b from-[#aee7ff6f] to-[#fff5cb75] pb-5 pt-5 px-2'>
          <motion.div ref={fadeInRef} initial={{ opacity: 0.9, y: 0 }} animate={isFadeInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: 'easeIn' }} className="flex justify-center items-center p-0.5 bg-[#3333330e] rounded-3xl max-sm:px-15 max-sm:bg-transparent">
            <Image src='/sign-up.png' alt='home-page' height={320} width={530} className='rounded-3xl max-sm:w-xl h-[500px] w-[550px] link'></Image>
          </motion.div>
          <motion.div ref={fadeInRef} initial={{ opacity: 0.9, y: 0 }} animate={isFadeInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: 'easeIn' }} className='text-[#333333] px-4'>
            <h3 className='font-bold'>OR</h3>
          </motion.div>
          <motion.div ref={fadeInRef} initial={{ opacity: 0.9, y: 0 }} animate={isFadeInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.5, ease: 'easeIn' }} className="flex justify-center items-center p-0.5 bg-[#3333330e] rounded-3xl max-sm:px-15 max-sm:bg-transparent">
            <Image src='/sign-in.png' alt='home-page' height={400} width={600} className='rounded-3xl max-sm:w-xl h-[500px] w-[550px] link'></Image>
          </motion.div>
        </motion.section>

        <section className='flex flex-col justify-center items-center bg-gradient-to-b from-[#fff5cb75] to-[#aee7ff6f] pb-15 pt-2'>
          <motion.button ref={fadeInRef} initial={{ opacity: 0, y: 40 }} animate={isFadeInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: 'easeIn' }} className='btn-primary'>
            <Link href='/landing/sign-up' className='text-xl'>Get Started</Link>
          </motion.button>
        </section>

        <hr/>

        <section className='flex flex-col px-10 bg-gradient-to-b from-[#e4e4e46f] to-[#5d5d5d7f] pb-10'>
          <span className='flex flex-row items-center justify-center py-0 gap-2.5 mt-10 max-sm:gap-1'>
            <h1 className='text-[#000000] max-sm:text-[15px] text-center'>Find Us </h1>
            <h1 className='text-[#ff5375] max-sm:text-[15px] font-extrabold'>Here</h1>
          </span>
          <div className='flex flex-row pt-20 pb-20 justify-between items-center'>
            <div className='flex flex-col justify-start'>
                <div className='flex flex-row gap-1'>
                  <Image src="/logo4.svg" alt="logo" width={50} height={38} />
                  <h1 className='prep-it'>PrepIt</h1>
                </div>
                <div className='flex flex-row'>
                  <p className='under-root-logo'>World's</p>
                  <p className='under-root-logo font-bold'>&nbsp;#1</p>
                  <p className='under-root-logo'>&nbsp;AI-Powered Interview preparation tool</p>
                </div>
            </div>
            <div className='flex flex-col gap-1 justify-end'>
              <div className='flex flex-row justify-center items-center gap-0.5'>
                <Image src='/instagram.svg' width={40} height={40} alt='social media' className='rounded-xl'></Image>
                <h3 className='font-medium'>@prepit-ai</h3>
              </div>
              <div className='flex flex-row justify-center items-center gap-0.5'>
                <Image src='/X.svg' width={40} height={40} alt='social media' className='rounded-xl'></Image>
                <h3 className='font-medium'>@prepit-ai</h3>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default page