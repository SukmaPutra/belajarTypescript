import { useEffect } from "react";
import { useCommentStore } from "../../store/useCommentStore";

type CommentsListProps = {
  postId: string;
};

const CommentsList = ({ postId }: CommentsListProps) => {
  const { comments, fetchComments } = useCommentStore();

  useEffect(() => {
    fetchComments(postId);
  }, [postId, fetchComments]);

  return (
    <div className="border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-md bg-gray-50 p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-800">{comment.author}</p>
              <p className="text-xs text-gray-500">{comment.createdAt.toLocaleString("id-ID")}</p>
            </div>

            <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
