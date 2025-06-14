//src/app/api/groups/join/route.js

import { NextResponse } from 'next/server'
import dbConnect from '@/server/lib/database'
import { StudyGroup } from '@/server/models/studyGroup.model'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/option' // if using next-auth
import User from '@/server/models/user.model'
import { GroupMember } from '@/server/models/groupMember.model'


export async function POST(req) {
    try {
        const session = await getServerSession(authOptions)
        const { groupId } = await req.json()

        if (!session || !session.user) {
            console.log("Unauthorized");
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()

        const group = await StudyGroup.findById(groupId)
        const user = await User.findById(session.user._id)

        if (!group || !user) {
            return NextResponse.json({ message: 'Group or user not found' }, { status: 404 })
        }

        // Check if user is already a member of the group
        const existingMember = await GroupMember.findOne({ groupId: group._id, userId: user._id })
        if (existingMember) {
            console.log("User is already a member of the group");
            return NextResponse.json({ message: 'User is already a member of the group' }, { status: 400 })
        }

        // Add user to the group
        const newMember = await GroupMember.create({
            groupId: group._id,
            userId: user._id,
            role: 'member', // or any other role you want to assign
        })

        // Add group to the user's groups
        user.joinedGroups.push(group._id)
        await user.save()
       

        return NextResponse.json({ message: 'Group joined successfully', newMember }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Failed to join group' }, { status: 500 })
    }
}
