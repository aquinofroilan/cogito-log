"use client";
import { editBlogAction } from "@/actions";
import {
    Input,
    Button,
    Textarea,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    CardContent,
    CardFooter,
} from "@/components/ui";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

function EditBlogForm(id: number) {
    const editBlogForm = useForm({
        defaultValues: {
            title: "",
            content: "",
            blog_id: id,
        },
    });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = editBlogForm;
    const onSubmit = async (data: any) => {
        try {
            const result = editBlogAction(data);
            console.log("Blog post created successfully:", result);
        } catch (error) {
            console.error("Error creating blog post:", error);
        }
    };
    return (
        <Form {...editBlogForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CardContent>
                    <FormField
                        control={control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Blog Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Blog Title" {...field} />
                                </FormControl>
                                <FormDescription>This is the title of the blog post.</FormDescription>
                                <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="content"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Blog Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write your blog content here..." {...field} />
                                </FormControl>
                                <FormDescription>This is the content of the blog post.</FormDescription>
                                <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save</Button>
                    <Button type="button" variant="secondary" asChild disabled={isSubmitting}>
                        <Link href="/home">Cancel</Link>
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
}

export default EditBlogForm;
