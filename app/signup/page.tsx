import SignUpForm from "@/components/organisms/auth-forms/sign-up-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";

const SignUp = () => {
    return (
        <main className="flex items-center justify-center min-h-screen p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create an account to access your account.</CardDescription>
                </CardHeader>
                <SignUpForm />
            </Card>
        </main>
    );
};

export default SignUp;
