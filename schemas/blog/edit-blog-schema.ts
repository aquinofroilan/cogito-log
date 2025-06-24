import { z } from "zod";

const EditBlogSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    content: z.string().min(1, "Content is required"),
    blog_id: z.number().int().positive("Blog ID must be a positive integer"),
});

type EditBlogSchemaType = z.infer<typeof EditBlogSchema>;
export { EditBlogSchema, type EditBlogSchemaType };
