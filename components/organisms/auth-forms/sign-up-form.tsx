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
import { SignUpSchema, type SignUpSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpAction } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/router";

function SignUpForm() {
    const router = useRouter();
    const signUpForm = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmEmail: "",
            confirmPassword: "",
        },
        progressive: true,
        mode: "onBlur",
        reValidateMode: "onSubmit",
        criteriaMode: "all",
        resolver: zodResolver(SignUpSchema), // Assuming LoginSchema is imported from schemas/index.ts
    });
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = signUpForm;
    const onSubmit = async (d: SignUpSchemaType) => {
        if (d.email === "" || d.password === "" || d.confirmEmail === "" || d.confirmPassword === "") {
            toast.error("Please fill in all fields.");
            return;
        }

        const response = await signUpAction(d);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        const userData = response.data;
        if (!userData) {
            toast.error("Unexpected signup failure.");
            return;
        }

        toast.success("Registration successful!");
        router.push("/signin"); // Redirect to sign-in page after successful registration
    };
    return (
        <Form {...signUpForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CardContent className="space-y-4">
                    <FormField
                        control={control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormDescription>Please enter your email address.</FormDescription>
                                <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="confirmEmail"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Confirm Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm Email" {...field} />
                                </FormControl>
                                <FormDescription>Please retype your email to confirm it.</FormDescription>
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
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormDescription>Please enter a strong password.</FormDescription>
                                <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="confirmPassword"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormDescription>Please retype your password to confirm it.</FormDescription>
                                <FormMessage>{fieldState.error ? fieldState.error.message : ""}</FormMessage>
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter className="flex justify-between flex-col">
                    <Button type="submit" className="btn w-full" disabled={isSubmitting}>
                        Sign Up
                    </Button>
                    <Button asChild variant={"outline"} className="mt-2 w-full" disabled={isSubmitting}>
                        <Link href="/signin">Sign In</Link>
                    </Button>
                </CardFooter>
            </form>
        </Form>
    );
}

export default SignUpForm;
