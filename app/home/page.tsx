import CreateBlogForm from "@/components/organisms/blog-forms/create-blog-form";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui";

const HomePage = () => {
    return (
        <main className="flex justify-center min-h-screen">
            <Card className="w-full max-w-md p-6">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CreateBlogForm />
            </Card>
        </main>
    );
};

export default HomePage;
