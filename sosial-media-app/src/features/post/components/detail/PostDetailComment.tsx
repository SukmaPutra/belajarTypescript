// features/posts/components/detail/PostDetailComments.tsx
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { usePostActions } from '../../hooks/usePostActions';
import type { Post } from '../../types/post.types';

interface PostDetailCommentsProps {
  post: Post;
}

export const PostDetailComments = ({ post }: PostDetailCommentsProps) => {
  const {
    comments,
    isLoadingComments,
    commentError,
    fetchComments,
    addComment,
  } = usePostActions(post.id);

  const [commentInput, setCommentInput] = useState('');

  // Auto fetch saat komponen mount
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    await addComment(commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* List komentar — scrollable */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        {isLoadingComments ? (
          <div className="flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 rounded-md bg-[#1e293b] animate-pulse" />
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-[#475569] text-sm text-center py-4">
            Belum ada komentar. Jadilah yang pertama!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 items-start">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-sky-400">
                  @{comment.author.username}
                </span>
                <span className="text-sm text-[#cbd5e1] leading-relaxed">
                  {comment.content}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Error */}
      {commentError && (
        <p className="text-rose-500 text-xs px-4">{commentError}</p>
      )}

      {/* Input — sticky di bawah */}
      <div className="flex gap-2 p-4 border-t border-[#1e293b]">
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
          placeholder="Tambahkan komentar..."
          className="
            flex-1 bg-[#0f172a] border border-[#1e293b] rounded-lg
            px-3 py-2 text-sm text-white placeholder:text-[#475569]
            focus:outline-none focus:ring-1 focus:ring-sky-500/50
            transition-colors
          "
        />
        <button
          onClick={handleAddComment}
          disabled={!commentInput.trim()}
          aria-label="Kirim komentar"
          className="
            flex items-center justify-center gap-1.5
            px-3 py-2 bg-sky-500 text-white text-sm rounded-lg
            hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed
            transition-colors duration-150
          "
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};