"use client";
import CountrySelectField from "@/components/forms/country-fields";
import FooterLink from "@/components/forms/footerLink";
import InputFields from "@/components/forms/input-forms";
import SelectFields from "@/components/forms/select-forms";
import { Button } from "@/components/ui/button";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="">
      <h1 className="form-title">Sign up & Personalized </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputFields
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
        />

        <InputFields
          name="email"
          label="Email"
          placeholder="example@gmail.com "
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^\w+@\.\w+$/,
            message: "Email address is required",
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

        <SelectFields
          name="investmentGoals"
          label="Investment Goals"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        <SelectFields
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />

        <SelectFields
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />

        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />

        <Button
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
          type="submit"
        >
          {isSubmitting ? "Creating account" : "Start your investment Journey"}
        </Button>

        <FooterLink text="Already have an account" linkText="Sign In" href="/sign-in" />
      </form>
    </section>
  );
};

export default SignUp;
