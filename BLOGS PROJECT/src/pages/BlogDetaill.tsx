import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Blog } from "../types/Blog";
import { deleteBlog, fetchBlog } from "../api/blogApi";
import { toast } from "react-toastify";
import BlogDetailSkeleton from "../components/skeletons/BlogDetailSkeleton";
import Modal from "../components/Modal";


const BlogDetaill = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const getBlog = async () => {
      try {
        const data = await fetchBlog(id);
        setBlog(data);
      } catch (error: any) {
        toast.error(error.message);
        navigate("/");
      } finally {
        setLoading(false)
      }
    };

    getBlog();
  }, [id, navigate]);

  if (loading) {
    return <BlogDetailSkeleton/>
  } if (!blog){
    return(
      <div className="min-h-screen flex items-center justify-center text-gray-300">Blog tidak ditemukan</div>
    )
  }

  const handleDelete = async ()=>{
    if(id){
      try {
        await deleteBlog(id)
        toast.success('successfully deleted the blog')
        navigate('/')
      } catch (error:any) {
        setIsModalOpen(false)
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="container mx-auto min-h-screen bg-gray-900 p-6 font-sans text-gray-200">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-700 
                     bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700 transition"
        >
          ← Back to Blog List
        </button>
      </div>

      {/* Blog Content */}
      {blog && (
        <>
          {/* blog contett */}
          <div className=" bg-gray-800 text-gray-300 rounded shadow-md p-6">
            <h1 className="mb-2 text-3xl font-bold">{blog.title}</h1>
            <p className="mb-4 text-sm text-gray-400">
              {new Date(blog.createdAt).toLocaleDateString("id-ID")}
            </p>
            <img
              src={blog.image}
              alt={blog.title}
              className="mb-6 h-64 w-full rounded-lg object-cover"
            />
            <p className="leading-relaxed text-gray-300">{blog.description}</p>
          </div>

          {/* button */}
          <div className="flex gap-4 mt-6">
            <button onClick={()=> navigate(`/blog/${id}/edit`)} className="bg-green-700 hover:bg-green-600 text-gray-100 font-medium px-4 py-2 rounded shadow">Edit</button>
            <button onClick={()=> setIsModalOpen(true )} className="bg-red-700 hover:bg-red-600 text-gray-100 font-medium px-4 py-2 rounded shadow">Delete</button>
          </div>
        </>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={()=>setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this blog? this action cannot undone"
      />
    </div>
  );
};

export default BlogDetaill;
