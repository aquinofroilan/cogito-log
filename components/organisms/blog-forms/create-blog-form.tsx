"use client";
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
import { createBlogAction } from "@/actions";

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
        try {
            const result = createBlogAction(data);
            console.log("Blog post created successfully:", result);
        } catch (error) {
            console.error("Error creating blog post:", error);
            
        }
    };
    return (
        <Form {...createBlogForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                <CardContent className="space-y-4 w-full">
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
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        Create Blog Post
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
};

export default CreateBlogForm;
