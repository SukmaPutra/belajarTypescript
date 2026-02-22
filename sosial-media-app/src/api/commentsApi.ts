import type { Comment, CreateCommentInput } from "../type/Comment";
import { commentSchema } from "../type/schema/commentSchema";
import { db } from '@/core/api/firebase/firebaseInit'
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";

const commentCollection = collection(db, "comments");

// get comments for specific post (menampilkan komentar berdasarkan postId)
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const q = query(commentCollection, where("postId", "==", postId), orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        content: data.content,
        postId: data.postId,
        userId: data.userId,
        author: data.author,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
      };
    });
  } catch (error) {
    console.error("Error getting comments: ", error);
    throw error;
  }
};

// create a new comment (menambahkan komentar baru)
export const createComment = async (newComment: CreateCommentInput): Promise<string> => {
  try {
    commentSchema.parse({ content: newComment.content });
    const docRef = await addDoc(commentCollection, {
      content: newComment.content,
      postId: newComment.postId,
      userId: newComment.userId,
      author: newComment.author,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding comment: ", error);
    throw Error;
  }
};
