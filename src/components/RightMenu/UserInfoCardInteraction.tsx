"use client"

import { switchFollow } from "@/lib/actions";
import { useState } from "react"




const UserInfoCardInteraction = ({userId , currentUserID , isUserBlocked , isFollowing , isFollowReqSent} : {
    userId : string,
    currentUserID : string,
    isUserBlocked : Boolean,
    isFollowing : Boolean,
    isFollowReqSent : Boolean
}) => {

  const [userData , setUserData] = useState({
    userBlocked : isUserBlocked,
    following : isFollowing,
    followReqSent : isFollowReqSent
  });

  const follow = async()=>{
    await switchFollow({userId , currentUserID, isUserBlocked, isFollowing , isFollowReqSent});
    setUserData((prev)=>({
      ...prev ,
      following : prev.following && false,
      followReqSent : !prev.following && !prev.followReqSent ? true : false,
    }))
  }

  return (
    <>
    {/* BUTTON - Following */}
    <form action={follow}>

    <button className='bg-blue-500 text-white 
            p-2 rounded-lg'>{userData.following ? "Following" : (userData.followReqSent ? "Follow Request Sent" : "Follow")}</button>
            </form>
            <form>
            <div className='flex justify-end'>
             <span className='text-red-500 cursor-pointer'>{userData.userBlocked ? "Blocked" : "Block"}</span>
            </div>
            </form>
    </>
  )
}

export default UserInfoCardInteraction