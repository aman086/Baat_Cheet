"use client";

import Link from 'next/link';
import React from 'react'
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  return (
    <div className='h-24 flex justify-between items-center'>
        {/* Left */}
        <div className='w-[20%] md:hidden xl:flex 2xl:flex'>
            <Link href="/" className='font-bold text-xl text-blue-600'>Baat-Cheet</Link>
        </div>

        {/* Center */}
        <div className='hidden md:flex w-[50%] text-sm flex items-center justify-between'>
            <div className='flex gap-6 text-gray-600' >
                <Link href="" className='flex items-center gap-2'>
                 <Image src="/home.png" alt='Homepage' height={16} width={16} className='w-4 h-4'  />
                <span>Homepage</span>
                </Link>
                <Link href="" className='flex items-center gap-2'>
                 <Image src="/friends.png" alt='Friends' height={16} width={16} className='w-4 h-4'  />
                <span>Friends</span>
                </Link>
                <Link href="" className='flex items-center gap-2'>
                 <Image src="/stories.png" alt='Stories' height={16} width={16} className='w-4 h-4'  />
                <span>Stories</span>
                </Link>
            </div>
            <div className='hidden xl:flex p-2 bg-slate-100 items-center rounded-xl'>
                <input type='text' placeholder='Search....' className='bg-transparent outline-none ' />
                <Image src="/search.png"  alt="" width={14} height={14} />
            </div>
        </div>

        {/* Right */}
        <div className='w-[30%] flex justify-end items-center gap-4 xl:gap-8'>
            <MobileMenu />
            <ClerkLoading>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
  role="status"></div>
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <div className='cursor-pointer'>
                       <Image src="/people.png" alt='' width={20} height={20} />
                    </div>
                    <div className='cursor-pointer'>
                       <Image src="/messages.png" alt='' width={20} height={20} />
                    </div>
                    <div className='cursor-pointer'>
                       <Image src="/notifications.png" alt='' width={20} height={20} />
                    </div>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <div className=''>
                        {/* <Image src="/login.png" alt='' width={20} height={20} /> */}
                        <Link href="/sign-in">Login/Register</Link>
                    </div>
                </SignedOut>
            </ClerkLoaded>
        </div>
    </div>
  )
}

export default Navbar;
