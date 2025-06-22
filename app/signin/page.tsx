import SignInForm from "@/components/organisms/auth-forms/sign-in-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const SignIn = () => {
    return (
        <main className="flex items-center justify-center min-h-screen p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <SignInForm />
            </Card>
        </main>
    );
};

export default SignIn;
