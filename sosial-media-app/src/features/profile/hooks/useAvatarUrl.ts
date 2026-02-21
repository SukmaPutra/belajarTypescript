import { useEffect, useState } from "react";
import { getProfilesByUserId } from "../../../api/profileApi";

/**
 * Hook ringan khusus untuk mengambil avatarUrl dari profile.
 * Dipakai di Navbar agar tidak perlu load seluruh profile object.
 */
const useAvatarUrl = (userId?: string) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    getProfilesByUserId(userId)
      .then((profile) => {
        if (!cancelled) setAvatarUrl(profile?.avatarUrl ?? null);
      })
      .catch(() => {
        // Gagal fetch avatar = tetap tampilkan fallback icon, tidak perlu throw
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return avatarUrl;
};

export default useAvatarUrl;