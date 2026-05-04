"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLoginFunc = async (data) => {
    const { data: res, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: redirectPath,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (res) {
      toast.success("Login successful 🚀");
      setTimeout(() => router.push(redirectPath), 800);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });

    toast.info("Redirecting to Google...");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-10 px-4 sm:px-6 lg:px-8 animate__animated animate__fadeIn">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-slate-50/30 p-8 sm:p-12 animate__animated animate__fadeInUp">

        {/* Header */}
        <div className="space-y-2 text-center">
          <h2 className="text-3xl tracking-tight text-gray-900 animate__animated animate__fadeInDown">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6 mt-6" onSubmit={handleSubmit(handleLoginFunc)}>
          <fieldset className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-gray-400 ml-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50/50 px-4 text-sm outline-none transition-all focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/5"
              {...register("email", { required: "Email is required." })}
            />
            {errors.email && (
              <p className="ml-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </fieldset>

          <fieldset className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-gray-400 ml-1">
              Password
            </label>

            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50/50 px-4 pr-12 text-sm outline-none transition-all focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/5"
                {...register("password", { required: "Password is required." })}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {isShowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {errors.password && (
              <p className="ml-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-gray-900 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
          OR
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /> <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /> <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /> <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /> </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-900 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;