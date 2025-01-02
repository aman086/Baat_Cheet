import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserInfoCard = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
        {/* TOP */}
        <div className='font-medium flex justify-between items-center'>
            <span className='text-slate-500'>User Information</span>
            <Link href="/" className='text-blue-500'>See all</Link>
        </div>
        {/* BOTTOM */}
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <span className='font-bold text-xl'>Aman Tiwari</span>
                <p className='text-slate-400 text-xs'>@aman90</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eius? Dolorum reiciendis rem aliquam mollitia rerum</p>
            <div className='flex gap-2 items-center '>
                <Image src="/map.png" alt='' height={16} width={16} className='h-4 w-4' />
                <span>Living in <b>Rewa</b></span>
            </div>
            <div className='flex gap-2 items-center '>
                <Image src="/school.png" alt='' height={16} width={16} className='h-4 w-4' />
                <span>Went to <b>NIT Jamshedpur</b></span>
            </div>
            <div className='flex gap-2 items-center '>
                <Image src="/work.png" alt='' height={16} width={16} className='h-4 w-4' />
                <span>Works at <b>Helios Tech Labs</b></span>
            </div>
            <div className='flex items-center justify-between '>
                <div className='flex gap-1 items-center'>
                    <Image src="/link.png" alt='' height={16} width={16} className='h-4 w-4' />
                    <Link href="/" className='text-blue-500 font-medium cursor-pointer'>baatCheet</Link>
                </div>
                <div className='flex gap-2 items-center'>
                    <Image src="/date.png" alt='' height={16} width={16} className='h-4 w-4' />
                    <span>Joined December 2024</span>
                </div>
            </div>
            {/* BUTTON - Following */}
            <button className='bg-blue-500 text-white 
            p-2 rounded-lg'>Following</button>
            <div className='flex justify-end'>
            <span className='text-red-500 cursor-pointer'>Block User</span>
            </div>
        </div>
    </div>
  )
}

export default UserInfoCard