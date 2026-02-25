// features/posts/services/postService.ts

import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy, limit, startAfter, serverTimestamp, increment, setDoc, runTransaction, QueryDocumentSnapshot } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/core/api/firebase/firebaseInit";
import { withFirestore } from "@/core/api/interceptors";
import { POSTS_COLLECTION, LIKES_SUBCOLLECTION, REPOSTS_SUBCOLLECTION, COMMENTS_SUBCOLLECTION } from "../constants/postConstants";
import type { Post, Comment } from "../types/post.types";
import type { UserSnippet } from "@/shared/types";

const FEED_LIMIT = 10;

// ─── Upload Gambar ────────────────────────────────────────────────────────────

export const uploadPostImageService = async (file: File, uid: string): Promise<string> => {
  // Path: posts/{uid}/{timestamp}_{filename}
  const path = `posts/${uid}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// ─── Create Post ──────────────────────────────────────────────────────────────

export const createPostService = async (content: string, author: UserSnippet, imageFile?: File | null) => {
  return withFirestore(async () => {
    let imageURL: string | null = null;

    if (imageFile) {
      imageURL = await uploadPostImageService(imageFile, author.uid);
    }

    const postData: Omit<Post, "id"> = {
      author,
      content,
      imageURL,
      likesCount: 0,
      repostsCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp() as any,
      updatedAt: serverTimestamp() as any,
    };

    const docRef = await addDoc(collection(db, POSTS_COLLECTION), postData);

    return { id: docRef.id, ...postData } as Post;
  });
};

// ─── Get Feed (Paginated) ─────────────────────────────────────────────────────

export const getFeedService = async (lastDoc?: QueryDocumentSnapshot) => {
  return withFirestore(async () => {
    let q = query(collection(db, POSTS_COLLECTION), orderBy("createdAt", "desc"), limit(FEED_LIMIT));

    // Kalau ada lastDoc, mulai dari sana (cursor pagination)
    if (lastDoc) {
      q = query(collection(db, POSTS_COLLECTION), orderBy("createdAt", "desc"), startAfter(lastDoc), limit(FEED_LIMIT));
    }

    const snap = await getDocs(q);
    const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Post);
    const newLastDoc = snap.docs[snap.docs.length - 1] ?? null;
    const hasMore = snap.docs.length === FEED_LIMIT;

    return { posts, lastDoc: newLastDoc, hasMore };
  });
};

// ─── Like / Unlike ────────────────────────────────────────────────────────────

export const toggleLikeService = async (postId: string, uid: string) => {
  return withFirestore(async () => {
    const likeRef = doc(db, POSTS_COLLECTION, postId, LIKES_SUBCOLLECTION, uid);
    const postRef = doc(db, POSTS_COLLECTION, postId);

    // Gunakan transaction agar counter & like record selalu sinkron
    await runTransaction(db, async (transaction) => {
      const likeSnap = await transaction.get(likeRef);

      if (likeSnap.exists()) {
        // Sudah like → unlike
        transaction.delete(likeRef);
        transaction.update(postRef, { likesCount: increment(-1) });
        return { liked: false };
      } else {
        // Belum like → like
        transaction.set(likeRef, { uid, createdAt: serverTimestamp() });
        transaction.update(postRef, { likesCount: increment(1) });
        return { liked: true };
      }
    });
  });
};

// ─── Repost ───────────────────────────────────────────────────────────────────

export const toggleRepostService = async (postId: string, uid: string) => {
  return withFirestore(async () => {
    const repostRef = doc(db, POSTS_COLLECTION, postId, REPOSTS_SUBCOLLECTION, uid);
    const postRef   = doc(db, POSTS_COLLECTION, postId);

    await runTransaction(db, async (transaction) => {
      const repostSnap = await transaction.get(repostRef);

      if (repostSnap.exists()) {
        transaction.delete(repostRef);
        transaction.update(postRef, { repostsCount: increment(-1) });
      } else {
        transaction.set(repostRef, { uid, createdAt: serverTimestamp() });
        transaction.update(postRef, { repostsCount: increment(1) });
      }
    });
  });
};

// ─── Cek Status Like & Repost User ───────────────────────────────────────────

export const checkUserInteractionsService = async (
  postId: string,
  uid: string
) => {
  return withFirestore(async () => {
    const [likeSnap, repostSnap] = await Promise.all([
      getDoc(doc(db, POSTS_COLLECTION, postId, LIKES_SUBCOLLECTION, uid)),
      getDoc(doc(db, POSTS_COLLECTION, postId, REPOSTS_SUBCOLLECTION, uid)),
    ]);

    return {
      isLiked:    likeSnap.exists(),
      isReposted: repostSnap.exists(),
    };
  });
};

// ─── Comments ─────────────────────────────────────────────────────────────────

export const addCommentService = async (
  postId: string,
  content: string,
  author: UserSnippet
) => {
  return withFirestore(async () => {
    const postRef      = doc(db, POSTS_COLLECTION, postId);
    const commentsRef  = collection(db, POSTS_COLLECTION, postId, COMMENTS_SUBCOLLECTION);

    // Tambah komentar + update counter secara bersamaan
    const [commentDoc] = await Promise.all([
      addDoc(commentsRef, {
        postId,
        author,
        content,
        createdAt: serverTimestamp(),
      }),
      updateDoc(postRef, { commentsCount: increment(1) }),
    ]);

    return { id: commentDoc.id } as Comment;
  });
};

export const getCommentsService = async (postId: string) => {
  return withFirestore(async () => {
    const snap = await getDocs(
      query(
        collection(db, POSTS_COLLECTION, postId, COMMENTS_SUBCOLLECTION),
        orderBy('createdAt', 'asc')
      )
    );
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Comment));
  });
};