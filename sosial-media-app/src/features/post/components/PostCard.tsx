// features/posts/components/PostCard.tsx
import { Avatar, Card } from "@/shared/components";
import { formatRelativeTime, toDate } from "@/core/utils/formatters";
import { PostActions } from "./PostActions";
import type { Post } from "../types/post.types";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "@/config/routes";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const username = post?.author?.username;

  const profilePath = username ? generatePath(ROUTES.PROFILE, { username }) : "#";

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
        <Link to={profilePath}>
          <Avatar src={post.author.photoURL} alt={post.author.displayName} size="md" isVerified={post.author.isVerified} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to={profilePath} className="font-semibold text-white text-sm hover:underline truncate">
              {post.author.displayName}
            </Link>

            <Link to={profilePath} className="text-[#64748b] text-sm truncate hover:underline">
              @{post.author.username}
            </Link>
            <span className="text-[#475569] text-xs">·</span>
            <time dateTime={toDate(post.createdAt).toISOString()} className="text-[#64748b] text-xs hover:underline shrink-0">
              {formatRelativeTime(post.createdAt)}
            </time>
          </div>

          {/* Konten */}
          <Link to={generatePath(ROUTES.POST_DETAIL, {postId:post.id})}>
            <p className="text-[#cbd5e1] text-sm mt-1 whitespace-pre-wrap wrap-break-words leading-relaxed">{post.content}</p>
          </Link>
        </div>
      </div>

      {/* Gambar opsional */}
      <Link to={generatePath(ROUTES.POST_DETAIL, {postId:post.id})}>{post.imageURL && <img src={post.imageURL} alt="post image" loading="lazy" className="w-full rounded-xl object-cover max-h-96 border border-[#1e293b]" />}</Link>
      {/* Actions */}

      <PostActions post={post} />
    </Card>
  );
};
