import { useEffect, useState } from "react";
import PostItem from "../../components/Post";
import { useParams } from "react-router-dom";
import { getPostById } from "../../api/postApi";
import type { Post } from "../../type/post";
import { Timestamp } from "firebase/firestore";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      const data = await getPostById(postId);
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="p-4">
      <PostItem 
        id={post.id} // 
        title={post.title} 
        content={post.content} 
        author={post.author}
        userId={post.userId}
        createdAt={post.createdAt instanceof Date ? Timestamp.fromDate(post.createdAt) : post.createdAt}
      />
    </div>
  );
};

export default PostDetail;