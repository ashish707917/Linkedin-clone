'use client'

import Image from 'next/image'
import React from 'react'
import ProfilePhoto from './ProfilePhoto'
import { getAllPosts } from '@/lib/serveractions'

const Sidebar =  ({ user }: { user: any }) => {
  return (
    <div className='hidden md:block w-[20%] h-fit border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='flex flex-col items-center'>

        {/* Banner */}
        <div className='w-full h-16 overflow-hidden'>
          {user && (
            <Image
              src="/banner.webp"
              alt="Banner"
              width={200}
              height={200}
              className='w-full h-full rounded-t'
            />
          )}
        </div>

        {/* Profile Photo */}
        <div className='-mt-6 flex justify-center'>
          <ProfilePhoto src={user ?  user?.imageUrl! :"/banner.webp"} />
        </div>

        {/* User Info */}
        <div className='border-b border-b-gray-300 w-full'>
          <div className='p-2 mt-5 text-center'>
            <h1 className='font-bold text-[15px] hover:underline cursor-pointer'>
              {user ? user.username : 'krishna mern stack'}
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className='text-xs w-full'>
          <div className='flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer'>
            <p className='text-gray-600'>Post Impressions</p>
            <p className='text-blue-500 font-semibold text-sm'>88</p>
          </div>
          <div className='flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer'>
            <p className='text-gray-600'>Posts</p>
            <p className='text-blue-500 font-semibold text-sm'>1</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Sidebar

