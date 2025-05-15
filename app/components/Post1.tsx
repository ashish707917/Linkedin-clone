'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IPostDocument } from '@/models/post.model';
import { useUser } from '@clerk/nextjs';
import { Trash2 } from 'lucide-react';
import React from 'react';
import ProfilePhoto from './ProfilePhoto';
import PostContent from './PostContent';
import SocialOptions from './SocialOptions';
import ReactTimeago from 'react-timeago';
import { deletePostAction } from '@/lib/serveractions';

interface Post1Props {
  post: IPostDocument;
}

const Post1: React.FC<Post1Props> = ({ post }) => {
  const { user } = useUser();
  const fullName = post?.user?.firstName + ' ' + post?.user?.lastName;
  const loggedInUser = user?.id === post?.user?.userId;

  return (
    <div className="bg-white my-2 mx-2 md:mx-0 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        <ProfilePhoto src={post?.user?.ProfilePhoto || '/default-avatar.png'} />
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">
              {fullName}{' '}
              {loggedInUser && <Badge variant={'secondary'}>you</Badge>}
            </h1>
            <p className="text-xs text-gray-500">
              @{user ? user.username : 'username'}
            </p>
            <ReactTimeago date={new Date(post.createdAt)} />
          </div>
        </div>
        {loggedInUser && (
          <form action={() => deletePostAction(post._id.toString())}>
            <Button
              type="submit"
              size={'icon'}
              className="rounded-full"
              variant={'outline'}
            >
              <Trash2 />
            </Button>
          </form>
        )}
      </div>
      <PostContent post={post} />
      <SocialOptions post={post} />
    </div>
  );
};

export default Post1;
