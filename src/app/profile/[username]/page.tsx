import AddPost from '@/components/Feeds/AddPost';
import { Feed } from '@/components/Feeds/Feed';
import { LeftMenu } from '@/components/LeftMenu/LeftMenu';
import { RightMenu } from '@/components/RightMenu/RightMenu';
import Stories from '@/components/Feeds/Stories';
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { use } from 'react'

const Profile = async({params} : {params : {username : string}}) => {

  const username = params.username;
  console.log("username - " , username);
  let isBlock;
  const user = await prisma.user.findFirst({
    where:{
      //  clerkId: userId,
      username : username,
    },
    include:{
      _count:{
        select:{
         followers: true,
         posts: true,
         followings: true
        }
      }
    }
  });
  
  // console.log(user);
  
  if(!user) return notFound();
  const {userId : currentUser_ClerkId} = await auth();
  // console.log("currentUserID : " , currentUser_ClerkId);
  if(!currentUser_ClerkId) return null;
  const currentUserFull_Details = await prisma.user.findFirst({
    where:{
      clerkId: currentUser_ClerkId,
    }
  })
  const currentUserID = currentUserFull_Details?.id;
  // console.log("currentUserFull_Details" , currentUserFull_Details);

  const blockCheck = await prisma.block.findFirst({
    where:{
      blockedId: currentUserID,
      blockerId: user.id
    }
  })
  if(blockCheck) isBlock = true;
  console.log("Block Details" , blockCheck);

  if(isBlock) return notFound();
  return (
    <div className='flex gap-6 pt-6'>
    <div className="hidden xl:block w-[20%]"><LeftMenu type="profile" /></div>
    <div className="w-full lg:w-[70%] xl:w-[50%]">
      <div className="flex flex-col gap-6">
        <div className='h-64 relative'>
            <Image src={user?.cover || "/noCover.jpg"} alt='' fill className='rounded-md object-cover'/>
            <Image src={user?.avatar || "/noAvatar.png"}alt='' width={128} height={128} className='h-32 w-32 absolute left-0 right-0 m-auto -bottom-16 rounded-full ring-2 ring-white'/>
        </div>
        <h1 className='text-2xl font-bold text-black mt-20 mb-4 self-center'>{(user.name && user.surname) ? user.name + " " + user.surname : user.username}</h1>
        <div className='flex gap-12 mb-4 items-center justify-center'>
            <div className='flex flex-col gap-1 items-center'>
              <span className='font-bold text-md'>{user._count.posts}</span>
              <span className='font-bold text-md'>Posts</span>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <span className='font-bold text-md'>{user._count.followers}</span>
              <span className='font-bold text-md'>Followers</span>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <span className='font-bold text-md'>{user._count.followings}</span>
              <span className='font-bold text-md'>Following</span>
            </div>
        </div>
        <Feed username={user.username} />
      </div>
    </div>
    <div className="hidden lg:block w-[30%]"><RightMenu user={user}/></div>
  </div>
  )
}

export default Profile;
