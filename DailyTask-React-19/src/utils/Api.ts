import type { Task } from "../types/Task";

const BASE_URL = "https://jsonplaceholder.typicode.com";

//fetch semua tasks
export const fetchTask = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch Tasks");
    }
    const data: Task[] = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

//add task
export const createTask = (title: string, duration: number = 2000) => {
  return new Promise<Task>((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), title: title, completed: false });
    }, duration);
  });
};
