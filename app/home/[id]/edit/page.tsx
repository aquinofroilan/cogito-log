import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { getBlogAction } from "@/actions";
import { notFound } from "next/navigation";
import EditBlogForm from "@/components/organisms/blog-forms/edit-blog-form";

const EditBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
        notFound();
    }
    const blogData = await getBlogAction(Number(id));
    if (!blogData.success || !blogData.data) {
        notFound();
    }
    const blog: {
        title: string;
        content: string;
        blog_id: number;
    } = blogData.data;

    return (
        <main>
            <Card className="w-full max-w-md h-fit p-6">
                <CardHeader>
                    <CardTitle>Edit Blog</CardTitle>
                    <CardDescription>Edit your blog with the form below.</CardDescription>
                </CardHeader>
                <EditBlogForm content={blog.content} id={String(blog.blog_id)} title={blog.title} />
            </Card>
        </main>
    );
};

export default EditBlog;
