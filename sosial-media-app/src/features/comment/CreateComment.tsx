import { commentSchema } from "../../type/schema/commentSchema";
import { useAuthStore } from "../auth/store/useAuthStore";
import { useCommentStore } from "../../store/useCommentStore";
import { useActionState } from "react";

type createdAtProps = {
  postId: string;
};

const CreateComment = ({ postId }: createdAtProps) => {
  const { user } = useAuthStore();
  const { addComment } = useCommentStore();

  const [error, submitAction, isPending] = useActionState(async (_: any, formData: FormData) => {
    try {
      if (!user) {
        throw new Error("User belum login");
      }

      const content = formData.get("content");
      if (typeof content !== "string") {
        throw Error("Invalid form data");
      }

      commentSchema.parse({ content });

      await addComment(
        {
          postId,
          content,
          userId: user.uid,
          author: user.email ?? "",
        },
        postId,
      );
    } catch (error) {
      return { error: (error as Error).message };
    }
  }, null);

  return (
    <div className="border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <form action={submitAction} className="space-y-3">
          <textarea
            name="content"
            id="content"
            placeholder="Tulis komentar milikmu"
            rows={3}
            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />

          <div className="flex items-center justify-between">
            {error ? <p className="text-sm text-red-500">{error.error}</p> : <span />}

            <button type="submit" disabled={isPending} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">
              {isPending ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
