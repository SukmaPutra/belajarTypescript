
import useFetch from './useFetch';

interface TodoItem {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

const TodoList = () => {
    const {data, loading, error} = useFetch<TodoItem[]>('https://jsonplaceholder.typicode.com/posts');
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error?.message || 'Unknown error'}</div>;
    }

  return (
    <div>
       {data?.map(todo => {
         return (
           <li key={todo.id} className="border p-4 mb-2">
             <h2 className="text-xl font-semibold">{todo.title}</h2>
             <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
           </li>
         );
       })}
    </div>
  )
}

export default TodoList

