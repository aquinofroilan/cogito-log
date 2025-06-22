"use client";
import React from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewBlogSchema, type NewBlogSchemaType } from "@/schemas";

const CreateBlogForm = () => {
    const createBlogForm = useForm({
        defaultValues: {
            title: "",
            content: "",
        },
        progressive: true,
        mode: "onBlur",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
        resolver: zodResolver(NewBlogSchema),
    });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = createBlogForm;
    const onSubmit = async (data: NewBlogSchemaType) => {
        // Handle form submission logic here
        console.log("Form submitted with data:", data);
    };
    return (
        <Form {...createBlogForm}>
            <form onSubmit={createBlogForm.handleSubmit(onSubmit)} className="space-y-4">
                <CardContent className="space-y-4">
                    <FormField
                        control={control}
                        name="title"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter blog title" {...field} />
                                </FormControl>
                                <FormDescription>Enter the title of your blog post.</FormDescription>
                                <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="content"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write your blog content here" {...field} />
                                </FormControl>
                                <FormDescription>Write the content of your blog post.</FormDescription>
                                <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="submit" className="w-full">
                        Create Blog Post
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
};

export default CreateBlogForm;
