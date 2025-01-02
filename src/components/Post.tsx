import Image from 'next/image'
import React from 'react'
import Comments from './Comments'

const Post = () => {
  return (
    <div className='flex flex-col gap-4'>
        {/* USER */}
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Image src="https://images.pexels.com/photos/29781699/pexels-photo-29781699/free-photo-of-couple-walking-on-serene-beach-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' width={40} height={40} className='h-10 w-10 rounded-full'/>
                <span>Aman Tiwari</span>
            </div>
            <Image src="/more.png" alt='' width={16} height={16} className='h-4 w-4'/>
        </div>
        {/* Post Details (Description)  */}
        <div className='flex flex-col gap-4'>
            <div className='w-full min-h-96 relative'>
                <Image src="https://images.pexels.com/photos/29715252/pexels-photo-29715252/free-photo-of-misty-forest-in-autumn-with-bare-trees.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md'/>
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, minima.</p>
        </div>
        {/* Interaction */}
        <div className='flex items-center justify-between text-sm my-4'>
            <div className='flex gap-8'>
                <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                    <Image src="/like.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
                    <span className='text-slate-50'>|</span>
                    <span className='text-slate-500'>123 <span className='hidden md:inline'> Likes</span></span>
                </div>
                <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                    <Image src="/comment.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
                    <span className='text-slate-50'>|</span>
                    <span className='text-slate-500'>123 <span className='hidden md:inline'> Comments</span></span>
                </div>
            </div>
            <div className='flex items-center'>
            <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                    <Image src="/share.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
                    <span className='text-slate-50'>|</span>
                    <span className='text-slate-500'>123 <span className='hidden md:inline'> Shares</span></span>
                </div>
            </div>
        </div>
        <div><Comments /></div>
    </div>
  )
}

export default Post