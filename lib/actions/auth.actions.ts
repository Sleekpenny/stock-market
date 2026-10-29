'use server'

import { auth } from "../auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async ({email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry}: SignUpFormData) => {
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