import React from 'react'
import PostInput from './PostInput'
import Posts from './Posts'
import { getAllPosts } from '@/lib/serveractions'

const Feed = async ({user}:{user:any}) => {
  const posts = await getAllPosts();
  return (
    <div className='flex-1'>
      <PostInput user={user} />
      <Posts posts={posts!}/>
    </div>
  )
}

export default Feed
