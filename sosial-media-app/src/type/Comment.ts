export type Comment = {
    id?: string;
    content: string;
    userId: string;
    postId: string;
    author: string;
    createdAt: any;
};

export type CreateCommentInput = {
  content: string;
  postId: string;
  userId: string;
  author: string;
};