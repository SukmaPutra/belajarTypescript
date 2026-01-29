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
    <form action={formAction} className="mb-4 space-y-2">
      <div className="flex gap-2">
        <input type="text" name="title" placeholder="What needs to be done?" className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button
          type="submit"
          disabled={isPending}
          className={`px-4 py-2 rounded-lg text-white font-medium transition
        ${isPending ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}
      `}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </div>

      {message.error && <p className="text-red-500 text-sm">{message.error}</p>}
    </form>
  );
};

export default TaskForm;
