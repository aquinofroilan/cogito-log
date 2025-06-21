"use client";
import {
    Button,
    CardContent,
    CardFooter,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginSchema, LoginSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/actions";
import { toast } from "sonner";

function LoginForm() {
    const loginForm = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        progressive: true,
        mode: "onBlur",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
        resolver: zodResolver(LoginSchema), // Assuming LoginSchema is imported from schemas/index.ts
    });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = loginForm;

    const onSubmit = async (d: LoginSchemaType) => {
        if (d.email === "" || d.password === "") {
            toast.error("Please fill in all fields.");
            return;
        }

        const response = await loginAction(d);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        const userData = response.data;
    };

    return (
        <>
            <Form {...loginForm}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <CardContent className="space-y-4">
                        <FormField
                            control={control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                            className="input"
                                            disabled={isSubmitting}
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormDescription>The email you used during registration.</FormDescription>
                                    <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                            className="input"
                                            disabled={isSubmitting}
                                            autoComplete="current-password"
                                        />
                                    </FormControl>
                                    <FormDescription>The password you used during registration.</FormDescription>
                                    <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex justify-between flex-col">
                        <Button type="submit" className="btn w-full" disabled={isSubmitting}>
                            Login
                        </Button>
                        <Button asChild variant={"outline"} className="mt-2 w-full" disabled={isSubmitting}>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </>
    );
}

export default LoginForm;
