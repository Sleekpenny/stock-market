"use client";
import FooterLink from "@/components/forms/footerLink";
import InputFields from "@/components/forms/input-forms";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation"

const SignIn = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);
      if (result.success ) {
        router.push('/');
      }
      await console.log(data);
    } catch (e) {
      console.error(e);
      toast.error('Sign in failed', {
        description: e instanceof Error ? e.message : 'Failed to create an account'
      })
    }
  };

  return (
    <section className="">
      <h1 className="form-title"> Welcome back </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    <InputFields
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        register={register}
        error={errors.email}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
      />

        <InputFields
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Enter a strong password", minLength: 5 }}
        />

        <Button
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
          type="submit"
        >
          {isSubmitting ? "Signing you into your account" : "Sign up"}
        </Button>
      <FooterLink
        text="Don't have an account"
        linkText="Create an account"
        href="/sign-up"
      />
      </form>
    </section>
  );
};

export default SignIn;
