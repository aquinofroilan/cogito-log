"use server";
import { supabaseServerClient } from "@/utils/supabase/supabase";

const loginAction = async (email: string, password: string) => {
    const supabase = await supabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    console.log("Login data:", data);
    console.error("Login error:", error?.message);
};

const signUpAction = (email: string, password: string) => {
    console.log("Signing up with:", { email, password });
};

export { loginAction, signUpAction };
