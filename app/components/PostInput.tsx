'use client';
import React, { useState } from 'react'
import ProfilePhoto from './ProfilePhoto'
import { Input } from '@/components/ui/input'
import { PostDialog } from './PostDialog';

type User = {
  imageUrl?: string
}

const PostInput = ({ user }: { user: User }) => {
  const [open, setOpen] = useState<boolean>(false);

  const inputHandler = () => {
    setOpen(true);
  }

  return (
    <div className='bg-white p-4 m-2 md:m-0 border border-gray-300 rounded-lg'>
      <div className='flex items-center gap-3'>
        {/* Pass empty string fallback to satisfy string type */}
        <ProfilePhoto src={user?.imageUrl || ''} />
        <Input 
          type='text'
          placeholder='Start a post'
          className='rounded-full hover:bg-gray-100 h-12 cursor-pointer'
          onClick={inputHandler}
        />
        <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl || ''} />
      </div>
    </div>
  )
}

export default PostInput
