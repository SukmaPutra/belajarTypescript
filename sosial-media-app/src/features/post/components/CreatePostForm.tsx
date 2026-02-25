// features/posts/components/CreatePostForm.tsx
import { useRef, useState } from 'react';
import { Avatar, Button } from '@/shared/components';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useCreatePost } from '../hooks/useCreatePost';
import { LIMITS } from '@/shared/constant/index';

export const CreatePostForm = () => {
  const { user }   = useAuthStore();
  const fileRef    = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { form, submit, isSubmitting } = useCreatePost(() => {
    setPreview(null); // reset preview setelah submit
  });

  const { register, watch, setValue, formState: { errors } } = form;
  const content = watch('content') ?? '';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue('image', file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setValue('image', null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  if (!user) return null;

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 flex gap-3">
      <Avatar
        src={user.photoURL}
        alt={user.displayName}
        size="md"
      />

      <form onSubmit={submit} className="flex-1 flex flex-col gap-3">
        {/* Textarea */}
        <textarea
          {...register('content')}
          placeholder="Ada apa hari ini?"
          rows={3}
          className="w-full bg-transparent text-white placeholder:text-[#94a3b8]
            text-sm resize-none focus:outline-none"
        />

        {/* Error */}
        {errors.content && (
          <span className="text-[#ef4444] text-xs">{errors.content.message}</span>
        )}

        {/* Preview gambar */}
        {preview && (
          <div className="relative w-fit">
            <img
              src={preview}
              alt="preview"
              className="max-h-48 rounded-lg border border-[#334155] object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/60 text-white
                rounded-full w-6 h-6 flex items-center justify-center text-xs
                hover:bg-black/80"
            >
              ✕
            </button>
          </div>
        )}

        {/* Footer — upload + counter + submit */}
        <div className="flex items-center justify-between pt-2 border-t border-[#334155]">
          <div className="flex items-center gap-2">
            {/* Upload gambar */}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-[#94a3b8] hover:text-[#137fec] transition-colors text-lg"
              title="Upload gambar"
            >
              🖼️
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Character counter */}
            <span className={`text-xs ${
              content.length > LIMITS.POST_MAX_CHARS * 0.9
                ? 'text-[#f59e0b]'
                : 'text-[#94a3b8]'
            }`}>
              {content.length}/{LIMITS.POST_MAX_CHARS}
            </span>

            <Button
              type="submit"
              size="sm"
              isLoading={isSubmitting}
              disabled={!content.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};