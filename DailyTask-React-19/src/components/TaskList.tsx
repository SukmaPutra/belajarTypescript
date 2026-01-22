import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import type { Task } from "../types/Task";

const TaskList = () => {
  const { optimisticTasks, deleteTask, updateTask } = useTaskContext();

  const handleToggle = (task: Task) => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handleDelete = (taskId: number) => {
    deleteTask(taskId);
  };

  return (
    <div>
      {optimisticTasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={() => handleToggle(task)} onDelete={() => handleDelete(task.id)} />
      ))}
    </div>
  );
};

export default TaskList;
