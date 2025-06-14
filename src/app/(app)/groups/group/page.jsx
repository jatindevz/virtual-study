'use client'

import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

const Group = () => {
    const [joinedGroups, setJoinedGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get('/api/user/groups') // must return user's joined groups
                setJoinedGroups(res.data.groups || [])
                if (res.data.groups.length > 0) {
                    setSelectedGroup(res.data.groups[0])
                }
            } catch (err) {
                console.error('Error fetching user groups:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchGroups()
    }, [])

    return (
        <div className="flex min-h-screen bg-[#0F0F15] text-white">
            {/* Sidebar */}
            <div className="w-[250px] border-r border-[#252535] bg-[#1A1A25] p-4">
                <h2 className="text-lg font-semibold mb-4">My Groups</h2>
                <ScrollArea className="h-[calc(100vh-80px)] pr-2">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 mb-2 rounded-md bg-[#252535]" />
                        ))
                        : joinedGroups.length > 0
                            ? joinedGroups.map((group) => (
                                <div
                                    key={group._id}
                                    onClick={() => setSelectedGroup(group)}
                                    className={`cursor-pointer p-2 rounded-md hover:bg-[#2a2a3d] ${selectedGroup?._id === group._id ? 'bg-[#6C4DF6]/20' : ''
                                        }`}
                                >
                                    {group.name}
                                </div>
                            ))
                            : <p className="text-sm text-gray-400">You haven’t joined any groups.</p>
                    }
                </ScrollArea>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {selectedGroup ? (
                    <Card className="bg-[#1A1A25] border border-[#252535] p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">{selectedGroup.name}</h2>
                        <p className="text-sm text-[#aaa] mb-4">{selectedGroup.description}</p>
                        <div className="text-xs text-[#6C4DF6]">
                            Tags: {selectedGroup.tags?.join(', ') || 'None'}
                        </div>
                        <div className="mt-4 text-sm">
                            <strong>Rules:</strong> <br /> {selectedGroup.rules || 'No rules provided.'}
                        </div>
                    </Card>
                ) : (
                    <p className="text-gray-400">Select a group to see details</p>
                )}
            </div>
        </div>
    )
}

export default Group
