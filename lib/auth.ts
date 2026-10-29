import { connectToDB } from "@/database/mongose";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { nextCookies } from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () =>{
    if(authInstance) return authInstance;

    const mongoose = await connectToDB();
    const db = mongoose.connection.db;

    if(!db) throw new Error('MongoDB connection not found');

    authInstance = betterAuth ({
        database: mongodbAdapter(db),
        secret: process.env.BETTER_AUTH_API_KEY,
        baseURL: process.env.NEXT_BETTER_AUTH_BASEURL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength:28,
            autoSignIn: true
        },
          plugins: [nextCookies()]
    })

    return authInstance;

}

export const auth = await getAuth;