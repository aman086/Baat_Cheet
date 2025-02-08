"use client"

import { getUserId_FromClerkId, switchLike } from '@/lib/actions'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useEffect, useOptimistic, useState } from 'react'

const PostInteraction = ({postId , likes , comments} : {postId : string , likes: string[] , comments : number}) => {

 const {isLoaded , userId} = useAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);
//  if(!userId) return null;
//  if(!currentUser) return null;
 const [likeState , setLikeState] = useState({
  likeCount : likes.length,
  isLiked : false
//   isLiked : userId ? likes.includes(currentUser.id) : false,
 });
 
  const [optimisticLike , swithcOptimisticLike] = useOptimistic(likeState , (state,value)=>{
    return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked : !state.isLiked
    }
  })

  useEffect(() => {
    const fetchUser = async () => {
        if (userId) {
            const user = await getUserId_FromClerkId(userId);
            setCurrentUser(user);
            if (user && likes.includes(user.id)) {
                setLikeState((prevState) => ({
                    ...prevState,
                    isLiked: true,
                }));
            }
        }
    };
    fetchUser();
}, [userId, likes]);
// if (!userId || !currentUser) return null;
  const likeAction = async()=>{
    swithcOptimisticLike("")
    try {
        if (!postId) {
            throw new Error("Post ID is required");
        }
        // console.log("Calling switchLike with postId:", postId);
        await switchLike({postId : postId});
        setLikeState((state)=>({
            likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
            isLiked : !state.isLiked
        }));
    } catch (error) {
       console.log(error); 
    }
  }
  return (
    <div className='flex items-center justify-between text-sm my-4'>
                <div className='flex gap-8'>
                    <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                        <form action={likeAction}>
                            <button>

                        <Image src={optimisticLike.isLiked ? "/liked.png" : "/like.png"} alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
                            </button>
                        </form>
                        <span className='text-slate-50'>|</span>
                        <span className='text-slate-500'>{optimisticLike.likeCount} <span className='hidden md:inline'> Likes</span></span>
                    </div>
                    <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                        <Image src="/comment.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
                        <span className='text-slate-50'>|</span>
                        <span className='text-slate-500'>{comments} <span className='hidden md:inline'> Comments</span></span>
                    </div>
                </div>
                <div className='flex items-center'>
                <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
                        <Image src="/share.png" alt='' width={16} height={16} className='h-4 w-4 cursor-pointer' />
                        <span className='text-slate-50'>|</span>
                        <span className='text-slate-500'><span className='hidden md:inline'> Shares</span></span>
                    </div>
                </div>
            </div>
  )
}

export default PostInteraction