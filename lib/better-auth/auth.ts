// imports required modules and components
import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { connectToDatabase} from "@/database/mongoose";
import { nextCookies} from "better-auth/next-js";

// creates auth instance that is type of betterAuth that prevents multiple connections
let authInstance: ReturnType<typeof betterAuth> | null = null;

// creates and exports async function that returns auth instance
export const getAuth = async () => {
    // checks if authInstance already exists
    if(authInstance) return authInstance;

    // creates connection to database
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    // throws error if connection to database is not found
    if(!db) throw new Error('MongoDB connection not found');


    // creates object of auth instance
    authInstance = betterAuth({
        // object properties
        database: mongodbAdapter(db as never),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        // additional plugins
        plugins: [nextCookies()],
    });

    return authInstance;
}

// exports auth instance
export const auth = await getAuth();