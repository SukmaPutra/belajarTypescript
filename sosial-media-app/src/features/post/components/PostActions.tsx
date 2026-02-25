// features/posts/components/PostActions.tsx
import { useState } from 'react';
import { formatCount } from '@/core/utils/formatters';
import { usePostActions } from '../hooks/usePostActions';
import type { Post } from '../types/post.types';


interface PostActionProps {
    post: Post;
}

export const PostActions = ({post}: PostActionProps) => {

    const { isLiked, isReposted, comments, isLoadingComments, toggleLike, toggleRepost, fetchComments, addComment } = usePostActions(post.id);

    const [showComments, setShowComments] = useState(false);
    const [ commentInput, setCommentInput] = useState('');

    const handleToggleComments = () => {
        if(!showComments) fetchComments();
        setShowComments(prev => !prev);
    };

    const handleAddComment = async() => {
        if(!commentInput.trim()) return;
        await addComment(commentInput.trim(), post.commentsCount);
        setCommentInput('');
    };

    return (
         <div className="flex flex-col gap-3">
      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        {/* Like */}
        <button
          onClick={() => toggleLike(post.likesCount)}
          className={`flex items-center gap-1.5 text-sm transition-colors
            ${isLiked ? 'text-[#ef4444]' : 'text-[#94a3b8] hover:text-[#ef4444]'}`}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span>{formatCount(post.likesCount)}</span>
        </button>

        {/* Repost */}
        <button
          onClick={() => toggleRepost(post.repostsCount)}
          className={`flex items-center gap-1.5 text-sm transition-colors
            ${isReposted ? 'text-[#22c55e]' : 'text-[#94a3b8] hover:text-[#22c55e]'}`}
        >
          <span>🔁</span>
          <span>{formatCount(post.repostsCount)}</span>
        </button>

        {/* Comment */}
        <button
          onClick={handleToggleComments}
          className="flex items-center gap-1.5 text-sm text-[#94a3b8] hover:text-[#137fec] transition-colors"
        >
          <span>💬</span>
          <span>{formatCount(post.commentsCount)}</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="flex flex-col gap-3 pt-3 border-t border-[#334155]">
          {/* Input komentar */}
          <div className="flex gap-2">
            <input
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddComment()}
              placeholder="Tulis komentar..."
              className="flex-1 bg-[#0f172a] border border-[#334155] rounded-lg
                px-3 py-2 text-sm text-white placeholder:text-[#94a3b8]
                focus:outline-none focus:ring-1 focus:ring-[#137fec]"
            />
            <button
              onClick={handleAddComment}
              disabled={!commentInput.trim()}
              className="px-3 py-2 bg-[#137fec] text-white text-sm rounded-lg
                disabled:opacity-50 hover:bg-[#0d66c2] transition-colors"
            >
              Kirim
            </button>
          </div>

          {/* List komentar */}
          {isLoadingComments ? (
            <p className="text-[#94a3b8] text-sm">Memuat komentar...</p>
          ) : comments.length === 0 ? (
            <p className="text-[#94a3b8] text-sm">Belum ada komentar.</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <span className="text-sm font-medium text-[#137fec]">
                  @{comment.author.username}
                </span>
                <span className="text-sm text-[#cbd5e1]">{comment.content}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>

    )
}