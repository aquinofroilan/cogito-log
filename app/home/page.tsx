import { getBlogsAction } from "@/actions";
import CreateBlogForm from "@/components/organisms/blog-forms/create-blog-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@/components/ui";
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
    console.log(userBlogs);
    return (
        <main className="flex items-center flex-col min-h-screen">
            <Card className="w-full max-w-md h-fit p-6">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CreateBlogForm />
            </Card>

            <section className="w-full max-w-3xl mt-8">
                <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
                {userBlogs.data?.map((blog) => (
                    <Card key={blog.blog_id} className="mb-4">
                        <CardHeader>
                            <CardTitle>{blog.title}</CardTitle>
                            <CardDescription>{new Date(blog.created_at).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>{blog.content}</CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                Edit
                            </Button>
                            <Button variant="destructive" className="w-full mt-2">
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </main>
    );
};

export default HomePage;
