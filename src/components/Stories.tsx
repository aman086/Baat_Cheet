import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'
import StoryList from './StoryList';

const Stories = async() => {


  const {userId : userClerkId} = await auth();
  if(!userClerkId) return null;

  const currentUser = await prisma.user.findFirst({
    where:{
      clerkId: userClerkId,
    },
  });

  if(!currentUser) return null;

  const stories = await prisma.story.findMany({
    where:{
      expiresAt:{
        gt: new Date(),
      },
      OR:[
        {
          user:{
            followers:{
              some:{
                followerId: currentUser.id,
              },
            },
          },
        },{
          userId: currentUser.id
        },
      ],
    },
    include:{
      user: true,
    },
  });
  if(!stories) return null;
  return (
    <div className='p-4 bg-white shadow-md rounded-lg overflow-auto text-sm scrollbar-hide'>
      <StoryList stories={stories} userId={currentUser.id} />
    </div>
  )
}

export default Stories