import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProfileCard from './ProfileCard'

export const LeftMenu = ({type} : {type : "home" | "profile"}) => {
  return (
    <div className='flex flex-col gap-4'>
      {/* PROFILE Card */}
      {type == "home" && 
        <ProfileCard />
      }
      {/* Menu Card */}
      <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-4 font-medium'>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/posts.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>My Posts</span>
          </Link>  
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/activity.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>Activity</span>
          </Link>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/market.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>Marketplace</span>
          </Link>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/events.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>Events</span>
          </Link>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/videos.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>Videos</span>
          </Link>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/news.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>News</span>
          </Link>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/courses.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>Courses</span>
          </Link>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/lists.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>Lists</span>
          </Link>
          <Link href="/" className='flex items-center text-sm gap-4 hover:bg-slate-200 p-2 rounded-lg'>
              <Image src="/settings.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
              <span className='text-slate-600'>Settings</span>
          </Link>
          
      </div>
    </div>
  )
}
