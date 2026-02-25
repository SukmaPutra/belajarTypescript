// features/posts/pages/FeedPage.tsx
import { CreatePostForm } from '../components/CreatePostForm';
import { PostList }       from '../components/PostList';

export const FeedPage = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Form buat post */}
      <CreatePostForm />

      {/* Feed */}
      <PostList />
    </div>
  );
};

export default FeedPage;