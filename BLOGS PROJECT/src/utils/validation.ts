import z from "zod";

export const blogSchema = z.object({
    title: z.string().min(1, 'Title is require'),
    description: z.string().min(10, 'Description must be at leat 10 characters'),
    image: z.url("Image must be a valid URL"),
    createdAt: z.string().optional()
})

export type BlogForm = z.infer<typeof blogSchema>