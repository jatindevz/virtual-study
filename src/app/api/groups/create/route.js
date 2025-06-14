import { NextResponse } from 'next/server'
import  dbConnect  from '@/server/lib/database'
import { StudyGroup } from '@/server/models/studyGroup.model'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/option' // if using next-auth

export async function POST(req) {
    try {
        const body = await req.json()
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()

        const group = await StudyGroup.create({
            name: body.name,
            description: body.description,
            tags: body.tags,
            rules : body.rules,
            isPrivate: body.isPrivate || false,
            createdBy: session.user._id, // or `session.user.id` depending on your session model
            createdAt: new Date(),
        })

        return NextResponse.json({ message: 'Group created', group }, { status: 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Failed to create group' }, { status: 500 })
    }
}



export async function GET(req) {
    try {
        await dbConnect()

        const searchParams = new URL(req.url).searchParams
        const search = searchParams.get('search') || ''

        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { tags: { $regex: search, $options: 'i' } },
                ]
            }
            : {}

        const groups = await StudyGroup.find(query).limit(10).sort({ createdAt: -1 })
        return NextResponse.json({ groups })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: 'Error fetching groups' }, { status: 500 })
    }
}
