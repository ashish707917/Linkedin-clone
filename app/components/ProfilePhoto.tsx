import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const ProfilePhoto = ({src}: {src: string}) => {
  return (
    <div>
      <Avatar className='cursor-pointer'>
      <AvatarImage src={src} alt="banner" />
    </Avatar>
    </div>
  )  
}

export default ProfilePhoto
