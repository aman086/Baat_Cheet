"use client"

import { deletePost } from '@/lib/actions';
import Image from 'next/image'
import React, { useState } from 'react'

const PostInfo = ({postId} : {postId : string}) => {

    const [open , setOpen] = useState(false);
    const deletePostWithId = deletePost.bind(null , postId);
  return (
    <div className='relative'>
        <Image src="/more.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' onClick={()=> {setOpen(prev => !prev)}}/>

        {open && (
            <div className='absolute top-8 right-0 flex flex-col gap-2 bg-white border border-gray-300 rounded-lg p-4 z-30 w-32'>
                <span className='cursor-pointer'>View</span>
                <span className='cursor-pointer'>Re-post</span>
                <form  action={deletePostWithId}>
                    <button className='cursor-pointer text-red-500'>Delete</button>
                </form>
            </div>
        )}
    </div>
  )
}

export default PostInfo