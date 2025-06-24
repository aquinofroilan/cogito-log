"use client";
import { Button } from "../ui";
import { deleteBlogAction } from "@/actions";

function DeleteBlogButton({ blog_id }: { blog_id: number }) {
    return (
        <Button variant="destructive" className="w-full mt-2" onClick={() => deleteBlogAction(blog_id)}>
            Delete
        </Button>
    );
}

export default DeleteBlogButton;
