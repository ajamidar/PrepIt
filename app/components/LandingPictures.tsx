// components/Slideshow.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const images = [
  '/landing1.png',
  '/landing2.jpg',
  '/landing3.png'
]

const LandingPictures = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex justify-center items-center'>
        <div className="relative w-11/12 h-[550px] max-w-full max-h-full rounded-xl overflow-hidden shadow-lg mt-4 mb-2 bg-gradient-to-b from-[#5c5e5f2f] to-[#bab8b375] max-sm:hidden landing-slideshow">
            {images.map((src, index) => (
                <Image
                key={index}
                src={src}
                alt={`Slide ${index}`}
                fill
                className={` p-2 rounded-4xl transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-0' : 'opacity-0 z-0' 
        }`}
                />
        ))}
            <div className="absolute top-0 left-0  h-full w-2/3 flex items-center justify-start pl-10 z-10">
            <h1 className="text-[#ffffff] text-5xl font-bold text-left" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>WORLD'S BEST AI-POWERED INTERVIEW PREPARATION TOOL</h1>
            </div>
        </div>
    </div>
  )
}

export default LandingPictures
