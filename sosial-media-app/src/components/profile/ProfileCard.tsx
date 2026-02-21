import { useNavigate } from "react-router-dom";
import type { Profile } from "../../type/profile";

type ProfileCardProps = {
  profile: Profile;
  isOwner: boolean;
};

const ProfileCard = ({ profile, isOwner }: ProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Avatar + info dasar */}
      <div className="flex items-center gap-4">
        {profile.avatarUrl && (
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} avatar`}
            className="w-16 h-16 rounded-full object-cover border border-gray-100"
          />
        )}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{profile.name}</h1>
          <p className="text-sm text-gray-500">{profile.jobTitle}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-4 text-gray-700 text-sm leading-relaxed">{profile.bio}</p>

      {/* Hobbies */}
      {profile.hobbies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.hobbies.map((hobby) => (
            <span
              key={hobby}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              {hobby}
            </span>
          ))}
        </div>
      )}

      {/* Edit button (hanya untuk pemilik profile) */}
      {isOwner && (
        <button
          onClick={() =>
            navigate(`/edit-profile/${profile.userId}`, { state: profile })
          }
          className="mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileCard;