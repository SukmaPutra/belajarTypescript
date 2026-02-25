// app/pages/Home.tsx
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { Avatar } from "@/shared/components";
import { formatRelativeTime } from "@/core/utils/formatters";

// ─── Mock Data Preview Feed ───────────────────────────────────────────────────
const MOCK_POSTS = [
  {
    id: "1",
    author: {
      displayName: "Budi Santoso",
      username: "budisantoso",
      photoURL: null,
      isVerified: true,
    },
    content: "Hari ini saya belajar React TypeScript dan rasanya luar biasa! Kalian harus coba. 🚀",
    imageURL: null,
    likesCount: 142,
    repostsCount: 38,
    commentsCount: 21,
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 menit lalu
  },
  {
    id: "2",
    author: {
      displayName: "Siti Rahayu",
      username: "sitirahayu",
      photoURL: null,
      isVerified: false,
    },
    content: "Sunset di Bali hari ini sungguh memukau. Tidak ada kata-kata yang cukup untuk menggambarkannya. 🌅",
    imageURL: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    likesCount: 389,
    repostsCount: 72,
    commentsCount: 54,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 menit lalu
  },
  {
    id: "3",
    author: {
      displayName: "Andi Wijaya",
      username: "andiwijaya",
      photoURL: null,
      isVerified: false,
    },
    content: "Tips produktivitas: mulai hari dengan menulis 3 hal yang ingin kamu capai. Sederhana tapi efektif! ✍️",
    imageURL: null,
    likesCount: 217,
    repostsCount: 95,
    commentsCount: 33,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 jam lalu
  },
];

// ─── Mock Post Card (read-only, tanpa actions) ────────────────────────────────
const MockPostCard = ({ post }: { post: (typeof MOCK_POSTS)[0] }) => {
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar src={post.author.photoURL} alt={post.author.displayName} size="md" isVerified={post.author.isVerified} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">{post.author.displayName}</span>
            <span className="text-[#94a3b8] text-sm">@{post.author.username}</span>
            <span className="text-[#94a3b8] text-xs">·</span>
            <span className="text-[#94a3b8] text-xs">{formatRelativeTime(post.createdAt as any)}</span>
          </div>
          <p className="text-[#cbd5e1] text-sm mt-1 whitespace-pre-wrap break-words">{post.content}</p>
        </div>
      </div>

      {/* Gambar */}
      {post.imageURL && <img src={post.imageURL} alt="post" className="w-full rounded-lg object-cover max-h-64 border border-[#334155]" />}

      {/* Actions — disabled, hanya tampilan */}
      <div className="flex items-center gap-4 pt-1 select-none pointer-events-none opacity-70">
        <span className="flex items-center gap-1.5 text-sm text-[#94a3b8]">
          🤍 <span>{post.likesCount}</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[#94a3b8]">
          🔁 <span>{post.repostsCount}</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm text-[#94a3b8]">
          💬 <span>{post.commentsCount}</span>
        </span>
      </div>
    </div>
  );
};

// ─── Home Page ────────────────────────────────────────────────────────────────

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-20 bg-[#0f172a]/80 backdrop-blur-sm border-b border-[#334155]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-xl font-bold text-white">Somad</span>
          <div className="flex items-center gap-3">
            <Link to={ROUTES.LOGIN} className="text-sm text-[#cbd5e1] hover:text-white transition-colors px-3 py-1.5">
              Masuk
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="text-sm bg-[#137fec] hover:bg-[#0d66c2] text-white
                px-4 py-1.5 rounded-full font-medium transition-colors"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Teks kiri */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          {/* Badge */}
          <span
            className="inline-flex self-center lg:self-start items-center gap-2
            bg-[#137fec]/10 border border-[#137fec]/30 text-[#137fec]
            text-xs font-medium px-3 py-1 rounded-full w-fit"
          >
            ✦ Media sosial untuk semua
          </span>

          {/* Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Tempat berbagi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#137fec] to-[#a855f7]">cerita</span>, <br className="hidden lg:block" />
            terhubung dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#137fec]">dunia</span>.
          </h1>

          {/* Subheading */}
          <p className="text-[#94a3b8] text-lg leading-relaxed max-w-md mx-auto lg:mx-0">Bagikan momen, ide, dan ceritamu. Temukan orang-orang yang peduli dengan hal yang sama denganmu.</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              to={ROUTES.REGISTER}
              className="px-8 py-3 bg-[#137fec] hover:bg-[#0d66c2] text-white
                font-semibold rounded-full transition-colors text-center text-sm"
            >
              Mulai Sekarang — Gratis
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="px-8 py-3 bg-transparent border border-[#334155]
                hover:bg-[#1e293b] text-[#cbd5e1] font-medium rounded-full
                transition-colors text-center text-sm"
            >
              Sudah punya akun? Masuk
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-[#94a3b8] text-sm">
            Bergabung bersama <span className="text-white font-medium">10.000+</span> pengguna aktif
          </p>
        </div>

        {/* Preview Feed kanan */}
        <div className="flex-1 w-full max-w-md relative">
          {/* Gradient overlay atas — efek fade */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0f172a] to-transparent z-10 rounded-t-xl" />

          {/* Gradient overlay bawah — efek fade + blur */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40
            bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent z-10 rounded-b-xl"
          />

          {/* Lock overlay — klik untuk daftar */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-8">
            <div className="flex flex-col items-center gap-3">
              <div
                className="bg-[#1e293b] border border-[#334155] rounded-2xl px-5 py-3
                flex items-center gap-3 shadow-lg"
              >
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="text-white text-sm font-medium">Daftar untuk melihat lebih</p>
                  <p className="text-[#94a3b8] text-xs">Gratis selamanya</p>
                </div>
              </div>
              <Link
                to={ROUTES.REGISTER}
                className="px-6 py-2 bg-[#137fec] hover:bg-[#0d66c2]
                  text-white text-sm font-medium rounded-full transition-colors"
              >
                Buat Akun
              </Link>
            </div>
          </div>

          {/* Feed preview */}
          <div
            className="flex flex-col gap-3 overflow-hidden max-h-[480px]
            pointer-events-none select-none blur-[1px]"
          >
            {MOCK_POSTS.map((post) => (
              <MockPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#334155] py-8">
        <div
          className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row
          items-center justify-between gap-4"
        >
          <span className="text-[#94a3b8] text-sm">© 2025 Somad. All rights reserved.</span>
          <div className="flex items-center gap-6 text-sm text-[#94a3b8]">
            <Link to="#" className="hover:text-white transition-colors">
              Tentang
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Privasi
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Ketentuan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
