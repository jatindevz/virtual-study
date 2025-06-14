// components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Plus, Users } from "lucide-react";
import { useSession } from 'next-auth/react'


export default function Navbar({ isLoggedIn = false }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all ${scrolled ? "bg-[#0F0F15]/90 backdrop-blur-md" : "bg-[#0F0F15]"}`}>
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 bg-[#6C4DF6] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] bg-clip-text text-transparent">
                        StudyFutura
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {session ? (
                        <>
                            <Link
                                href="/groups/join"
                                className="flex items-center text-[#E0E0E0] hover:text-[#00F0FF] transition-colors"
                            >
                                <Users className="h-4 w-4 mr-2" />
                                Join Group
                            </Link>
                            <Link
                                href="/groups/create"
                                className="flex items-center text-[#E0E0E0] hover:text-[#00F0FF] transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Group
                            </Link>
                            <Link href="/profile">
                                <Button
                                    variant="outline"
                                    className="ml-4 border-[#6C4DF6] text-[#6C4DF6] hover:bg-[#6C4DF6]/10 hover:shadow-[0_0_15px_#6C4DF6/30]"
                                >
                                    My Profile
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/features" className="text-[#E0E0E0] hover:text-[#00F0FF] transition-colors">
                                Features
                            </Link>
                            <Link href="/pricing" className="text-[#E0E0E0] hover:text-[#00F0FF] transition-colors">
                                Pricing
                            </Link>
                            <Link href="/login">
                                <Button
                                    variant="ghost"
                                    className="text-[#E0E0E0] hover:text-[#00F0FF] hover:bg-transparent"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    className="bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] text-white hover:shadow-[0_0_15px_#6C4DF6/50] cursor-pointer"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[#E0E0E0] hover:text-[#00F0FF] transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1A1A25] border-t border-[#252535] shadow-lg">
                        <div className="px-6 py-4 space-y-4">
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href="/groups/join"
                                        className=" py-2 px-4 rounded-lg hover:bg-[#252535] flex items-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Users className="h-5 w-5 mr-3 text-[#6C4DF6]" />
                                        Join Group
                                    </Link>
                                    <Link
                                        href="/groups/create"
                                        className=" py-2 px-4 rounded-lg hover:bg-[#252535] flex items-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <Plus className="h-5 w-5 mr-3 text-[#6C4DF6]" />
                                        Create Group
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className="block py-2 px-4 rounded-lg hover:bg-[#252535]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/features"
                                        className="block py-2 px-4 rounded-lg hover:bg-[#252535]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Features
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="block py-2 px-4 rounded-lg hover:bg-[#252535]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="block py-2 px-4 rounded-lg hover:bg-[#252535]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <a
                                            href="/register"
                                        className="block py-2 px-4 rounded-lg bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] text-white text-center mt-2 cursor-pointer"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}