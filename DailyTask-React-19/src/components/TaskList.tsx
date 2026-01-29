import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import type { Task } from "../types/Task";

const TaskList = () => {
  const { optimisticTasks, deleteTask, updateTask } = useTaskContext();

  if (optimisticTasks.length === 0) {
    return <p className="text-center text-gray-400 text-sm">No tasks yet ✨</p>;
  }

  return (
    <div className="space-y-2">
      {optimisticTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={() => updateTask(task.id, { completed: !task.completed })} onDelete={() => deleteTask(task.id)} />
      ))}
    </div>
  );
};

export default TaskList;
