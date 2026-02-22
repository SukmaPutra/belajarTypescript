import { useEffect } from "react";
import CreatePost from "../pages/CreateProfilePage";
import PostList from "../../features/post/PostList";
import { useAuthStore } from "../../features/auth/store/useAuthStore";
import { usePostStore } from "../../store/usePostStore";

const Home = () => {
  const { user } = useAuthStore();
  const { fetchPosts, posts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      {user && <CreatePost />}
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
