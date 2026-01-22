import type { Task } from "../types/Task";

type TaskItemProps ={
  task:Task;
  onToggle: () => void;
  onDelete: () => void;
};

const TaskItem = ({task, onToggle, onDelete}: TaskItemProps) => {
  return (
     <div className="flex items-center justify-between border p-2 rounded">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
      </label>

      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  )
}

export default TaskItem
