import { useEffect } from "react";
import useProfile from "../features/profile/hooks/useProfile";
import ProfileCard from "../components/profile/ProfileCard";

const ProfilePage = () => {
  const { profile, loading, userId, isOwnProfile, navigate } = useProfile();

  /**
   * Jika user mengunjungi profile-nya sendiri tapi belum punya profile,
   * arahkan ke halaman create profile.
   * Effect ini dijalankan setelah fetch selesai (loading = false).
   */
  useEffect(() => {
    if (!loading && !profile && isOwnProfile) {
      navigate("/create-profile/form");
    }
  }, [loading, profile, isOwnProfile, navigate]);

  // ── Guard: userId tidak ada di URL ──────────────────────────────────────────
  if (!userId) {
    return (
      <div className="text-center py-10 text-gray-500">
        User ID tidak ditemukan.
      </div>
    );
  }

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400 animate-pulse">
        Memuat profile...
      </div>
    );
  }

  // ── Profile tidak ditemukan (bukan milik sendiri) ───────────────────────────
  // Jika isOwnProfile, user sudah diredirect oleh useEffect di atas,
  // sehingga state ini hanya muncul saat melihat profile orang lain yang tidak ada.
  if (!profile) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-800">Profile tidak ditemukan</h2>
        <p className="text-gray-500 mt-1 text-sm">
          User dengan ID ini tidak terdaftar atau telah dihapus.
        </p>
      </div>
    );
  }

  // ── Profile ditemukan ───────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <ProfileCard profile={profile} isOwner={isOwnProfile} />
    </div>
  );
};

export default ProfilePage;