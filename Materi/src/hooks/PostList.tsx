import useFetch from "./useFetch";

interface DataPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

function PostList() {
    const {data, loading, error} = useFetch<DataPost[]>('https://jsonplaceholder.typicode.com/posts');
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error?.message || 'Unknown error'}</div>;
    }

  return (
    <div>
       {data?.map(post => {
         return (
           <li key={post.id} className="border p-4 mb-2">
             <h2 className="text-xl font-semibold">{post.title}</h2>
             <p>{post.body}</p>
           </li>
         );
       })}
    </div>
  )
}

export default PostList
