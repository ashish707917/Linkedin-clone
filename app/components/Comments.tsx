import React from 'react';
import Comment from './Comment';
import { IPostDocument } from '@/models/post.model';
import { ICommentDocument } from '@/models/comment.model';

interface CommentsProps {
  post: IPostDocument & { comments?: ICommentDocument[] };
}

const Comments: React.FC<CommentsProps> = ({ post }) => {
  return (
    <div>
      {(post.comments ?? []).map((comment) => {
        if (!comment || !comment._id) return null; // skip invalid comments
        return <Comment key={comment._id.toString()} comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
