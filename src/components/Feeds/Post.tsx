import Image from 'next/image'
import React, { Suspense } from 'react'
import Comments from './Comments'
import { Post as PostType, User } from '@prisma/client'
import PostInteraction from './PostInteraction';
import PostInfo from './PostInfo';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/client';

type FeedPostType = PostType & {user : User} & {likes : {userId : string}[]} & {_count : {comments: number}};
const Post = async({post} : {post : FeedPostType}) => {
    const {userId : currentUserId} = await auth();
    if(!currentUserId) return null;
    const userDetails = await prisma.user.findFirst({
        where:{
            clerkId: currentUserId,
        },
    });
    if(!userDetails) return null;
  return (
    <div className='flex flex-col gap-4 border border-gray-300 rounded-lg p-4 mb-6'>
        {/* USER */}
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Image src={post.user.avatar || "/noAvatar.png"} alt='' width={40} height={40} className='h-10 w-10 rounded-full'/>
                <span>{(post.user.name && post.user.surname) ? post.user.name + " " +  post.user.surname : post.user.username}</span>
            </div>
            {/* <Image src="/more.png" alt='' width={16} height={16} className='h-4 w-4'/> */}
            {(post.userId === userDetails.id) && <PostInfo postId={post.id}/>}
        </div>
        {/* Post Details (Description)  */}
        <div className='flex flex-col gap-4'>
            <p>{post.desc}</p>
           {post.img &&  <div className='w-full min-h-96 relative'>
                <Image src={post.img || ""} alt='' fill className='object-cover rounded-md'/>
            </div>}
        </div>
        {/* Interaction */}

        <Suspense fallback={<div>Loading...</div>}>
        <PostInteraction postId={post.id} likes={post.likes.map((like) => like.userId)} comments={post._count.comments} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
        <div><Comments postId={post.id} /></div>
        </Suspense>
    </div>
  )
}

export default Post