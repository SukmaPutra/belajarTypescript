import z from "zod";

export const postSchema = z.object({
  
  title: z.string(),
  content: z.string().min(1, "Content is required"),
});

export type PostSchema = z.infer<typeof postSchema>;

