// features/profile/hooks/useEditProfile.ts
import { useCallback } from 'react';
import { useForm }     from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore }    from '@/features/auth/store/useAuthStore';
import { useProfileStore } from '../store/profileStore';
import { editProfileService } from '../services/profileService';
import { editProfileSchema, type EditProfileFormData } from '../schemas/profileSchema';

export const useEditProfile = (onSuccess?: () => void) => {
  const { user, setUser } = useAuthStore();
  const { profile, setProfile } = useProfileStore();

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      displayName: profile?.displayName ?? '',
      username:    profile?.username    ?? '',
      bio:         profile?.bio         ?? '',
      photoFile:   null,
    },
  });

  const submit = useCallback(async (data: EditProfileFormData) => {
    if (!user) return;

    const { data: updated, success, error } = await editProfileService(user.uid, {
      displayName: data.displayName,
      username:    data.username,
      bio:         data.bio ?? '',
      photoFile:   data.photoFile,
    });

    if (!success || !updated) {
      form.setError('username', { message: error ?? 'Gagal memperbarui profil.' });
      return;
    }

    // Update store auth & profile sekaligus
    const newProfile = { ...user, ...updated };
    setUser(newProfile as any);
    setProfile(newProfile as any);
    onSuccess?.();
  }, [user, profile]);

  return {
    form,
    submit: form.handleSubmit(submit),
    isSubmitting: form.formState.isSubmitting,
  };
};