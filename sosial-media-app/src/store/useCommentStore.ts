import {create} from 'zustand';
import type { Comment, CreateCommentInput } from '../type/Comment';
import {
    getCommentsByPostId as getComments,
    createComment as createCommentApi
} from '../api/commentsApi';

type CommentState = {
    comments: Comment[];
    fetchComments: (postID:string) => Promise<void>;
    addComment: (newComment: CreateCommentInput, postId: string) =>Promise<void>;
}

export const useCommentStore = create<CommentState>((set) => ({
    comments: [],
    fetchComments: async (postID:string) => {
        try {
            const comments =  await getComments(postID);
            set({comments});
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    },
    addComment: async (newComment: CreateCommentInput, postId:string) => {
        try {
            await createCommentApi(newComment);
            const comments = await getComments(postId)
            set({comments})
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }
}));




