import { z } from "zod";

const NewBlogSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    content: z.string().min(1, "Content is required"),
    authorId: z.string().uuid("Invalid author ID format").optional(),
});

type NewBlogSchemaType = z.infer<typeof NewBlogSchema>;

export { NewBlogSchema, type NewBlogSchemaType };
