import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";
import { useState } from "react";
import type { Todo } from "../types/Todos";




const Todolist = () => {
  // Dummy data untuk tampilan
  const [todos, setTodos] = useState<Todo[]>([
    {
        id : 1,
        text : "makan malam",
        completed:false
    },
    {
        id : 2,
        text : "nongkrong",
        completed:true
    },
    {
        id : 3,
        text : "belajar",
        completed:false
    },
  ])

  const addTodo = (newTodoText: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      text: newTodoText,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>prevTodos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-2 border-purple-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Todo List</h1>

        <TodoInput addTodo={addTodo} />

        <ul>
            {
              todos.map((todo) => (
                <li>
                    <TodoItem 
                    todo={todo} 
                    key={todo.id}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTodo={handleDeleteTodo}
                  />
                </li>
              ))
            }
        </ul>

        
      </div>
    </div>
  );
}

export default Todolist;