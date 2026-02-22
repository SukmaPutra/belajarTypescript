import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { getProfilesByUserId } from "../../../api/profileApi";
import type { Profile } from "../../../type/profile";

// ─── Hook ──────────────────────────────────────────────────────────────────────

const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const isOwnProfile = Boolean(userId && user?.uid && userId === user.uid);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const result = await getProfilesByUserId(userId);

        // Abaikan jika komponen sudah unmount
        if (!cancelled) setProfile(result);
      } catch (err) {
        console.error("Gagal memuat profile:", err);
        if (!cancelled) setProfile(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfile();

    // Cleanup: mencegah state update setelah unmount
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { profile, loading, userId, isOwnProfile, navigate };
};

export default useProfile;
