// app/profile/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit2, Link as LinkIcon, Users, Calendar, Bookmark } from "lucide-react";
import { useSession } from 'next-auth/react'
import Image from 'next/image'
// Mock user data - replace with actual data fetching
const currentUser = {
    _id: "507f1f77bcf86cd799439011",
    name: "Alex Chen",
    email: "alex@studyfutura.com",
    profilePicture: "/default-avatar.jpg", // Replace with actual path
    bio: "CS student passionate about AI and collaborative learning. Currently studying algorithms and web development.",
    institution: "Stanford University",
    joinedGroups: ["641d3b0a5f7b4a2a9c4e5f1a", "641d3b0a5f7b4a2a9c4e5f1b"],
    createdAt: "2023-05-15T10:00:00Z",
};

// Mock group data - replace with actual data fetching
const userGroups = [
    {
        _id: "641d3b0a5f7b4a2a9c4e5f1a",
        name: "CS 101 Study Group",
        subject: "Computer Science",
        memberCount: 24,
    },
    {
        _id: "641d3b0a5f7b4a2a9c4e5f1b",
        name: "Advanced Algorithms",
        subject: "Data Structures",
        memberCount: 15,
    },
    {
        _id: "641d3b0a5f7b4a2a94e5f1b",
        name: "Advanced Algorithms",
        subject: "Data Structures",
        memberCount: 15,
    },
    {
        _id: "641d3b0a5f7b4a2ac4e5f1b",
        name: "Advanced Algorithms",
        subject: "Data Structures",
        memberCount: 15,
    },
];

export default function ProfilePage() {
    const {data : session} = useSession()
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-[#0F0F15] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-[#1A1A25] rounded-xl p-6 border border-[#252535] shadow-lg shadow-[#6C4DF6]/10">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar Section */}
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <Image
                                    width={200}
                                    height={200}
                                    src={session?.user?.profilePicture || "/mika.jpg"}
                                    alt={session?.user?.name || "User"}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-[#6C4DF6]"
                                />
                                <button className="absolute bottom-0 right-0 bg-[#6C4DF6] p-2 rounded-full hover:bg-[#6C4DF6]/90 transition-all">
                                    <Edit2 className="h-4 w-4 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                                        {session?.user?.name}
                                    </h1>
                                    <p className="text-[#B0B0B0] flex items-center gap-1 mt-1">
                                        <span>@{session?.user?.email.split("@")[0]}</span>
                                        <span>·</span>
                                        <span>
                                            Member since {new Date(currentUser.createdAt).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                                <Button
                                    onClick={() => setIsEditing(!isEditing)}
                                    variant="outline"
                                    className="border-[#6C4DF6] text-[#6C4DF6] hover:bg-[#6C4DF6]/10"
                                >
                                    {isEditing ? "Cancel" : "Edit Profile"}
                                </Button>
                            </div>

                            <div className="mt-4">
                                <p className="text-[#E0E0E0]">{session?.user?.bio}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#252535] text-[#00F0FF] text-sm">
                                        <Users className="h-4 w-4 mr-1" />
                                        {/* {session?.user?.joinedGroups.length} Groups */}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#252535] text-[#00F0FF] text-sm">
                                        <LinkIcon className="h-4 w-4 mr-1" />
                                        {session?.user?.institution}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats & Groups Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Activity Stats */}
                    <div className="bg-[#1A1A25] rounded-xl p-6 border border-[#252535]">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[#6C4DF6]" />
                            Activity
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[#B0B0B0] text-sm">Study Sessions</p>
                                <p className="text-white font-bold">18</p>
                            </div>
                            <div>
                                <p className="text-[#B0B0B0] text-sm">Resources Shared</p>
                                <p className="text-white font-bold">42</p>
                            </div>
                            <div>
                                <p className="text-[#B0B0B0] text-sm">Flashcards Created</p>
                                <p className="text-white font-bold">127</p>
                            </div>
                        </div>
                    </div>

                    {/* Joined Groups */}
                    <div className="md:col-span-2 bg-[#1A1A25] rounded-xl p-6 border border-[#252535]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Users className="h-5 w-5 text-[#6C4DF6]" />
                                Joined Study Groups
                            </h3>
                            <Link
                                href="/groups"
                                className="text-sm text-[#00F0FF] hover:underline"
                            >
                                View All
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {userGroups.map((group) => (
                                <Link
                                    key={group._id}
                                    href={`/groups/${group._id}`}
                                    className="block p-4 rounded-lg bg-[#252535] hover:bg-[#252535]/80 transition-all"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-medium text-white">{group.name}</h4>
                                            <p className="text-sm text-[#B0B0B0]">{group.subject}</p>
                                        </div>
                                        <div className="text-[#00F0FF] text-sm">
                                            {group.memberCount} members
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Resources (Optional) */}
                <div className="mt-8 bg-[#1A1A25] rounded-xl p-6 border border-[#252535]">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Bookmark className="h-5 w-5 text-[#6C4DF6]" />
                        Recently Shared Resources
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="p-4 rounded-lg bg-[#252535] hover:bg-[#252535]/80 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="bg-[#6C4DF6]/20 p-2 rounded-lg">
                                        <Bookmark className="h-5 w-5 text-[#6C4DF6]" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">
                                            {item === 1 ? "Algorithms Cheat Sheet" : "React Hooks Guide"}
                                        </h4>
                                        <p className="text-sm text-[#B0B0B0] mt-1">
                                            {item === 1 ? "PDF · 2 days ago" : "Markdown · 1 week ago"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}