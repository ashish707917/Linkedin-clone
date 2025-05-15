import React from 'react';
import PostInput from './PostInput';
import Posts from './Posts';
import { getAllPosts } from '@/lib/serveractions';
import { User } from '@clerk/nextjs/server';
import { IPostDocument } from '@/models/post.model';

interface FeedProps {
  user: User;
}

const Feed = async ({ user }: FeedProps) => {
  const posts: IPostDocument[] = await getAllPosts();

  return (
    <div className="flex-1">
      <PostInput user={user} />
      <Posts posts={posts} />
    </div>
  );
};

export default Feed;
