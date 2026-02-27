// features/profile/components/ProfileHeader.tsx
import { Avatar, Button } from "@/shared/components";
import { formatCount } from "@/core/utils/formatters";
import { useFollow } from "../hooks/useFollow";
import type { UserProfile } from "@/features/auth/types/auth.types";

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile: boolean;
  onEditClick: () => void;
}

export const ProfileHeader = ({ profile, isOwnProfile, onEditClick }: ProfileHeaderProps) => {
  const { isFollowing, toggleFollow } = useFollow(profile.uid);

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 flex flex-col gap-4 mb-4">
      {/* Row atas — avatar + tombol */}
      <div className="flex items-start justify-between">
        <Avatar src={profile.photoURL} alt={profile.displayName} size="xl" isVerified={profile.isVerified} />

        {isOwnProfile ? (
          <Button variant="secondary" size="sm" onClick={onEditClick}>
            Edit Profil
          </Button>
        ) : (
          <Button variant={isFollowing ? "secondary" : "primary"} size="sm" onClick={toggleFollow}>
            {isFollowing ? "Mengikuti" : "Ikuti"}
          </Button>
        )}
      </div>

      {/* Info user */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white">{profile.displayName}</h1>
        <p className="text-[#94a3b8] text-sm">@{profile.username}</p>
        {profile.bio && <p className="text-[#cbd5e1] text-sm mt-2 leading-relaxed">{profile.bio}</p>}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 pt-2 border-t border-[#334155]">
        <div className="flex flex-col items-center">
          <span className="text-white font-bold">{formatCount(profile.postsCount)}</span>
          <span className="text-[#94a3b8] text-xs">Postingan</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-bold">{formatCount(profile.followersCount)}</span>
          <span className="text-[#94a3b8] text-xs">Pengikut</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white font-bold">{formatCount(profile.followingCount)}</span>
          <span className="text-[#94a3b8] text-xs">Mengikuti</span>
        </div>
      </div>
    </div>
  );
};
