
import type { Todo } from "../types/Todos";

type TodoItemProps={
    todo:Todo;
    onToggleComplete: (id: number) => void;
    onDeleteTodo: (id: number) => void;
}

const TodoItem = ({todo, onToggleComplete, onDeleteTodo}: TodoItemProps) => {
        const {text,completed} = todo;

        return <li className={'flex items-center justify-between p-4 rounded-lg shadow-md transition-all duration-300 bg-blue-50 border-l-4 border-blue-500' + (completed ? ' line-through' : ' bg-green-100 border-l-4 border-green-500')}>
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={completed}
                readOnly
                className="mr-3 h-5 w-5 accent-red-00 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <span onClick={() => onToggleComplete(todo.id)} className={'cursor-pointer text-lg font-medium text-blue-800' + (completed ? ' text-red-500 line-through' : ' text-blue-600')}>
                {todo.text}
            </span>
        </div>
        <button 
        onClick={() => onDeleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 transition-colors duration-200 hover:bg-red-100 p-1 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    </li>;
};

export default TodoItem;