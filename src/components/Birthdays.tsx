import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Birthdays = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* ṬOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Birthdays</span>
        <Link href="/" className="text-blue-500">
          See All
        </Link>
      </div>
      {/* USER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/29677343/pexels-photo-29677343/free-photo-of-rural-life-in-hoi-an-s-rice-fields-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Aman Tiwari</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className='bg-blue-500 text-white px-2 py-1 rounded-md text-xs cursor-pointer'>Celebrate</button>
        </div>
      </div>
      {/* UPCOMING Birthdays */}
      <div className='p-4 bg-slate-100 rounded-lg flex items-center gap-4'>
      <Image
            src="/gift.png"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
        />
        <Link href="/" className='flex flex-col gap-1 text-xs'>
            <span className='text-gray-700 font-semibold'>Upcoming Birthdays</span>
            <span className='text-gray-500'>See other 16 have upcoming Birthdays</span>
        </Link>
      </div>
    </div>
  )
}

export default Birthdays