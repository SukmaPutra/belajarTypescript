import { useEffect } from "react";
import CreatePost from "../features/post/CreatePost"
import PostList from "../features/post/PostList"
import { useAuthStore } from "../store/useAuthStore"
import { usePostStore } from "../store/usePostStore";

const Home = () => {
  const {user} = useAuthStore();
  const {fetchPosts, posts} = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  return (
    <div>
     {user && <CreatePost />}
     <PostList posts={posts} />
    </div>
  )
}

export default Home
