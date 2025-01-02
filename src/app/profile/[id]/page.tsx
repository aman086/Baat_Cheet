import AddPost from '@/components/AddPost';
import { Feed } from '@/components/Feed';
import { LeftMenu } from '@/components/LeftMenu';
import { RightMenu } from '@/components/RightMenu';
import Stories from '@/components/Stories';
import Image from 'next/image';
import React from 'react'

const Profile = () => {
  return (
    <div className='flex gap-6 pt-6'>
    <div className="hidden xl:block w-[20%]"><LeftMenu type="profile" /></div>
    <div className="w-full lg:w-[70%] xl:w-[50%]">
      <div className="flex flex-col gap-6">
        <div className='h-64 relative'>
            <Image src="https://images.pexels.com/photos/29677343/pexels-photo-29677343/free-photo-of-rural-life-in-hoi-an-s-rice-fields-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='rounded-md object-cover'/>
            <Image src="https://images.pexels.com/photos/29715958/pexels-photo-29715958/free-photo-of-woman-taking-photos-on-a-seaside-beach.png?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' width={128} height={128} className='h-32 w-32 absolute left-0 right-0 m-auto -bottom-16 rounded-full ring-2 ring-white'/>
        </div>
        <h1 className='text-2xl font-bold text-black mt-20 mb-4 self-center'>Aman Tiwari</h1>
        <div className='flex gap-12 mb-4 items-center justify-center'>
            <div className='flex flex-col gap-1 items-center'>
              <span className='font-bold text-md'>142</span>
              <span className='font-bold text-md'>Posts</span>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <span className='font-bold text-md'>1.2K</span>
              <span className='font-bold text-md'>Followers</span>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <span className='font-bold text-md'>1.4K</span>
              <span className='font-bold text-md'>Following</span>
            </div>
        </div>
        <Feed />
      </div>
    </div>
    <div className="hidden lg:block w-[30%]"><RightMenu userID="123"/></div>
  </div>
  )
}

export default Profile;
