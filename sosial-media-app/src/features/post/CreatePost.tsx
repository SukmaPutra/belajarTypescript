import { useAuthStore } from "../auth/store/useAuthStore";
import { usePostStore } from "../../store/usePostStore";
import { postSchema } from "../../type/schema/postSchema";
import { useActionState } from "react";
import { Image, Film, Smile, User } from "lucide-react";
import useAvatarUrl from "../profile/hooks/useAvatarUrl";

const CreatePost = () => {
  const { user } = useAuthStore();
  const { addPost } = usePostStore();
  const avatarUrl = useAvatarUrl(user?.uid);

  const [error, submitAction, isPending] = useActionState(async (_: any, formData: FormData) => {
    try {
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;

      if (typeof content !== "string" || !content.trim()) {
        throw new Error("Content is required");
      }

      postSchema.parse({ title, content });

      await addPost({
        title,
        content,
        author: user?.email || "Anonymous", // ⭐ Hanya gunakan email
        createdAt: new Date(),
        userId: user?.uid || "anonymous",
      });

      const form = document.querySelector("form") as HTMLFormElement;
      if (form) form.reset();

      return null;
    } catch (error: any) {
      return { error: error.message };
    }
  }, null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
      <form action={submitAction}>
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Your profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <User size={20} className="text-slate-500" />
            )}
          </div>

          <div className="flex-1">
            {/* ⭐ Input Title */}
            <input type="text" name="title" className="w-full bg-transparent border-none text-xl font-semibold placeholder-slate-400 focus:ring-0 focus:outline-none p-0 mb-2" placeholder="Title" disabled={isPending} />

            {/* ⭐ Textarea Content */}
            <textarea name="content" className="w-full bg-transparent border-none text-lg placeholder-slate-400 focus:ring-0 focus:outline-none resize-none h-20 p-0" placeholder="What's on your mind?" disabled={isPending} />

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
              <div className="flex space-x-1 text-blue-600">
                <button type="button" className="p-2 hover:bg-blue-50 rounded-full transition" aria-label="Add image">
                  <Image size={20} />
                </button>
                <button type="button" className="p-2 hover:bg-blue-50 rounded-full transition" aria-label="Add GIF">
                  <Film size={20} />
                </button>
                <button type="button" className="p-2 hover:bg-blue-50 rounded-full transition" aria-label="Add emoji">
                  <Smile size={20} />
                </button>
              </div>

              <button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow transition text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                {isPending ? "Posting..." : "Post"}
              </button>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">{error.error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
