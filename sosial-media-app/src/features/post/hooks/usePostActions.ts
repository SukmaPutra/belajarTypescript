// features/posts/hooks/usePostActions.ts
import { useCallback, useState } from 'react';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { usePostStore } from '../store/postStore';
import {
  toggleLikeService,
  toggleRepostService,
  addCommentService,
  getCommentsService,
} from '../services/postService';
import type { Comment } from '../types/post.types';

export const usePostActions = (postId: string) => {
  const { user }      = useAuthStore();
  const { updatePost } = usePostStore();

  const [isLiked,    setIsLiked]    = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [comments,   setComments]   = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // ─── Like ──────────────────────────────────────────────────────────────────
  const toggleLike = useCallback(async (currentCount: number) => {
    if (!user) return;

    // Optimistic update — langsung update UI, baru hit Firestore
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    updatePost(postId, {
      likesCount: currentCount + (newLiked ? 1 : -1)
    });

    const { success } = await toggleLikeService(postId, user.uid);

    // Revert kalau gagal
    if (!success) {
      setIsLiked(!newLiked);
      updatePost(postId, { likesCount: currentCount });
    }
  }, [user, postId, isLiked, updatePost]);

  // ─── Repost ────────────────────────────────────────────────────────────────
  const toggleRepost = useCallback(async (currentCount: number) => {
    if (!user) return;

    const newReposted = !isReposted;
    setIsReposted(newReposted);
    updatePost(postId, {
      repostsCount: currentCount + (newReposted ? 1 : -1)
    });

    const { success } = await toggleRepostService(postId, user.uid);

    if (!success) {
      setIsReposted(!newReposted);
      updatePost(postId, { repostsCount: currentCount });
    }
  }, [user, postId, isReposted, updatePost]);

  // ─── Comments ──────────────────────────────────────────────────────────────
  const fetchComments = useCallback(async () => {
    setIsLoadingComments(true);
    const { data } = await getCommentsService(postId);
    if (data) setComments(data);
    setIsLoadingComments(false);
  }, [postId]);

  const addComment = useCallback(async (
    content: string,
    currentCount: number
  ) => {
    if (!user) return;

    const author = {
      uid:         user.uid,
      username:    user.username,
      displayName: user.displayName,
      photoURL:    user.photoURL,
      isVerified:  user.isVerified,
    };

    const { success } = await addCommentService(postId, content, author);

    if (success) {
      updatePost(postId, { commentsCount: currentCount + 1 });
      await fetchComments(); // refresh list komentar
    }
  }, [user, postId, updatePost, fetchComments]);

  return {
    isLiked, isReposted,
    comments, isLoadingComments,
    toggleLike, toggleRepost,
    fetchComments, addComment,
  };
};