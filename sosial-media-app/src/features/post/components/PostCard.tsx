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
        <Card hoverable={false} padding="md" className="flex flex-col gap-3">
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
            <span className="font-semibold text-white text-sm">
              {post.author.displayName}
            </span>
            <span className="text-[#94a3b8] text-sm">
              @{post.author.username}
            </span>
            <span className="text-[#94a3b8] text-xs">·</span>
            <span className="text-[#94a3b8] text-xs">
              {formatRelativeTime(post.createdAt)}
            </span>
          </div>

          {/* Konten */}
          <p className="text-[#cbd5e1] text-sm mt-1 whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>
      </div>

      {/* Gambar opsional */}
      {post.imageURL && (
        <img
          src={post.imageURL}
          alt="post image"
          className="w-full rounded-lg object-cover max-h-96 border border-[#334155]"
        />
      )}

      {/* Actions */}
      <PostActions post={post} />
    </Card>
  );
};