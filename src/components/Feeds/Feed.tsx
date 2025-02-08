import React from 'react'
import Post from './Post'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client';

export const Feed = async({username} : {username ?: string}) => {

  const {userId : userClerkId} = await auth();

  if(!userClerkId) return null;
  const userCompleteDetails = await prisma.user.findFirst({
    where:{
      clerkId: userClerkId,
    },
  });

  if(!userCompleteDetails) return null;
  const userId = userCompleteDetails.id;
  let posts:any[] = [];
  if(username){

     posts = await prisma.post.findMany({
      where:{
        userId: userId,
      },
      include:{
        user: true,
        likes:{
          select:{
            userId: true,
          }
        },
        _count:{
          select:{
            comments: true,
          }
        }
      },
      orderBy:{
        createdAt: "desc",
      }
     })
  }
  
  console.log("userID -> " , userId);
  if(!username && userId){
    // console.log("username nahi mila");
    const following = await prisma.follower.findMany({
      where:{
        followingId: userId,
      },
      select:{
        followerId: true,
      },
    });

    // console.log("following -> " , following);
    const followingIds = following.map(f => f.followerId);
    // console.log("followingIds -> " , followingIds);
    posts = await prisma.post.findMany({
      where:{
        userId:{
          in: followingIds,
        }
      },
      include:{
        user: true,
        likes:{
          select:{
            userId: true,
          }
        },
        _count:{
          select:{
            comments: true,
          }
        }
      },
      orderBy:{
        createdAt: "desc",
      }
    })

  }


  //  console.log("userName -> " + username);
  //  console.log("Post -> " + posts);

  return (
    <div className='p-4 bg-white rounded-lg flex flex-col gap-12'>
      {
        posts?.length ? (posts.map(post => <Post key={post.id} post={post} />)) : "No Post Found"
      }

    </div>
  )
}
