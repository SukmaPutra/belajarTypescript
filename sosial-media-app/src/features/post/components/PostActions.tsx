// features/posts/components/PostActions.tsx
import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send } from 'lucide-react';
import { ActionButton } from './ActionButton';
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
      <div className="flex items-center gap-1">
        {/* Like */}
        <ActionButton
          icon={
            isLiked
              ? <Heart size={16} className="fill-rose-500 text-rose-500" />
              : <Heart size={16} />
          }
          count={post.likesCount}
          onClick={() => toggleLike(post.likesCount)}
          active={isLiked}
          activeColor="text-rose-500"
          hoverColor="hover:text-rose-500"
          hoverBg="hover:bg-rose-500/10"
          label="Suka"
        />

        {/* Comment */}
        <ActionButton
          icon={<MessageCircle size={16} />}
          count={post.commentsCount ?? 0}
          onClick={handleToggleComments}
          active={showComments}
          activeColor="text-sky-400"
          hoverColor="hover:text-sky-400"
          hoverBg="hover:bg-sky-400/10"
          label="Komentar"
        />

        {/* Repost */}
        <ActionButton
          icon={<Repeat2 size={16} />}
          count={post.repostsCount ?? 0}
          onClick={() => toggleRepost(post.repostsCount ?? 0)}
          active={isReposted}
          activeColor="text-emerald-400"
          hoverColor="hover:text-emerald-400"
          hoverBg="hover:bg-emerald-400/10"
          label="Repost"
        />
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="flex flex-col gap-3 pt-3 border-t border-[#1e293b]">
          {/* Input komentar */}
          <div className="flex gap-2">
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              placeholder="Tulis komentar..."
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
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </div>

          {/* List komentar */}
          {isLoadingComments ? (
            <div className="flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 rounded-md bg-[#1e293b] animate-pulse" />
              ))}
            </div>
          ) : comments.length === 0 ? (
            <p className="text-[#475569] text-sm text-center py-2">
              Belum ada komentar. Jadilah yang pertama!
            </p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2 items-start">
                  <span className="text-sm font-semibold text-sky-400 shrink-0">
                    @{comment.author.username}
                  </span>
                  <span className="text-sm text-[#cbd5e1] leading-relaxed">
                    {comment.content}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>

    )
}