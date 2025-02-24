import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'
import StoryList from './StoryList';

const Stories = async() => {


  const {userId : currentUserId} = await auth();
  if(!currentUserId) return null;

  // const currentUser = await prisma.user.findFirst({
  //   where:{
  //     clerkId: userClerkId,
  //   },
  // });

  // if(!currentUser) return null;

  const stories = await prisma.story.findMany({
    where:{
      expiresAt:{
        gt: new Date(),
      },
      OR:[
        {
          user:{
            followings:{
              some:{
                followingId: currentUserId,
              },
            },
          },
        },{
          userId: currentUserId
        },
      ],
    },
    include:{
      user: true,
    },
  });
  console.log("Stories -> " , stories);
  if(!stories) return null;
  return (
    <div className='p-4 bg-white shadow-md rounded-lg overflow-auto text-sm scrollbar-hide'>
      <StoryList stories={stories} userId={currentUserId} />
    </div>
  )
}

export default Stories