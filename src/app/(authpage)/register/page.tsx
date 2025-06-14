// app/register/page.jsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ErrorResponse = {
    message: string;
};

const formSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function RegisterPage() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(data)
        // setIsSubmit(true)
        try {
            const res = await axios.post('/api/auth/register', data)
            toast.success(res.data.message)
            router.replace(`/login`)
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>
            toast.error(axiosError.response?.data.message ?? "Registration failed")
        } finally {

        }
    }

    return (
        <div className="min-h-screen bg-[#0F0F15] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1A1A25] rounded-xl p-8 border border-[#252535] shadow-lg shadow-[#6C4DF6]/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-[#B0B0B0]">Get started with your free account</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#E0E0E0]">Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                            className="bg-[#252535] border-[#252535] text-white focus-visible:ring-[#6C4DF6]"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#FF6B6B]" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#E0E0E0]">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="your@email.com"
                                            {...field}
                                            className="bg-[#252535] border-[#252535] text-white focus-visible:ring-[#6C4DF6]"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#FF6B6B]" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#E0E0E0]">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            {...field}
                                            className="bg-[#252535] border-[#252535] text-white focus-visible:ring-[#6C4DF6]"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#FF6B6B]" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#E0E0E0]">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            {...field}
                                            className="bg-[#252535] border-[#252535] text-white focus-visible:ring-[#6C4DF6]"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[#FF6B6B]" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full mt-6 bg-[#6C4DF6] hover:bg-[#6C4DF6]/90 hover:shadow-[0_0_15px_#6C4DF6/50] transition-all"
                        >
                            Create Account
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm text-[#B0B0B0]">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-[#00F0FF] hover:underline font-medium"
                    >
                        Sign in
                    </Link>
                </div>
                {/* <div>
                    
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[#252535]" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#1A1A25] px-2 text-[#B0B0B0]">Or sign up with</span>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Button variant="outline" className="flex-1 border-[#252535] text-white">
                        Google
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#252535] text-white">
                        GitHub
                    </Button>
                </div>
</div> */}
            </div>
        </div>
    );
}