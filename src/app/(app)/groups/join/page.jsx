'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { toast } from 'sonner'

const JoinGroup = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/api/groups/create?search=${searchTerm}`)
                setGroups(res.data.groups || [])
            } catch (err) {
                console.error('Failed to fetch groups:', err)
            }
            setLoading(false)
        }

        const delayDebounce = setTimeout(() => {
            fetchGroups()
        }, 500) // debounce search

        return () => clearTimeout(delayDebounce)
    }, [searchTerm])

    const handleJoinGroup = async (groupId) => {

        if (!groupId || typeof(groupId) !== 'string') {
            toast.error('Invalid group ID'+ typeof(groupId))
            return
        }

        try {
            const res = await axios.post('/api/groups/join', { groupId })
            toast.success(res.data.message)
        } catch (err) {
            console.error('Failed to join group:', err)
            toast.error('Failed to join group')
        }
    }

    return (
        <div className="min-h-screen bg-[#0F0F15] p-6">
            <div className="max-w-3xl mx-auto">
                <Label htmlFor="search" className="text-white mb-2 block">Search Study Groups</Label>
                <Input
                    id="search"
                    placeholder="Search by name or tags..."
                    className="bg-[#1A1A25] text-white border-[#252535] mb-6"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="grid gap-4">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 rounded-xl bg-[#1A1A25]" />
                        ))
                        : groups.length > 0
                            ? groups.map(group => (
                                <Card key={group._id} className="bg-[#1A1A25] border border-[#252535] text-white">
                                    <div className=' flex justify-around items-center'>
                                    <CardContent className="p-2 ">
                                        <h2 className="text-xl font-semibold">{group.name}</h2>
                                        <p className="text-sm text-[#aaa]">{group.description}</p>
                                        <div className="text-xs text-[#6C4DF6] mt-2">
                                            {group.tags?.join(', ')}
                                            </div>
                                            <p>Created by: {group.createdBy?.name}</p>
                                            <p>{group._id }</p>
                                    </CardContent>
                                        <Button className="bg-[#6C4DF6] hover:bg-[#6C4DF6]/90 cursor-pointer" onClick={() => handleJoinGroup(group._id)} >Join</Button>
                                </div>
                                </Card>

                            ))
                            : <p className="text-gray-400">No groups found.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default JoinGroup
