import { EmailBaseSchema } from "../base-schemas/email-base-schema";
import { PasswordBaseSchema } from "../base-schemas/password-base-schema";
import { z } from "zod";

const SignInSchema = z.object({
    email: EmailBaseSchema.shape.email,
    password: PasswordBaseSchema.shape.password,
});

type SignInSchemaType = z.infer<typeof SignInSchema>;
export { SignInSchema, type SignInSchemaType };
