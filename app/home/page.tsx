import { getBlogsAction } from "@/actions";
import DeleteBlogButton from "@/components/atoms/delete-blog-button";
import CreateBlogForm from "@/components/organisms/blog-forms/create-blog-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/components/ui";
import Link from "next/link";
import { use } from "react";

interface Blog {
    blog_id: number;
    content: string;
    created_at: string;
    title: string;
}

const HomePage = () => {
    const userBlogs:
        | {
              success: boolean;
              message: string;
              data?: Blog[];
          }
        | {
              success: boolean;
              data: Blog[];
              message?: undefined;
          } = use(getBlogsAction());
    return (
        <main className="flex items-center flex-col min-h-screen">
            <Button asChild variant="destructive" className="mt-8 mb-4">
                <Link href="/signout">Sign Out</Link>
            </Button>
            <Card className="w-full max-w-md h-fit p-6">
                <CardHeader>
                    <CardTitle>Create New Blog</CardTitle>
                    <CardDescription>
                        Use the form below to create a new blog post. Your blogs will be listed below the form.
                    </CardDescription>
                </CardHeader>
                <CreateBlogForm />
            </Card>

            <section className="w-full max-w-3xl mt-8">
                <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
                {!userBlogs.success && <p>No blogs found.</p>}
                {userBlogs.data?.map((blog) => (
                    <Card key={blog.blog_id} className="mb-4">
                        <CardHeader>
                            <CardTitle>{blog.title}</CardTitle>
                            <CardDescription>{new Date(blog.created_at).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>{blog.content}</CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`/home/${blog.blog_id}/edit`}>Edit</Link>
                            </Button>
                            <DeleteBlogButton blog_id={blog.blog_id} />
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </main>
    );
};

export default HomePage;
