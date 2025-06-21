"use server";
import { SignInSchema, SignUpSchema, type SignInSchemaType, type SignUpSchemaType } from "@/schemas";
import { supabaseServerClient } from "@/utils/supabase/supabase";
import { redirect } from "next/navigation";

const signInAction = async (values: SignInSchemaType) => {
    let data;
    try {
        const validatedData = SignInSchema.safeParse(values);
        if (!validatedData.success) return { success: false, message: "Invalid input data." };
        if (values.email === "" || values.password === "")
            return { success: false, message: "Email and password cannot be empty." };

        const {
            data: { email, password },
        } = validatedData;
        const supabase = await supabaseServerClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return { success: false, message: error.message };
        else if (!data) return { success: false, message: "Unexpected login failure." };
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        return { success: false, message: errorMessage };
    }
    redirect("/home");
};

const signUpAction = async (values: SignUpSchemaType) => {
    try {
        const validatedData = SignUpSchema.safeParse(values);
        if (!validatedData.success) return { success: false, message: "Invalid input data." };

        const {
            data: { email, password, confirmEmail, confirmPassword },
        } = validatedData;
        if (email !== confirmEmail) return { success: false, message: "Emails do not match." };
        if (password !== confirmPassword) return { success: false, message: "Passwords do not match." };

        const supabase = await supabaseServerClient();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) return { success: false, message: error.message };
        else if (!data) return { success: false, message: "Unexpected signup failure." };
        return { success: true, data };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: errorMessage };
    }
};

export { signInAction, signUpAction };
