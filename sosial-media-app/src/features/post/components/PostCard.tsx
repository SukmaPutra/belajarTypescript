// features/posts/components/PostCard.tsx
import { Avatar, Card } from '@/shared/components';
import { formatRelativeTime } from '@/core/utils/formatters';
import { PostActions } from './PostActions';
import type { Post } from '../types/post.types';

interface PostCardProps {
    post: Post;
}

export const PostCard = ({post}: PostCardProps) => {
    return (
        <Card
      hoverable={false}
      padding="md"
      className="
        flex flex-col gap-3
        border-b border-[#1e293b]
        hover:bg-[#0f172a]/90
        transition-colors duration-150
        cursor-pointer
      "
    >

      {/* Header — Avatar + Info */}
      <div className="flex items-start gap-3">
        <Avatar
          src={post.author.photoURL}
          alt={post.author.displayName}
          size="md"
          isVerified={post.author.isVerified}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <button className="font-semibold text-white text-sm hover:underline truncate">
              {post.author.displayName}
            </button>
            <span className="text-[#64748b] text-sm truncate">
              @{post.author.username}
            </span>
            <span className="text-[#475569] text-xs">·</span>
            <time
              dateTime={post.createdAt.toDate().toISOString()}
              className="text-[#64748b] text-xs hover:underline shrink-0"
            >
              {formatRelativeTime(post.createdAt)}
            </time>
          </div>

          {/* Konten */}
          <p className="text-[#cbd5e1] text-sm mt-1 whitespace-pre-wrap wrap-break-words leading-relaxed">
            {post.content}
          </p>
        </div>
      </div>

      {/* Gambar opsional */}
      {post.imageURL && (
        <img
          src={post.imageURL}
          alt="post image"
          loading="lazy"
          className="w-full rounded-xl object-cover max-h-96 border border-[#1e293b]"
        />
      )}

      {/* Actions */}
      <PostActions post={post} />
    </Card>
  );
};