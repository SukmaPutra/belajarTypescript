import type { Task } from "../types/Task";

type TaskItemProps = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
};

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border bg-gray-50 hover:bg-gray-100 transition">
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={task.completed} onChange={onToggle} className="w-4 h-4 accent-blue-500" />
        <span className={`text-sm ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>{task.title}</span>
      </label>

      <button onClick={onDelete} className="text-red-400 hover:text-red-600 text-sm font-medium">
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
