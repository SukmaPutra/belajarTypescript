import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Blog } from "../types/Blog";
import { fetchBlog } from "../api/blogApi";
import { toast } from "react-toastify";
const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const getBlog = async () => {
      try {
        if (id) {
          const data = await fetchBlog(id);
          setBlog(data);
        }
      } catch (error: any) {
        toast.error(error.message);
        navigate("/");
      }
    };
    getBlog();
  }, [id]);
  return (
    <div className="container mx-auto min-h-screen bg-gray-900 p-6 font-sans text-gray-200">
      {" "}
      {/* Header */}{" "}
      <div className="mb-8 flex items-center justify-between">
        {" "}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {" "}
          ← Back to Blog List{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};
export default BlogDetail;
