// marks file as server component
'use server';

// imports required modules and components
import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";


// creates async function that handles sign up with email process
export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    // try catch block for handling exceptions while signing up
    try {
        // creates response object and calls sign up email function
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })
        // if response is not null, send welcome email
        if(response) {
            await inngest.send({
                // triggers inngest workflow to send welcome email
                name: 'app/user.created',
                data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
            })
        }

        return { success: true, data: response }
        // if response is null, return error message
    } catch (e) {
        console.log('Sign up failed', e)
        return { success: false, error: 'Sign up failed' }
    }
}

// creates async function that handles sign in with email process
export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    // try catch block for handling exceptions while signing in
    try {
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign in failed', e)
        return { success: false, error: 'Sign in failed' }
    }
}

// creates async function that handles sign out process
export const signOut = async () => {
    // try catch block for handling exceptions while signing out
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e)
        return { success: false, error: 'Sign out failed' }
    }
}