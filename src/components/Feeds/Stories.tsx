import Image from 'next/image'
import React from 'react'

const Stories = () => {
  return (
    <div className='p-4 bg-white shadow-md rounded-lg overflow-auto text-sm scrollbar-hide'>
      <div className='flex gap-8 w-max'>
      <div className='flex flex-col gap-2 items-center cursor-pointer'>
          <Image src="https://images.pexels.com/photos/4081897/pexels-photo-4081897.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' width={80} height={80} className=' w-20 h-20 rounded-full ring-2' />
          <span className='font-medium'>Aman</span>
      </div>
      </div>
    </div>
  )
}

export default Stories