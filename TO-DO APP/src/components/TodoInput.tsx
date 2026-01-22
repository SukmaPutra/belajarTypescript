import { useState } from "react";

type TodoInputProps = {
  addTodo: (newTodoText: string) => void;
}

const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  }
  const handleAddTodo = () => {
    if(newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo("");
    }
  }


  return (
    <div className="mb-6 flex space-x-2">
        <input
          onChange={handleChange}
          value={newTodo}
          type="text"
          placeholder="Tambahkan tugas baru..."
          className="flex-1 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button onClick={handleAddTodo} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
          Add
        </button>
    </div>
    );

};

export default TodoInput;