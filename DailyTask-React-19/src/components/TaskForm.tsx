import { useActionState } from "react";
import { useTaskContext } from "../context/TaskContext";

type FormState = {
  error: string | null;
  success: boolean;
};

const TaskForm = () => {
  const { addTask } = useTaskContext();

  const createTodo = async (_: FormState, formData: FormData): Promise<FormState> => {
    const title = formData.get("title") as string;
    if (!title || !title.trim()) {
      return {
        error: "Task tidak boleh kosong",
        success: false,
      };
    }
    await addTask(title);
    return { error: null, success: true };
  };

  const [message, formAction, isPending] = useActionState(createTodo, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction} className="mb-4 flex flex-col">
      <input type="text" name="title" placeholder="New Task" className="border rounded w-full px-2 py-1" />
      {message.error && <span className="text-red-500 text-sm">{message.error}</span>}
      <button type="submit" disabled={isPending} className={`mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}>
        {isPending ? "adding ..." : "add task"}
      </button>
    </form>
  );
};

export default TaskForm;
