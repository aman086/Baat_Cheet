import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import { User } from '@prisma/client'
import { create } from 'domain'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UserInfoCardInteraction from './UserInfoCardInteraction'

const UserInfoCard = async({user} : {user : User}) => {

    const createdAtDate = new Date(user.createdAt)

    const formattedDate = createdAtDate.toLocaleDateString("en-US",{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
    if(!user) return null;

    const {userId : currentUser_ClerkId} = await auth();
    // console.log("currentUserID : " , currentUser_ClerkId);
    if(!currentUser_ClerkId) return null;
    const currentUserFull_Details = await prisma.user.findFirst({
        where:{
        clerkId: currentUser_ClerkId,
        }
    })
    const currentUserID = currentUserFull_Details?.id;

    let isUserBlocked = false;
    let isFollowing = false;
    let isFollowReqSent = false;


    const blockRes = await prisma.block.findFirst({
        where: {
            blockedId: currentUserID,
            blockerId: user.id
        },
    });

    const followingRes = await prisma.follower.findFirst({
        where: {
            followerId: currentUserID,
            followingId: user.id
        },
    });

    const followReqSent = await prisma.followRequest.findFirst({
        where: {
            senderId: currentUserID,
            receiverId: user.id
        },
    });

    (blockRes) ? isUserBlocked = true : isUserBlocked = false;
    (followingRes) ? isFollowing = true : isFollowing = false;
    (followReqSent) ? isFollowReqSent = true : isFollowReqSent = false;

    if(!currentUserID) return null;
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
                <span className='font-bold text-xl'>{(user.name && user.surname) ? user.name + " " + user.surname : user.username}</span>
                <p className='text-slate-400 text-xs'>@{user.username}</p>
            </div>
            {user.description && <p>{user.description}</p>}
            {user.city && <div className='flex gap-2 items-center '>
                <Image src="/map.png" alt='' height={16} width={16} className='h-4 w-4' />
                <span>Living in <b>{user.city}</b></span>
            </div>}
            {user.school && <div className='flex gap-2 items-center '>
                <Image src="/school.png" alt='' height={16} width={16} className='h-4 w-4' />
                <span>Went to <b>{user.school}</b></span>
            </div>}
            {user.work && <div className='flex gap-2 items-center '>
                <Image src="/work.png" alt='' height={16} width={16} className='h-4 w-4' />
                <span>Works at <b>{user.work}</b></span>
            </div>}
            <div className='flex items-center justify-between '>
                {user.website && <div className='flex gap-1 items-center'>
                    <Image src="/link.png" alt='' height={16} width={16} className='h-4 w-4' />
                    <Link href="/" className='text-blue-500 font-medium cursor-pointer'>{user.website}</Link>
                </div>}
                <div className='flex gap-2 items-center'>
                    <Image src="/date.png" alt='' height={16} width={16} className='h-4 w-4' />
                    <span>Joined {formattedDate}</span>
                </div>
            </div>
            <UserInfoCardInteraction userId = {user.id} currentUserID={currentUserID} isUserBlocked={isUserBlocked} isFollowing={isFollowing} isFollowReqSent={isFollowReqSent} />
        </div>
    </div>
  )
}

export default UserInfoCard