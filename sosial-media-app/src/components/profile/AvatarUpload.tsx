import { useRef } from "react";
import Icon from "../ui/Icon";

type AvatarUploadProps = {
  /**
   * Bisa berupa URL string (dari server) atau base64 DataURL (preview lokal).
   * Untuk production, sebaiknya upload file ke storage terlebih dahulu
   * lalu simpan URL-nya. Untuk preview lokal, base64 sudah cukup.
   */
  avatarUrl?: string;
  onChange: (dataUrl: string) => void;
};

const AvatarUpload = ({ avatarUrl, onChange }: AvatarUploadProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (max 10MB)
    const MAX_SIZE_MB = 10;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Ukuran file maksimal ${MAX_SIZE_MB}MB`);
      return;
    }

    // Baca sebagai DataURL untuk preview
    // NOTE: Untuk production, ganti dengan upload ke Supabase/Firebase Storage
    // lalu panggil onChange(downloadUrl) setelah upload selesai
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        onChange(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-6">
      {/* Preview avatar */}
      <div
        className="relative group w-24 h-24 rounded-full bg-slate-100 dark:bg-[#1e2e3e] border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#137fec] transition-colors flex-shrink-0"
        onClick={() => fileRef.current?.click()}
        role="button"
        aria-label="Upload foto profil"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <Icon name="camera" className="w-8 h-8 text-slate-400" />
        )}

        {/* Overlay hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Icon name="camera" className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/png, image/jpeg, image/gif"
        className="hidden"
        onChange={handleFile}
      />

      {/* Info & trigger */}
      <div>
        <p className="font-semibold text-slate-900 dark:text-white text-sm">Profile Photo</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-3">
          PNG, JPEG, atau GIF, maks 10MB
        </p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="text-sm font-medium text-[#137fec] hover:text-[#0f6bd0] transition-colors"
        >
          Upload Foto
        </button>
      </div>
    </div>
  );
};

export default AvatarUpload;
