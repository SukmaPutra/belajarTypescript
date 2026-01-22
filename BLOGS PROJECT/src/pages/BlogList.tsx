import { useEffect, useState } from "react";
import type { Blog } from "../types/Blog";
import { fetchBlogs } from "../api/blogApi";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import BlogListSekeleton from "../components/skeletons/BlogListSekeleton";

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    // fetch blogs dari API
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

    setBlogs((prevBlogs) =>
      [...prevBlogs].sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  };

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-amber-400 font-bold mb-6">Blog List</h1>
          <Link
            to="/create"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Blog
          </Link>
        </div>
        {/* short button */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Short by Date : {sortOrder === "asc" ? "Ascending" : "Descending"}
          </p>
          <button
            onClick={handleSort}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Sort
          </button>
        </div>

        {/* skeleton Loader*/}
        {loading&& <BlogListSekeleton/>}
        {/* Blog Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
