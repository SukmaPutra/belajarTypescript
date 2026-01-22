import type { Blog } from "../types/Blog"

type Props = {
    blog: Blog
}

const BlogCard = ({blog} :Props) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden 
                hover:shadow-xl transition-all duration-300 
                hover:-translate-y-1 cursor-pointer group">

  {/* Image */}   
  <img
    src={blog.image}
    alt={blog.title}
    className="w-full h-48 object-cover"
  />

  {/* Content */}
  <div className="p-4 flex flex-col gap-2">
    <h1 className="text-lg font-semibold text-white 
                   group-hover:text-yellow-400 transition-colors duration-300">
      {blog.title}
    </h1>

    <p className="text-xs text-gray-400">
      {new Date(blog.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>

    <p className="text-sm text-gray-300 line-clamp-3">
      {blog.description}
    </p>
  </div>
</div>

  )
}

export default BlogCard

