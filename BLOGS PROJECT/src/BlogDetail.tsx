import { useParams } from "react-router-dom"

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
        <h1>Blog Detail Page - {id}</h1>
    </div>
  )
}

export default BlogDetail
