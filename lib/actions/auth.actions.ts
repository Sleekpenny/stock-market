'use server'

import { getAuth } from "../auth";
import { inngest } from "../inngest/client";
import { headers } from 'next/headers';

export const signUpWithEmail = async ({email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry}: SignUpFormData) => {
   const auth = await getAuth();
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email, 
                password,
                name:fullName
            }
        })

        if(response) {
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email, name:fullName, country, investmentGoals, preferredIndustry, riskTolerance
                }  
            })
        }

        return { success: true, data: response};
    } catch (e) {
        console.log('Sign up with failed', e);
        return {
            success: false, e: 'Sign up failed'
        }
    }

}

export const signOut = async () => {
    const auth = await getAuth();
    try {
        await auth.api.signOut({headers: await headers()});
    } catch (e) {
        console.log('', e);
        return {
            success:false,
            e: 'There was an error signing you out'
        }
    }
}

export const signInWithEmail = async ({email, password}:SignInFormData) => {
    const auth = getAuth();
    try {
        const response = (await auth).api.signInEmail({body: {email, password}});
        return { success: true, data: response};
    } catch (e) {
        console.log('', e);
        return {
            success:false,
            e: 'Signing in failed'
        }
    }
}