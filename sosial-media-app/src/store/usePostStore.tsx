import { create } from "zustand";
import type { Post } from "../type/post";
import { getPosts, createPost as createPostApi } from "../api/postApi";

type PostState = {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  addPost: (newPost: Omit<Post, "id">) => Promise<void>;
};

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const posts = await getPosts();
      set({ posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },
  addPost: async (newPost: Post) => {
    try {
      const response = await createPostApi(newPost);
      const id = response.data.id;
      const post: Post = {
        id,
        ...newPost,
      };
      set((state) => ({
        posts: [post, ...state.posts],
      }));
    } catch (error) {
      console.error("Gagal menambahkan post", error);
    }
  },
}));
