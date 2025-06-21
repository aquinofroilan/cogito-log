"use server";
import type { LoginSchemaType } from "@/schemas";
import { supabaseServerClient } from "@/utils/supabase/supabase";

const loginAction = async (values: LoginSchemaType) => {
    try {
        const { email, password } = values;
        const supabase = await supabaseServerClient();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, message: error.message };
        } else if (!data) {
            return { success: false, message: "Unexpected login failure." };
        }

        return { success: true, data };
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        return {
            success: false,
            message: errorMessage,
        };
    }
};

const signUpAction = (email: string, password: string) => {
    console.log("Signing up with:", { email, password });
};

export { loginAction, signUpAction };
