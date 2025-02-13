"use client"

import { addStory } from '@/lib/actions';
import { useUser } from '@clerk/nextjs';
import { Story, User } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useOptimistic, useState } from 'react'

type StoryWithUser = Story & {
  user : User;
}
const StoryList = ({stories, userId} : {stories : StoryWithUser[], userId : string}) => {

  const {user , isLoaded} = useUser();
  const [img , setImg] = useState<any>();
  const [story , setStory] = useState<StoryWithUser[]>(stories);
  const [fullViewStory , setFullViewStory] = useState(false);
  const [storyImg , setStoryImg] = useState("");
  const [optimisticStory , setOptimisticStory] = useOptimistic(story,
    (state , value : StoryWithUser)=>[...state , value],
  )


  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;
  const add = async()=>{
    console.log("Adding Story");
    
    setOptimisticStory({
      id : Math.random().toString(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId : userId,
      user: {
          id: userId,
          avatar: user.imageUrl || "/noAvatar.png",
          username: "Sending please wait...",
          clerkId : "",
          cover  : "",
          description: "",
          name: "",
          surname: "",
          city: "",
          work: "",
          school: "",
          website: "",
          createdAt : new Date(Date.now()),
          
        },
      });
      
      try {
  
      const newStory = await addStory(img.secure_url, userId);
      setStory((prev) => [newStory!, ...prev]);
      setImg(null);
} catch (error) {
  console.log(error);
}
}

return (
    <div>
      <div className='flex gap-8 w-max'>
      <div className='flex flex-col gap-2 items-center cursor-pointer'>

      <CldUploadWidget uploadPreset="Social" onSuccess={(result, {widget})=> {setImg(result.info); widget.close()}}>
              {({ open }) => {
                return (
                  <button className='flex items-center gap-2 cursor-pointer' onClick={() => open()}>
                  
                  <Image src={ img?.secure_url || user.imageUrl || "/noAvatar.png"} alt='' width={80} height={80} className=' w-20 h-20 rounded-full ring-2' />

                  </button>
                );
              }}
            </CldUploadWidget>
              {img ? <form action={add} >
                <button className='font-medium'>Send</button>
              </form> : <span className='font-medium'>Add a Story</span>}
             
            </div>
            {optimisticStory.map((story)=>{

              return (
                <div key={story.id} className='flex flex-col gap-2 items-center cursor-pointer' onClick={()=> {setFullViewStory(true); setStoryImg(story.img)}}>
                  <Image src={story.img} alt='' width={80} height={80} className=' w-20 h-20 rounded-full ring-2' />
                  <span className='font-medium'>{story.user.username}</span>
                </div>
              )
            }
          )
          }
            </div>
    </div>
  )
}

export default StoryList