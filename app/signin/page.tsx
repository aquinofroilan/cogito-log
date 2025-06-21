import LoginForm from "@/components/organisms/auth-forms/LoginForm";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import React from "react";

const SignIn = () => {
    return (
        <main className="flex items-center justify-center min-h-screen p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <LoginForm />
            </Card>
        </main>
    );
};

export default SignIn;
