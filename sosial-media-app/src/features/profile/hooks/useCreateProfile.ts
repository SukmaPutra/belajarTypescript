import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileSchema, type ProfileFormValues } from "../../../type/schema/profileSchema";
import type { Hobby } from "../../../constant/hobbies";
import { createProfile } from "../../../api/profileApi";
import { useAuthStore } from "../../auth/store/useAuthStore";

// ─── Types ─────────────────────────────────────────────────────────────────────

type FieldErrors = Partial<Record<keyof ProfileFormValues, string>>;

const INITIAL_FORM: ProfileFormValues = {
  name: "",
  jobTitle: "",
  bio: "",
  hobbies: [],
  avatarUrl: undefined,
};

// ─── Hook ──────────────────────────────────────────────────────────────────────

const useCreateProfile = () => {
  const [form, setForm] = useState<ProfileFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuthStore();

  // ── Helpers ──────────────────────────────────────────────────────────────────

  /**
   * Menghasilkan onChange handler untuk field teks (input & textarea).
   * ✅ Type-safe: tidak pakai `any`
   */
  const setField = (field: keyof Omit<ProfileFormValues, "hobbies" | "avatarUrl">) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

    // Clear error field yang baru diedit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /** Toggle pilihan hobby (tambah / hapus dari array) */
  const toggleHobby = (hobby: Hobby) => {
    setForm((prev) => {
      const already = prev.hobbies.includes(hobby);
      return {
        ...prev,
        hobbies: (already ? prev.hobbies.filter((h) => h !== hobby) : [...prev.hobbies, hobby]) as Hobby[],
      };
    });

    if (errors.hobbies) {
      setErrors((prev) => ({ ...prev, hobbies: undefined }));
    }
  };

  /** Set avatar URL (dari preview base64 atau URL setelah upload) */
  const setAvatarUrl = (url: string) => {
    setForm((prev) => ({ ...prev, avatarUrl: url }));
  };

  // ── Validation ────────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const result = profileSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};

      // Map Zod issues ke format { field: message }
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ProfileFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const onSubmit = async () => {
    if (!validate()) return;
    if (!user?.uid) return;

    try {
      setLoading(true);

      // ✅ Sesuai signature API: createProfile(userId, input)
      await createProfile(user.uid, {
        name: form.name,
        jobTitle: form.jobTitle,
        bio: form.bio,
        hobbies: form.hobbies,
        avatarUrl: form.avatarUrl,
      });

      navigate(`/profile/${user.uid}`);
    } catch (err: unknown) {
      console.error("Gagal membuat profile:", err);
      // TODO: tampilkan toast / error global
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    setField,
    toggleHobby,
    setAvatarUrl,
    onSubmit,
  };
};

export default useCreateProfile;
