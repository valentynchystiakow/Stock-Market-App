// marks file as client part
'use client'

// imports required modules(components)
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {signUpWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


// creates and exports sign up page component
const SignUp = () => {
    // uses useRouter hook for managing routes
    const router = useRouter();
    // uses useForm hook with custom SignUpFormData interface to manage creating form for signing up
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    }, );


    // creates async function that handles form submitting after it was created
    const onSubmit = async (data: SignUpFormData) => {
        // try catch block for handling exceptions while signing up with email
        try {
            const result = await signUpWithEmail(data);
            // if result is success navigates user to homepage
            if (result.success) router.push ('/')
        }
        catch (e) {
            console.error(e);
            // calls toast to show error message
            toast.error('Failed to sign up', {
                description: e instanceof Error ? e.message : 'Failed to create an account.'
            });
        }
    }


    return (
        <>
            {/* Form title block*/}
            <h1 className="form-title">Sign Up and Personalize </h1>
            {/* Submit form block*/}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/*    Inputs sections */}
            {/*    Name Input field section */}
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{ required: 'Full name is required', minLength: 2 }}
                />
                {/* Email input field section*/}
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                />
                {/* Password input field section*/}
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                {/*Country Select Field section*/}
                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />

                {/* Investment goals field section */}
                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                {/* Risk Tolerance field section*/}
                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />
                {/* Preferred Industry field section*/}
                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />


            {/* Submit Button section   */}
                <Button type = "submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
                </Button>

            </form>
         </>)

}


// exports default sign up page component
export default SignUp
