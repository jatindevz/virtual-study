'use client'

import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
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
