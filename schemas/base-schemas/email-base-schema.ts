import { z } from "zod";

const EmailBaseSchema = z.object({
    email: z.string().email().nonempty("Email is required"),
});

type EmailBaseSchemaType = z.infer<typeof EmailBaseSchema>;

export { EmailBaseSchema, type EmailBaseSchemaType };
