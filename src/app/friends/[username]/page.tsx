"use client"

import { getFollowers } from '@/lib/actions';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = ({params} : {params : {username : string}}) => {
  // const {username} = params;

  // const fetchFollowers
  const [followersList , setFollowersList] = useState<any[]>([]);

  const fetchFollowings = async() => {
    const response = await getFollowers();
    if(!response) return;
    setFollowersList(response);
    // console.log("followersList -> " , response);
  }

  useEffect(() => {
    fetchFollowings();
  }, []);

  return (
    <div className=' xl:w-[100%] h-[calc(100vh-96px)]'>
     <div className='flex flex-col p-10 justify-center items-center border border-b-8 bg-slate-200 h-[calc(100vh-96px)]'>
        <div className='flex flex-col mt-16 flex-wrap grid grid-cols-2 overflow-y-auto gap-12 max-h-[calc(100vh-250px)] scrollbar-hide'>
          {followersList.map(follower =>(
          <Link href="/profile/dev_12" key={follower.id}>
            <div className='flex flex-row gap-20 justify-between items-center p-4 w-72 rounded-xl mt-4 border border-gray-100 shadow-md' >
            <Image src={follower.following.avatar || "/noAvatar.png"} alt="" width={32} height={32} className='h-8 w-8 rounded-full'  />
            <h1>{follower.following.username}</h1>
            </div>
              </Link>
          ))}
          {/* <div className='flex flex-row gap-20 justify-between items-center p-4 w-72 rounded-xl mt-4 border border-gray-100 shadow-md'>
          <Image src="https://images.pexels.com/photos/29633209/pexels-photo-29633209/free-photo-of-paysage-volcanique-maussade-de-thingeyjarsveit.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={32} height={32} className='h-8 w-8 rounded-full'  />
          <h1>{username}</h1>
          </div>
      
          <div className='flex flex-row gap-20 justify-between items-center p-4 w-72 rounded-xl mt-4 border border-gray-100 shadow-md'>
          <Image src="https://images.pexels.com/photos/29633209/pexels-photo-29633209/free-photo-of-paysage-volcanique-maussade-de-thingeyjarsveit.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={32} height={32} className='h-8 w-8 rounded-full'  />
          <h1>{username}</h1>
          </div> */}
          
        </div>
     </div>
    </div>
  )
}

export default Page




