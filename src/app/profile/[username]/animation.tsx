"use client"

import { User } from "@prisma/client"
import {motion} from "framer-motion"

interface UserProfileProps {
    user: User & {
      _count: {
        followers: number;
        posts: number;
        followings: number;
      };
    };
  }

export const ProfileAnimation = ({user} : UserProfileProps)=>{
    return(
        <div>

        <motion.h1 initial={{x:300 , opacity: 0}} animate={{x:440 , opacity: 1}} transition={{duration : 1 , ease : "easeInOut"}} className='text-2xl font-bold text-black mt-20 mb-4 self-center'>{(user.name && user.surname) ? user.name + " " + user.surname : user.username}</motion.h1>

        <motion.div initial={{x:-200 , opacity: 0}} animate={{x:20 , opacity: 1}} transition={{duration : 1 , ease : "easeInOut"}} className='flex gap-12 mb-4 items-center justify-center'>
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
        </motion.div>
        </div>
    )
}