import type { Post } from "../type/post";
import { db } from "./firebase";
import { doc,getDoc,collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

const postCollection = collection(db, "posts");

// Create a new post
export const createPost = async (newPost: Post) => {
  try {
    const docRef = await addDoc(postCollection, {
      ...newPost,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      data: { id: docRef.id },
    };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: (error as Error).message };
  }
};

// Get all posts ordered by createdAt descending
export const getPosts = async (): Promise<Post[]> => {
  try {
    const q = query(postCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Post),
    }))
    .filter((post) => post.createdAt !== undefined);
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};


//getPost by id
export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Post;
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
};
