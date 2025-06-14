// app/login/page.jsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await signIn('credentials', {
            redirect: false, // Prevent automatic redirect so we can handle manually
            email: values.email,
            password: values.password,
        });

        if (res?.error) {
            toast.error(res.error); // Show error from NextAuth (e.g. "Invalid credentials")
        } else {
            toast.success('Login successful!');
            router.replace('/profile'); // Or wherever you want to redirect the user
        }
    }

    return (
        <div className="min-h-screen bg-[#0F0F15] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1A1A25] rounded-xl p-8 border border-[#252535] shadow-lg shadow-[#6C4DF6]/10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-[#B0B0B0]">Enter your credentials to access your account</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                    <div className="flex justify-between items-center">
                                        <FormLabel className="text-[#E0E0E0]">Password</FormLabel>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm text-[#00F0FF] hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
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
                            className="w-full bg-[#6C4DF6] hover:bg-[#6C4DF6]/90 hover:shadow-[0_0_15px_#6C4DF6/50] transition-all"
                        >
                            Sign In
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm text-[#B0B0B0]">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-[#00F0FF] hover:underline font-medium"
                    >
                        Sign up
                    </Link>
                </div>
                {/* <div>
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-[#252535]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#1A1A25] px-2 text-[#B0B0B0]">Or continue with</span>
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