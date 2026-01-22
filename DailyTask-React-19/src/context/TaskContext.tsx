import { createContext, useState, use, useOptimistic, useContext } from "react";
import type { Task } from "../types/Task";
import { createTask, fetchTask } from "../utils/Api";

interface TaskContextType {
  optimisticTasks: Task[];
  addTask: (taskTitle: string) => Promise<void>;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskPromise = fetchTask();

type TaskProviderProps = {
  children: React.ReactNode;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const taskData = use(TaskPromise);

  const [tasks, setTasks] = useState<Task[]>(taskData);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(tasks);

  const addTask = async (taskTitle: string) => {
    const optimisticTask: Task = {
      id: Date.now(),
      title: taskTitle,
      completed: false,
    };

    setOptimisticTasks((prev) => [...prev, optimisticTask]);

    const realTask = await createTask(taskTitle);

    setTasks((prev) => [...prev, realTask]);
  };

  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        optimisticTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
