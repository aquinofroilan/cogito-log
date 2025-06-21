const loginAction = (email: string, password: string) => {
    console.log("Logging in with:", { email, password });
};

const signUpAction = (email: string, password: string) => {
    console.log("Signing up with:", { email, password });
};

export { loginAction, signUpAction };
