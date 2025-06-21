import { z } from "zod";

const PasswordBaseSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(128, "Password must not exceed 128 characters")
        .nonempty("Password is required"),
});

type PasswordBaseSchemaType = z.infer<typeof PasswordBaseSchema>;

export { PasswordBaseSchema, type PasswordBaseSchemaType };
