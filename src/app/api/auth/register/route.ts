import { NextResponse } from 'next/server';
import dbConnect from '@/server/lib/database';
import User from '@/server/models/user.model';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already in use");
            return NextResponse.json(
                { error: 'Email already in use' },
                { status: 400 }
            );
        }

        // Create new user
        const user = new User({
            name,
            email,
            passwordHash: password, // This will be hashed by the pre-save hook
        });

        await user.save();

        return NextResponse.json(
            { message: 'User created successfully', user },
            { status: 201 }
        );
    } catch (error) {
        console.log(" Register POST ", error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        )
    }
}

export async function GET() {
    await dbConnect();

    try {
        const users = await User.find({}).select('-passwordHash');
        return NextResponse.json(users);
    } catch (error) {
        console.log(" Register GET ", error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}