import prisma from '@/lib/client'
import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserMediaCard = async({user} : {user : User}) => {

    const postWithMedia = await prisma.post.findMany({
        where:{
            userId : user.id,
            img:{
                not:null,
            }
        },
        take: 8,
        orderBy:{
            createdAt: "desc",
        }
    });

//    console.log("postWithMedia -> " , postWithMedia);


  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
        {/* TOP */}
        <div className='flex justify-between items-center font-medium'>
            <span className='text-slate-500'>User Media</span>
            <Link href="/" className='text-blue-500'>See all</Link>
        </div>
        {/* BOTTOM */}
        <div className='flex justify-between flex-wrap gap-4' >
        {postWithMedia.length ? postWithMedia.map(post=> (

            <div className='relative w-1/5 h-24' key={post.id}>
                <Image src={post.img!} alt='' fill className='object-cover rounded-md' />
            
        </div>
        )) : "No Media Found"
    }
        </div>
    </div>
  )
}

export default UserMediaCard