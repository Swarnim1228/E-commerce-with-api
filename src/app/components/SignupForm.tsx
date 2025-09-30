"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormInputs) => {
    console.log("Signup Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">Signup</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          {...register("name")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Signup
      </button>
    </form>
  );
}
