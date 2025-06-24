import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const EditBlog = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log("EditBlog params:", params);
    return (
        <main>
            <Card className="w-full max-w-md h-fit p-6">
                <CardHeader>
                    <CardTitle>Edit Blog</CardTitle>
                    <CardDescription>Edit your blog with the form below.</CardDescription>
                </CardHeader>
            </Card>
        </main>
    );
};

export default EditBlog;
