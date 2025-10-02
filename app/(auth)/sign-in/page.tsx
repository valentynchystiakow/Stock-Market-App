// marks file as a client part
'use client';

// imports required components(modules)
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
// import {signInWithEmail, signUpWithEmail} from "@/lib/actions/auth.actions";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {signInWithEmail} from "@/lib/actions/auth.actions";

// creates SignIn component
const SignIn = () => {
    // uses useRouter hook to navigate to different routes
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    // creates onSubmit async function that submits sign in
    const onSubmit = async (data: SignInFormData) => {
        // try catch block for handling exceptions
        try {
            const result = await signInWithEmail(data);
            // routes user to homepage if sign in is successful
            if(result.success) router.push('/');
        } catch (e) {
            console.error(e);
            // shows error message if sign in fails
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }

    return (
        <>
            {/* Form title block*/}
            <h1 className="form-title">Welcome back</h1>

            {/* On Submit Form*/}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Input field section*/}
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/ }}
                />
                {/* Password input field section*/}
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />
                {/* Submit button section*/}
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>
                {/*Footer Link Section*/}
                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    );
};
export default SignIn;