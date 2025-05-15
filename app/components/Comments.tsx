import Comment from './Comment';
import { IPostDocument } from '@/models/post.model';
import { ICommentDocument } from '@/models/comment.model';

const Comments = ({ post }: { post: IPostDocument }) => {
  // Ensure comments always exist as an array safely
  const comments = post?.comments ?? [];

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default Comments;

