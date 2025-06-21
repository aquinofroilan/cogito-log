import { EmailBaseSchema } from "../base-schemas/email-base-schema";
import { PasswordBaseSchema } from "../base-schemas/password-base-schema";
import { z } from "zod";

const LoginSchema = z.object({
    email: EmailBaseSchema.shape.email,
    password: PasswordBaseSchema.shape.password,
});

type LoginSchemaType = z.infer<typeof LoginSchema>;
export { LoginSchema, type LoginSchemaType };
