
import CommentsList from "../features/comment/CommentsList";
import CreateComment from "../features/comment/CreateComment";
import PostDetail from "../features/post/PostDetail"
import { useParams } from "react-router-dom"

const PostPage = () => {
  const { postId } = useParams();
  if(!postId){
    return <p>Post tidak ditemukan</p>
  }

  return (
    <div>
      <PostDetail />
      <CommentsList postId={postId}/>
      <CreateComment postId={postId}/>
    </div>
  )
}

export default PostPage

