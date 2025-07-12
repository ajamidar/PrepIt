import { getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
    const techIcons = await getTechLogos(techStack)
    return (
        <div className='flex flex-row gap-0.5'>{techIcons.slice(0,3).map(({ tech , url}, index) => (
            <div key={tech} className='relative group bg-[#6d6d6d] rounded-full px-3 flex-center'>
                <span className='tech-tooltip'>{tech}</span>
                <Image src={url} alt={tech} width={90} height={90} className="size-5" />
            </div>
        ))}
        </div>
    )
}

export default DisplayTechIcons