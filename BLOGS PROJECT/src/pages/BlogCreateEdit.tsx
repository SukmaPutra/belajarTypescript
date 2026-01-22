import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { BlogForm } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { blogSchema } from "../utils/validation";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { createBlog, fetchBlog, updateBlog } from "../api/blogApi";
import { toast } from "react-toastify";
import type { Blog } from "../types/Blog";

type Props = {
  mode: "create" | "edit";
};

const BlogCreateEdit = ({ mode }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
  });

  // todo Edit
  useEffect(() => {
    const getBlog = async () => {
      if (id && mode === "edit") {
        try {
          const data = await fetchBlog(id);
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("image", data.image);
          setValue("createdAt", data.createdAt);
        } catch (error: any) {
          toast.error(error.message);
          navigate("/");
        }
      }
    };
    getBlog();
  }, [id, mode]);

  const onSubmit = async (data: BlogForm) => {
    try {
      if (mode === "create") {
        const newBlog: Blog = {
          id: uuidv4(),
          title: data.title,
          description: data.description,
          image: data.image,
          createdAt: new Date().toISOString(),
        };

        await createBlog(newBlog);
        toast.success("Blog created successfully!");
      } else if (mode === "edit" && id) {
        const updatedBlog: Blog = {
          id,
          title: data.title,
          description: data.description,
          image: data.image,
          createdAt: data.createdAt ?? new Date().toISOString(),
        };
        await updateBlog(id, updatedBlog);
        toast.success("Blog updated successfully");
      }
      navigate("/");
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  return (
    <div className="container mx-auto p-6 font-sans bg-gray-900 min-h-screen text-gray-200">
      <h2 className=" text-3xl font-bold text-gray-100 mb-6 border-b-2 border-gray-700 pb-2">
        {" "}
        {mode === "create" ? "Create Blog" : "Edit Blog"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* title */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300"
          >
            Title
          </label>

          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 
               text-gray-100 placeholder-gray-400
               focus:outline-none focus:ring-2 focus:ring-amber-500 
               focus:border-amber-500 transition"
            placeholder="Masukkan judul blog"
          />

          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>

          <input
            id="description"
            type="text"
            {...register("description")}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 
               text-gray-100 placeholder-gray-400
               focus:outline-none focus:ring-2 focus:ring-amber-500 
               focus:border-amber-500 transition"
            placeholder="Masukkan Deskripsi"
          />

          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Img URL */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="image URL"
            className="block text-sm font-medium text-gray-300"
          >
            Image URL
          </label>

          <input
            id="title"
            type="text"
            {...register("image")}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 
               text-gray-100 placeholder-gray-400
               focus:outline-none focus:ring-2 focus:ring-amber-500 
               focus:border-amber-500 transition"
            placeholder="Masukkan URL Image "
          />

          {errors.image && (
            <p className="text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-2 rounded shadow transition duration-200"
        >
          {mode === "create" ? "Create" : "Save Change"}
        </button>
      </form>
    </div>
  );
};

export default BlogCreateEdit;
