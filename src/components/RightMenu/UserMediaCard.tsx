import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserMediaCard = ({user} : {user : User}) => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
        {/* TOP */}
        <div className='flex justify-between items-center font-medium'>
            <span className='text-slate-500'>User Media</span>
            <Link href="/" className='text-blue-500'>See all</Link>
        </div>
        {/* BOTTOM */}
        <div className='flex justify-between flex-wrap gap-4'>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            <div className='relative w-1/5 h-24'>
                <Image src="https://images.pexels.com/photos/29773887/pexels-photo-29773887/free-photo-of-charming-getreidegasse-in-salzburg-austria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt='' fill className='object-cover rounded-md' />
            </div>
            
        </div>
    </div>
  )
}

export default UserMediaCard