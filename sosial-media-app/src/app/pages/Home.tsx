import { FeedPage } from "./FeedPage";

// app/pages/Home.tsx
export const HomePage = () => (
  <div className="text-blue-500 text-center py-20">
    <h1 className="text-3xl font-bold">Selamat datang di Somad</h1>
    <p className="text-lg mt-4">Sosial media untuk semua orang</p>
    <FeedPage />
  </div>
);

export default HomePage;