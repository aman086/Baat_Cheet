"use client"

import { UpdateUserDetails } from '@/lib/actions';
import { User } from '@prisma/client'
import Image from 'next/image';
import React, { useActionState, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { boolean } from 'zod';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import { stat } from 'fs';


const UpdateUser = ({user} : {user : User}) => {

  const [open ,setOpen] = useState(false);
  const [cover , setCover] = useState<any>(user.cover);
  const [state, setState] = useState<{ success: boolean; error: boolean; fieldErrors?: any }>({
    success: false,
    error: false,
  });

  const router = useRouter();
  const handleClose = ()=>{
    setOpen(false);
    state.success && (state.success = false, state.error=false, router.refresh());
  }

  // const [state , formAction] = useActionState(UpdateUserDetails , {success: false, error: false});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await UpdateUserDetails(state, {
      formData,
      cover: cover?.secure_url || "",
    });

    if (response.success) {
      setState({ success: true, error: false });
      router.refresh();
    } else {
      setState({ success: false, error: true });
    }
  };




  return (
    <div>
      <span className='text-blue-500 text-sm cursor-pointer' onClick={()=> setOpen(true)}>Update</span>
      {open && <div className='absolute bg-black w-screen h-screen flex left-0 top-0 bg-opacity-65 items-center justify-center z-50'>
        <form  onSubmit={handleSubmit}  className='relative bg-white flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3 rounded-lg p-12 shadow-md'>
            <h1>Update Profile</h1>
            <div className='text-gray-500 mt-4 text-sm'>
                Use the Navbar Profile to change the Avatar or username.
            </div>
            <div className='flex flex-col gap-4 my-4'>
            <label htmlFor=''>Cover Picture</label>

           
              <div className='flex items-center gap-2 cursor-pointer'>
            <CldUploadWidget uploadPreset="Social" onSuccess={(result)=> setCover(result.info)}>
              {({ open }) => {
                return (
                  <button className='flex items-center gap-2 cursor-pointer' onClick={() => open()}>
                  <Image src={user.cover || "/noCover.jpg"} alt='' width={48} height={32} className='' />
                    <span className='underline text-sm text-gray-600'>Change</span>
                  </button>
                );
              }}
            </CldUploadWidget>
              </div>




            </div>
            <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
              <div className='flex gap-4 flex-col'>
                <label htmlFor='' className='text-md text-gray-500'>First Name</label>
                <input type='text' placeholder={user.name || "Aman"} className='p-2 ring-1 ring-gray-300 rounded-md text-sm' name='name' />
              </div>
              <div className='flex gap-4 flex-col'>
                <label htmlFor='' className='text-md text-gray-500'>Surname</label>
                <input type='text' placeholder={user.surname || "Tiwari"} className='p-2 ring-1 ring-gray-300 rounded-md text-sm' name='surname' />
              </div>
              <div className='flex gap-4 flex-col'>
                <label htmlFor='' className='text-md text-gray-500'>Description</label>
                <input type='text' placeholder={user.description || "Life is Beautiful..."} className='p-2 ring-1 ring-gray-300 rounded-md text-sm' name='description' />
              </div>
              <div className='flex gap-4 flex-col'>
                <label htmlFor='' className='text-md text-gray-500'>City</label>
                <input type='text' placeholder={user.city || "Sidhi"} className='p-2 ring-1 ring-gray-300 rounded-md text-sm' name='city' />
              </div>
              <div className='flex gap-4 flex-col'>
                <label htmlFor='' className='text-md text-gray-500'>School</label>
                <input type='text' placeholder={user.school || "NIT JSR"} className='p-2 ring-1 ring-gray-300 rounded-md text-sm' name='school' />
              </div>
              <div className='flex gap-4 flex-col'>
                <label htmlFor='' className='text-md text-gray-500'>Works</label>
                <input type='text' placeholder={user.work || "Google"} className='p-2 ring-1 ring-gray-300 rounded-md text-sm' name='work' />
              </div>

              <div className='flex gap-4 flex-col'>
                <label htmlFor='' className='text-md text-gray-500'>Website</label>
                <input type='text' placeholder={user.website || "google.com"} className='p-2 ring-1 ring-gray-300 rounded-md text-sm' name='website' />
              </div>
            </div>
            <button className='bg-blue-500 text-white p-3 rounded-md text-md cursor-pointer mt-4 backgo'>
              Update User Details
            </button>
            {state.success && <span className='text-green-500'>Profile has been updated!</span>}
            {state.error && <span className='text-red-500'>Something went Wrong!</span>}
            <div className='absolute text-sm right-2 top-3 cursor-pointer p-4' onClick={handleClose}>X</div>
        </form>
      </div>}
    </div>
  )
}

export default UpdateUser


