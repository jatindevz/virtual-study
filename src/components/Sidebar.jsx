'use client'

import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'

const Sidebar = () => {
    const [joinedGroups, setJoinedGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
       
        const getGroups = async () => {
            try {
                const response = await axios.get("/api/groups");
                const groups = await response.data.groups;
                setJoinedGroups(groups)
                toast.success("Groups fetched successfully");
                console.log(groups);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };

        getGroups();
    }
        , []);
  return (
      <div>
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
      </div>
  )
}

export default Sidebar