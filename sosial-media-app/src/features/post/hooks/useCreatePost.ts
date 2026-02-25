// features/posts/hooks/useCreatePost.ts
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { usePostStore } from '../store/postStore';
import { createPostService } from '../services/postService';
import { createPostSchema, type CreatePostData } from '../schemas/postSchema';

export const useCreatePost = (onSuccess?: () => void) => {
  const { user } = useAuthStore();
  const { setPosts, posts } = usePostStore();

  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { content: '', image: null },
  });

  const submit = useCallback(async (data: CreatePostData) => {
    if (!user) return;

    const author = {
      uid:         user.uid,
      username:    user.username,
      displayName: user.displayName,
      photoURL:    user.photoURL,
      isVerified:  user.isVerified,
    };

    const { data: newPost, success, error } = await createPostService(
      data.content,
      author,
      data.image ?? null
    );

    if (!success || !newPost) return;

    // Prepend ke store agar langsung muncul di atas feed
    setPosts([newPost, ...posts]);
    form.reset();
    onSuccess?.();
  }, [user, posts]);

  return {
    form,
    submit: form.handleSubmit(submit),
    isSubmitting: form.formState.isSubmitting,
  };
};