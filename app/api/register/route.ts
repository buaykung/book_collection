import { Users } from '@/lib/entities/Users';
import { Role } from '@/lib/entities/Role';
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
        const { username } = await req.json();
        const userRepository = dataSource.getRepository(Users);
        const roleRepository = dataSource.getRepository(Role);
        const existing = await userRepository.findOne({ where: { username } });
        if (existing) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
        const body = await req.json();

        const newUser = {
            username: body.username,
            password: body.password,
            name: body.name
        };
        
        const preSavedUser = await userRepository.save(newUser);
        
        preSavedUser.createdBy = preSavedUser.id;

        const newRole = {
            name: preSavedUser.name,
            usersId: preSavedUser.id,
            role: "admin" as const
        };

        const savedRole = await roleRepository.save(newRole);

        preSavedUser.role = savedRole;

        const savedUser = await userRepository.save(preSavedUser);

        return NextResponse.json(savedUser);
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: err.message }, {status: 500});
    }
}
