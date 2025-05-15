'use client';

import React from 'react';
import Comment from './Comment';
import { ICommentDocument } from '@/models/comment.model';
import { IPostDocument } from '@/models/post.model';

const Comments = ({ post }: { post: IPostDocument }) => {
  // Cast comments to ICommentDocument[] for correct typing
  const comments = post?.comments as ICommentDocument[] | undefined;

  return (
    <div>
      {comments?.map((comment) => {
  const id = comment._id as string | number;
  return <Comment key={String(id)} comment={comment} />;
})}

    </div>
  );
};
export default Comments
