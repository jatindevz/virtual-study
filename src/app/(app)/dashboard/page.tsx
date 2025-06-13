// app/dashboard/page.jsx
'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard() {
    // Mock data - replace with real data from your API
    const stats = [
        { title: "Active Groups", value: "5", change: "+2 this week" },
        { title: "Study Hours", value: "14.5", change: "+3.2 from last week" },
        { title: "Resources Shared", value: "23", change: "7 new today" },
        { title: "Upcoming Sessions", value: "3", change: "Next: Tomorrow 2PM" }
    ];

    const activeGroups = [
        {
            name: "Advanced Algorithms",
            subject: "Computer Science",
            members: 8,
            progress: 65,
            lastActive: "2 hours ago"
        },
        {
            name: "Quantum Physics",
            subject: "Physics",
            members: 5,
            progress: 42,
            lastActive: "5 hours ago"
        },
        {
            name: "Biochemistry",
            subject: "Medicine",
            members: 6,
            progress: 78,
            lastActive: "1 day ago"
        }
    ];

    const recentActivity = [
        { user: "Alex M.", action: "shared Midterm_Notes.pdf", time: "10 min ago", group: "Advanced Algorithms" },
        { user: "Sarah K.", action: "started a video session", time: "45 min ago", group: "Quantum Physics" },
        { user: "You", action: "created flashcards", time: "2 hours ago", group: "Biochemistry" },
        { user: "Team", action: "completed weekly quiz", time: "1 day ago", group: "Advanced Algorithms" }
    ];

    return (
        <div className="min-h-screen bg-[#0F0F15] p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-[#B0B0B0]">Welcome back! Here's your study overview</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-[#252535] text-white hover:bg-[#252535]">
                        Create Group
                    </Button>
                    <Button className="bg-[#6C4DF6] hover:bg-[#6C4DF6]/90">
                        Start Session
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-[#1A1A25] border-[#252535]">
                        <CardHeader>
                            <CardTitle className="text-[#B0B0B0] text-sm font-medium">{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-[#00F0FF]">{stat.change}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Groups */}
                <Card className="lg:col-span-2 bg-[#1A1A25] border-[#252535]">
                    <CardHeader>
                        <CardTitle className="text-white">Your Active Groups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {activeGroups.map((group, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <Avatar className="bg-[#6C4DF6]">
                                        <AvatarFallback className="bg-[#6C4DF6] text-white">
                                            {group.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-white">{group.name}</h3>
                                            <span className="text-sm text-[#B0B0B0]">{group.members} members</span>
                                        </div>
                                        <p className="text-sm text-[#B0B0B0] mb-2">{group.subject}</p>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{group.progress}%</span>
                                            </div>
                                            <Progress value={group.progress} className="h-2 bg-[#252535]" />
                                        </div>
                                        <p className="text-xs text-[#B0B0B0] mt-2">Last active: {group.lastActive}</p>
                                    </div>
                                    <Button variant="ghost" className="text-[#00F0FF] hover:text-[#00F0FF]/80">
                                        Join
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="text-[#00F0FF] p-0">
                            View all groups →
                        </Button>
                    </CardFooter>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-[#1A1A25] border-[#252535]">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs bg-[#252535]">
                                            {activity.user === "You" ? "Y" : activity.user.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm text-white">
                                            <span className="font-medium">{activity.user}</span> {activity.action}
                                        </p>
                                        <div className="flex gap-2 text-xs text-[#B0B0B0]">
                                            <span>{activity.time}</span>
                                            <span>•</span>
                                            <span>{activity.group}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="text-[#00F0FF] p-0">
                            View full activity log →
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#1A1A25] border-[#252535]">
                    <CardHeader>
                        <CardTitle className="text-white">Upcoming Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 bg-[#252535] rounded-lg">
                                <p className="font-medium text-white">Advanced Algorithms</p>
                                <p className="text-sm text-[#B0B0B0]">Tomorrow, 2:00 PM - 4:00 PM</p>
                            </div>
                            <Button variant="outline" className="w-full border-[#252535] text-white">
                                + Add to Calendar
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1A1A25] border-[#252535]">
                    <CardHeader>
                        <CardTitle className="text-white">Pending Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="h-4 w-4 rounded border-[#252535] bg-[#252535] text-[#6C4DF6]" />
                                <label className="text-sm text-white">Complete Chapter 5 exercises</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" className="h-4 w-4 rounded border-[#252535] bg-[#252535] text-[#6C4DF6]" />
                                <label className="text-sm text-white">Review group flashcards</label>
                            </div>
                            <Button variant="outline" className="mt-2 w-full border-[#252535] text-white">
                                + Add Task
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1A1A25] border-[#252535]">
                    <CardHeader>
                        <CardTitle className="text-white">Quick Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#252535]">
                                <span className="mr-2">📚</span> Shared Notes
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#252535]">
                                <span className="mr-2">📝</span> Whiteboard Templates
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#252535]">
                                <span className="mr-2">🎓</span> Study Guides
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}