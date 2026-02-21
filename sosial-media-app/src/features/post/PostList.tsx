import type { Post as PostType } from "../../type/post";
import PostItem from "../../components/Post";
import { Timestamp } from "firebase/firestore";

type PostListProps = {
  posts: PostType[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id} 
          title={post.title}
          content={post.content}
          author={post.author}
          createdAt={post.createdAt instanceof Date ? Timestamp.fromDate(post.createdAt) : post.createdAt}
          userId={post.userId}
        />
      ))}
    </div>
  );
};

export default PostList;