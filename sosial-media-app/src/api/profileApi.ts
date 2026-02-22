import type { CreateProfileInput, UpdateProfileInput, Profile } from "../type/profile";
import { db } from '@/core/api/firebase/firebaseInit'
import { serverTimestamp, updateDoc, setDoc, doc, getDoc } from "firebase/firestore";

// ─── Get Profile ───────────────────────────────────────────────────────────────

/** Ambil profile berdasarkan userId. Return null jika tidak ditemukan. */
export const getProfilesByUserId = async (userId: string): Promise<Profile | null> => {
  try {
    const docRef = doc(db, "profiles", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    const data = docSnap.data();

    return {
      userId: docSnap.id,
      name: data.name,
      jobTitle: data.jobTitle,
      bio: data.bio,
      hobbies: data.hobbies,
      avatarUrl: data.avatarUrl,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// ─── Create Profile ────────────────────────────────────────────────────────────

/** Buat profile baru untuk userId. Return document ID. */
export const createProfile = async (userId: string, input: CreateProfileInput): Promise<string> => {
  try {
    const docRef = doc(db, "profiles", userId);

    await setDoc(docRef, {
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

// ─── Update Profile ────────────────────────────────────────────────────────────

/** Update profile yang sudah ada berdasarkan userId. */
export const updateProfile = async (userId: string, input: UpdateProfileInput): Promise<void> => {
  try {
    const docRef = doc(db, "profiles", userId);

    await updateDoc(docRef, {
      ...input,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
