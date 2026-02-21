
export type Profile = {
  userId?: string;
  name: string;
  jobTitle: string;
  bio: string;
  hobbies: string[];
  avatarUrl?: string;
};

export interface CreateProfileInput {
  name: string;
  jobTitle: string;
  bio: string;
  hobbies: string[];
  avatarUrl?: string;
}

// Input untuk update
export interface UpdateProfileInput {
  jobTitle: string;
  bio: string;
  hobbies: string[];
  avatarUrl?: string;
}

