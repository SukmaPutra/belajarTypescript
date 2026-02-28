// features/posts/components/detail/PostDetailInfo.tsx
import { Avatar } from '@/shared/components';
import { formatRelativeTime, toDate } from '@/core/utils/formatters';
import type { Post } from '../../types/post.types';

interface PostDetailInfoProps {
  post: Post;
}

export const PostDetailInfo = ({ post }: PostDetailInfoProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-[#1e293b]">
      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar
          src={post.author.photoURL}
          alt={post.author.displayName}
          size="md"
          isVerified={post.author.isVerified}
        />
        <div className="flex flex-col">
          <span className="font-semibold text-white text-sm">
            {post.author.displayName}
          </span>
          <span className="text-[#64748b] text-xs">
            @{post.author.username}
          </span>
        </div>
      </div>

      {/* Konten */}
      <p className="text-[#cbd5e1] text-sm whitespace-pre-wrap leading-relaxed">
        {post.content}
      </p>

      {/* Timestamp */}
      <time
        dateTime={toDate(post.createdAt).toISOString()}
        className="text-[#475569] text-xs"
      >
        {formatRelativeTime(post.createdAt)}
      </time>
    </div>
  );
};