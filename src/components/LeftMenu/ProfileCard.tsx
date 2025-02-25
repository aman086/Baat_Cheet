
import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link';
// import { useRouter } from 'next/navigation';


import React from 'react'

const ProfileCard = async() => {


   const {userId} = await auth();

   if(!userId) return "nahi mila user";

   const user = await prisma.user.findFirst({
    where:{
      id: userId,
    },
    include:{
      _count:{
        select:{
          followers: true
        }
      }
    }
   });

  //  const router = useRouter();
   console.log(user);

  //  const handleProfileClick = ()=>{
  //   router.push(`/profile/${user?.username}`);
  //  }

  if(!user) return null;
  return (
    <div className='p-4 bg-white shadow-md rounded-lg text-sm flex flex-col gap-8 font-medium'>
        <div className='h-20 relative'>
           <Image src={user?.cover || "/noCover.jpg"} alt='' fill className='rounded-md object-cover' />
           <Image src={user?.avatar || "/noAvatar.png"} alt='' width={48} height={48} className='object-cover w-12 h-12 rounded-full z-10 absolute left-0 right-0 m-auto ring-1 ring-white -bottom-6 ' />
        </div>
        <div className='flex flex-col items-center'>
            <span className='text-lg font-bold text-black'>{(user.name && user.surname) ? user.name + " " + user.surname : user.username}</span>
            {/* <span className='text-lg font-bold text-black'>Aman Tiwari</span> */}
            <span className='text-slate-400 text-xs'>{user?._count.followers} Followers</span>
        </div >
        <div className='flex items-center justify-center'>
        {/* <button className='bg-blue-500 text-white p-2 rounded-md font-normal' onClick={handleProfileClick}>My Profile</button> */}
        <Link href={`/profile/${user.username}`}>
          <button className='bg-blue-500 text-white p-2 rounded-md font-normal'>My Profile</button>
        </Link>
        </div>
    </div>
  )
}

export default ProfileCard 