"use server";

import { NewBlogSchema, type NewBlogSchemaType } from "@/schemas";
import { supabaseServerClient } from "@/utils/supabase/supabase";
import { revalidatePath } from "next/cache";

const createBlogAction = async (values: NewBlogSchemaType) => {
    try {
        const supabase = await supabaseServerClient();
        const session = await supabase.auth.getUser();
        if (!session.data.user) return { success: false, message: "User not authenticated." };

        const validatedData = NewBlogSchema.safeParse(values);
        if (!validatedData.success) return { success: false, message: "Invalid input data." };

        const {
            data: { title, content },
        } = validatedData;
        if (title === "" || content === "") return { success: false, message: "Title and content cannot be empty." };
        const { data, error } = await supabase
            .from("blogs")
            .insert([{ title, content, user_uuid: session.data.user.id }])
            .select();
        console.log(data, error);

        if (error) return { success: false, message: error.message };
        else if (!data || data.length === 0) return { success: false, message: "Unexpected blog creation failure." };
        revalidatePath("/home");
        return { success: true, data };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: errorMessage };
    }
};

const getBlogsAction = async () => {
    try {
        const supabase = await supabaseServerClient();
        const session = await supabase.auth.getUser();
        if (!session.data.user) return { success: false, message: "User not authenticated." };
        const { data, error } = await supabase
            .from("blogs")
            .select()
            .eq("user_uuid", session.data.user.id)
            .order("created_at", { ascending: false });

        console.log(data, error);
        if (error) return { success: false, message: error.message };
        else if (!data || data.length === 0) return { success: false, message: "No blogs found." };
        return { success: true, data };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: errorMessage };
    }
};

const updateBlogAction = async (blog_id: string, values: NewBlogSchemaType) => {
    try {
        const validatedData = NewBlogSchema.safeParse(values);
        if (!validatedData.success) return { success: false, message: "Invalid input data." };

        const {
            data: { title, content },
        } = validatedData;
        if (title === "" || content === "") return { success: false, message: "Title and content cannot be empty." };

        const supabase = await supabaseServerClient();
        const { data, error } = await supabase.from("blogs").update({ title, content }).eq("blog_id", blog_id).select();

        if (error) return { success: false, message: error.message };
        else if (!data || data.length === 0) return { success: false, message: "Unexpected blog update failure." };
        revalidatePath("/home");
        return { success: true, data };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: errorMessage };
    }
};

const deleteBlogAction = async (blog_id: number) => {
    try {
        const supabase = await supabaseServerClient();
        const session = await supabase.auth.getUser();
        if (!session.data.user) return { success: false, message: "User not authenticated." };
        const { data, error } = await supabase
            .from("blogs")
            .delete()
            .eq("blog_id", blog_id)
            .eq("user_uuid", session.data.user.id)
            .select();

        if (error) return { success: false, message: error.message };
        else if (!data || data.length === 0) return { success: false, message: "Unexpected blog deletion failure." };
        revalidatePath("/home");
        return { success: true, data };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return { success: false, message: errorMessage };
    }
};

export { createBlogAction, getBlogsAction, updateBlogAction, deleteBlogAction };
