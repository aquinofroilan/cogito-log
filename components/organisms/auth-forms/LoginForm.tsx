import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui";
import { useForm } from "react-hook-form";

function LoginForm() {
    const loginForm = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        progressive: true,
        mode: "onBlur",
        reValidateMode: "onChange",
        criteriaMode: "all",
    });
    const { handleSubmit, control } = loginForm;

    const onSubmit = (data: { email: string; password: string }) => {
        // Handle login logic here
        console.log("Login data:", data);
    };
    return (
        <Form {...loginForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <input type="email" placeholder="Enter your email" {...field} className="input" />
                            </FormControl>
                            <FormDescription>The email you used during registration.</FormDescription>
                            <FormMessage>
                                {fieldState.error ? fieldState.error.message : "Please enter a valid email address."}
                            </FormMessage>
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
                                <input type="password" placeholder="Enter your password" {...field} className="input" />
                            </FormControl>
                            <FormDescription>The password you used during registration.</FormDescription>
                            <FormMessage>
                                {fieldState.error
                                    ? fieldState.error.message
                                    : "Your password must be at least 6 characters long."}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="btn">
                    Login
                </Button>
            </form>
        </Form>
    );
}

export default LoginForm;
