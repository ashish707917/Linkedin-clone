'use client'
import React from 'react'
import Post1 from './Post1'
import { IPostDocument } from '@/models/post.model'

const Posts = ({ posts }: { posts: IPostDocument[] }) => {
  return (
    <div>
      {posts?.map((post) => (
        <Post1 key={post._id.toString()} post={post} />
      ))}
    </div>
  )
}

export default Posts
