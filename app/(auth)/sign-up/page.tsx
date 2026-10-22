'use client'
import InputFields from "@/components/forms/input-forms";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const SignUp = () => {

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    defaultValues: {
    fullName: '',
    email: '',
    password: '',
    country: 'US',
    investmentGoals: 'Growth',
    riskTolerance: 'Medium',
    preferredIndustry: 'Technology',
    },
    mode: 'onBlur'
  });

  const onSubmit = async(data:SignUpFormData) => {
    try {
        console.log( data ); 
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <section className="">
      <h1 className="form-title">Sign up & Personalized </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <InputFields />

        <Button disabled={isSubmitting} className="yellow-btn w-full mt-5" type="submit">
          {isSubmitting ? 'Creating account' : 'Start your investment Journey'}
        </Button>
      </form>

    </section>
  );
};

export default SignUp;
