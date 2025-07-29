import { Users } from '@/lib/entities/Users';
import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/database';

export async function GET() {
    try {
        const dataSource = await initializeDatabase();
        const userRepository = dataSource.getRepository(Users);
        const user = await userRepository.find();
        return NextResponse.json(user);
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: err.message }, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        const dataSource = await initializeDatabase();
        const userRepository = dataSource.getRepository(Users);
        const body = await req.json();
        const newUser = new Users();
        newUser.username = body.username;
        newUser.password = body.password;

        const preSavedUser = await userRepository.save(newUser);
        
        preSavedUser.createdBy = preSavedUser.id;

        const savedUser = await userRepository.save(preSavedUser);

        return NextResponse.json(savedUser);
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: err.message }, {status: 500});
    }
}
