import { User } from "lucide-react";
import useAvatarUrl from "../features/profile/hooks/useAvatarUrl";
import { Timestamp } from "firebase/firestore";
import { MoreHorizontal, MessageCircle, Repeat2, Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

// ==========================================
// TYPES & INTERFACES
// ==========================================
type PostProps = {
  id?: string;
  title: string;
  content: string;
  author: string;
  userId?: string;
  createdAt?: Timestamp | null;
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Mengubah Timestamp Firebase menjadi format waktu relatif yang mudah dibaca.
 * Contoh output: "Baru saja", "5 menit lalu", atau format tanggal "DD/MM/YYYY".
 */
function formatTimeAgo(timestamp?: Timestamp | null): string {
  if (!timestamp) return "Memuat...";

  const date = timestamp.toDate();
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Baru saja";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;

  // Fallback ke format tanggal lokal jika lebih dari 7 hari
  return date.toLocaleDateString("id-ID");
}

// ==========================================
// MAIN COMPONENT
// ==========================================

const PostItem = ({ id, title, content, author, userId, createdAt }: PostProps) => {
  // Mengambil URL avatar pengguna menggunakan custom hook
  const avatarUrl = useAvatarUrl(userId);

  // Fungsi untuk mencegah klik pada tombol menembus ke Link utama
  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
        <div className="p-4">
          {" "}
          {/* ⭐ Ubah dari p-5 ke p-4 */}
          {/* --- HEADER BAGIAN ATAS (Profil & Tombol Opsi) --- */}
          <div className="flex items-start justify-between mb-3">
            {/* Info Pengguna (Avatar, Nama, Waktu) */}
            <div className="flex items-center space-x-4">
              {" "}
              {/* ⭐ Ubah dari space-x-3 ke space-x-4 */}
              {/* Wrapper Avatar */}
              <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {" "}
                {/* ⭐ Ubah dari w-10 h-10 ke w-12 h-12 */}
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`Profile picture of ${author}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <User size={20} className="text-slate-500" />
                )}
              </div>
              {/* Nama Author & Waktu Posting */}
              <div>
                <h3 className="font-bold text-slate-900">{author}</h3>
                <p className="text-slate-500 text-sm">{formatTimeAgo(createdAt)}</p>
              </div>
            </div>

            {/* Tombol Opsi (More) */}
            <button onClick={handleActionClick} className="text-slate-500 hover:bg-slate-100 rounded-full p-1 transition" aria-label="More options">
              <MoreHorizontal size={20} /> {/* ⭐ Ubah dari size={18} ke size={20} */}
            </button>
          </div>
          {/* --- KONTEN POSTINGAN (Judul & Teks) - Conditional Link --- */}
          {id ? (
            <Link to={`/post/${id}`} className="block group">
              <h2 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition">{title}</h2>
              <p className="text-base leading-relaxed text-slate-700 mb-4">
                {" "}
                {/* ⭐ Ubah dari text-sm ke text-base */}
                {content}
              </p>
            </Link>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
              <p className="text-base leading-relaxed text-slate-700 mb-4">
                {" "}
                {/* ⭐ Ubah dari text-sm ke text-base */}
                {content}
              </p>
            </div>
          )}
          {/* --- FOOTER (Tombol Aksi: Komentar, Repost, Like, Share) --- */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            {" "}
            {/* ⭐ Ubah dari pt-2 border-slate-200/50 */}
            <button onClick={handleActionClick} className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-slate-50 transition">
              <MessageCircle size={20} /> {/* ⭐ Ubah dari size={18} ke size={20} */}
              <span className="text-sm font-medium leading-none">0</span>
            </button>
            <button onClick={handleActionClick} className="flex items-center gap-1.5 text-slate-500 hover:text-green-600 px-2 py-1 rounded-lg hover:bg-green-50 transition">
              <Repeat2 size={20} /> {/* ⭐ Ubah dari size={18} ke size={20} */}
              <span className="text-sm font-medium leading-none">0</span>
            </button>
            <button onClick={handleActionClick} className="flex items-center gap-1.5 text-slate-500 hover:text-pink-600 px-2 py-1 rounded-lg hover:bg-pink-50 transition">
              <Heart size={20} /> {/* ⭐ Ubah dari size={18} ke size={20} */}
              <span className="text-sm font-medium leading-none">0</span>
            </button>
            <button onClick={handleActionClick} className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-slate-50 transition">
              <Share2 size={20} /> {/* ⭐ Ubah dari size={18} ke size={20} */}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
