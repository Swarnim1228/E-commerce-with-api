"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">Login</h2>

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

      <button
        type="submit"
        className="w-full py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}
