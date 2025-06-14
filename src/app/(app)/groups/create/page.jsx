'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from "@/components/ui/checkbox"
import axios from 'axios'

export default function CreateGroupForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await axios.post('/api/groups/create', {
                ...data,
                tags: data.tags.split(',').map(tag => tag.trim()),
              
            })

            router.push('/groups')
        } catch (err) {
            console.error(err)
            alert(err.response?.data?.message || 'Failed to create group')
        }
    }

    return (
        <div className="min-h-screen bg-[#0F0F15] p-6">
            <div className="max-w-2xl mx-auto bg-[#1A1A25] rounded-xl p-8 border border-[#252535] shadow-lg shadow-[#6C4DF6]/10">
                <h1 className="text-2xl font-bold mb-6 text-white">
                    <span className="bg-gradient-to-r from-[#6C4DF6] to-[#00F0FF] bg-clip-text text-transparent">
                        Create Study Group
                    </span>
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-[#E0E0E0]">Group Name</Label>
                        <Input
                            id="name"
                            {...register('name', { required: 'Group name is required' })}
                            placeholder="e.g., Web Dev Learners"
                            className="bg-[#252535] border-[#252535] text-white placeholder-[#555] focus-visible:ring-[#6C4DF6]"
                        />
                        {errors.name && (
                            <p className="text-sm text-[#FF6B6B]">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-[#E0E0E0]">Description</Label>
                        <Textarea
                            id="description"
                            {...register('description')}
                            placeholder="Brief description about the group"
                            className="bg-[#252535] border-[#252535] text-white placeholder-[#555] focus-visible:ring-[#6C4DF6] min-h-[100px]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="institution" className="text-[#E0E0E0]">Institution</Label>
                        <Input
                            id="institution"
                            {...register('institution')}
                            placeholder="Your college or organization"
                            className="bg-[#252535] border-[#252535] text-white placeholder-[#555] focus-visible:ring-[#6C4DF6]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tags" className="text-[#E0E0E0]">Tags (comma separated)</Label>
                        <Input
                            id="tags"
                            {...register('tags')}
                            placeholder="React, Node.js, MongoDB"
                            className="bg-[#252535] border-[#252535] text-white placeholder-[#555] focus-visible:ring-[#6C4DF6]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="rules" className="text-[#E0E0E0]">Group Rules</Label>
                        <Textarea
                            id="rules"
                            {...register('rules')}
                            placeholder="e.g., Be respectful, share useful resources..."
                            className="bg-[#252535] border-[#252535] text-white placeholder-[#555] focus-visible:ring-[#6C4DF6] min-h-[100px]"
                        />
                    </div>

                    {/* <div className="flex items-center gap-3">
                        <Checkbox
                            id="isPrivate"
                            {...register('isPrivate')}
                            className="border-[#252535] data-[state=checked]:bg-[#6C4DF6]"
                        />
                        <Label htmlFor="isPrivate" className="text-[#E0E0E0]">Make this group private</Label>
                    </div> */}

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#6C4DF6] hover:bg-[#6C4DF6]/90 hover:shadow-[0_0_15px_#6C4DF6/50] transition-all"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Group'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}