import { EmailBaseSchema } from "../base-schemas/email-base-schema";
import { PasswordBaseSchema } from "../base-schemas/password-base-schema";
import { z } from "zod";

const SignUpSchema = z
    .object({
        email: EmailBaseSchema.shape.email,
        confirmEmail: EmailBaseSchema.shape.email,
        password: PasswordBaseSchema.shape.password,
        confirmPassword: PasswordBaseSchema.shape.password,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    })
    .refine((check) => check.email === check.confirmEmail, {
        message: "Emails must match",
        path: ["confirmEmail"],
    });

type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export { SignUpSchema, type SignUpSchemaType };
