// features/profile/components/EditProfileModal.tsx
import { useRef, useState } from 'react';
import { Modal, FormField, Button, Avatar } from '@/shared/components';
import { useEditProfile } from '../hooks/useEditProfile';
import type { UserProfile } from '@/features/auth/types/auth.types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const EditProfileModal = ({isOpen, onClose, profile,} : EditProfileModalProps) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(profile.photoURL);

    const { form, submit, isSubmitting } = useEditProfile(onClose);
    const {register, setValue, formState: { errors }} = form;

    const handlePhotoChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setValue('photoFile', file);
        setPreview(URL.createObjectURL(file));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profil" size="md">
      <form onSubmit={submit} className="flex flex-col gap-4">

        {/* Upload foto profil */}
        <div className="flex flex-col items-center gap-3">
          <Avatar src={preview} alt={profile.displayName} size="xl" />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileRef.current?.click()}
          >
            Ganti Foto
          </Button>
        </div>

        <FormField
          label="Nama Tampilan"
          error={errors.displayName?.message}
          required
          {...register('displayName')}
        />

        <FormField
          label="Username"
          error={errors.username?.message}
          hint="Hanya huruf, angka, dan underscore"
          required
          {...register('username')}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#cbd5e1]">Bio</label>
          <textarea
            {...register('bio')}
            rows={3}
            placeholder="Ceritakan tentang dirimu..."
            className="w-full bg-[#0f172a] border border-[#334155] rounded-lg
              px-4 py-2.5 text-white placeholder:text-[#94a3b8] text-sm
              focus:outline-none focus:ring-2 focus:ring-[#137fec] resize-none"
          />
          {errors.bio && (
            <span className="text-[#ef4444] text-xs">{errors.bio.message}</span>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onClose}
          >
            Batal
          </Button>
          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
    );
};