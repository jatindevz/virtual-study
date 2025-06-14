//fetch joini groups from user

import { NextResponse } from 'next/server'
import dbConnect from '@/server/lib/database'
import { StudyGroup } from '@/server/models/studyGroup.model'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/option' // if using next-auth
import User from '@/server/models/user.model'
import GroupMember from '@/server/models/groupMember.model'

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions)
        await dbConnect()
        const user = await User.findById(session.user._id).populate('joinedGroups')
        const groups = user.joinedGroups
        return NextResponse.json({ message: 'Groups fetched', groups: groups }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Failed to fetch groups' }, { status: 500 })
    }
}