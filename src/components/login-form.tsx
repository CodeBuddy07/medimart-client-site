'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Pill, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/React-Query/Queries/authQueries";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginData) => {
    login(data);
  };

  const handleForgotPassword = () => {
    toast.custom((t) => (
      <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <div className="flex-shrink-0">
          <Pill className="h-5 w-5 text-red-500 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Password Amnesia Detected!
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t worry, we won&apos;t prescribe you memory pills... yet.
            {/* Check your email for recovery instructions. */}
            Try to remember it, or contact support for help.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => toast.dismiss(t)}
              className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md"
            >
              Got it, doc!
            </button>
          </div>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'top-center',
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden bg-white dark:bg-gray-800">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h1>
                <p className="text-balance text-muted-foreground dark:text-gray-400">
                  Login to your dashboard account
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white dark:bg-gray-700 dark:text-gray-200"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-900 dark:text-gray-100">Password</Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="ml-auto text-sm underline-offset-2 hover:underline text-blue-600 dark:text-blue-400"
                  >
                    Forgot your password?
                  </button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  className="bg-white dark:bg-gray-700 dark:text-gray-200"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Login
              </Button>
              
              <div className="text-center text-sm text-gray-900 dark:text-gray-200">
                Don&apos;t have an account?{" "}
                <Link className="underline underline-offset-4 text-blue-600 dark:text-blue-400" href="/sign-up">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>

          <div className="relative hidden md:block h-full">
            <Image
              src="/log-inForm.png"
              fill
              alt="Login illustration"
              className="object-cover "
              priority
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground dark:text-gray-300 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="#" className="hover:text-primary">Terms of Service</a> and{" "}
        <a href="#" className="hover:text-primary">Privacy Policy</a>.
      </div>
    </div>
  );
}
