import Image from 'next/image'
import React from 'react'

const ProfileCard = () => {
  return (
    <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-8 font-medium'>
        <div className='h-20 relative'>
           <Image src="https://images.pexels.com/photos/29677343/pexels-photo-29677343/free-photo-of-rural-life-in-hoi-an-s-rice-fields-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='rounded-md object-cover' />
           <Image src="https://images.pexels.com/photos/29715958/pexels-photo-29715958/free-photo-of-woman-taking-photos-on-a-seaside-beach.png?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' width={48} height={48} className='object-cover w-12 h-12 rounded-full z-10 absolute left-0 right-0 m-auto ring-1 ring-white -bottom-6 ' />
        </div>
        <div className='flex flex-col items-center'>
            <span className='text-lg font-bold text-black'>Aman Tiwari</span>
            <span className='text-slate-400 text-xs'>500 Followers</span>
        </div >
        <div className='flex items-center justify-center'>
        <button className='bg-blue-500 text-white p-2 rounded-md font-normal'>My Profile</button>
        </div>
    </div>
  )
}

export default ProfileCard 