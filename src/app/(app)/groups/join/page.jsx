'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

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
                                    <CardContent className="p-4">
                                        <h2 className="text-lg font-semibold">{group.name}</h2>
                                        <p className="text-sm text-[#aaa]">{group.description}</p>
                                        <div className="text-xs text-[#6C4DF6] mt-2">
                                            {group.tags?.join(', ')}
                                        </div>
                                    </CardContent>
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
