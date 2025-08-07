import { Users } from '@/lib/entities/Users';
import { Role } from '@/lib/entities/Role';
import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import jwt from 'jsonwebtoken';

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
        const roleRepository = dataSource.getRepository(Role);
        const body = await req.json();

        if (!body.username || !body.password || !body.name) {
            return NextResponse.json(
                { message: 'Username, password, and name are required' }, 
                { status: 400 }
            );
        }

        const existing = await userRepository.findOne({ where: { username: body.username } });
        if (existing) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
       
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

        await roleRepository.save(newRole);
        const savedUser = await userRepository.save(preSavedUser);
        const token = jwt.sign(
            { 
                userId: savedUser.id, 
                username: savedUser.username,
                role: newRole.role 
            },
            process.env.JWT_SECRET!,
            { expiresIn: "60m" }
        );

        const { password, ...userWithoutPassword } = savedUser;

        return NextResponse.json(
            { 
                message: 'User created successfully',
                user: userWithoutPassword,
                token 
            }, 
            { status: 201 }
        );
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: err.message }, {status: 500});
    }
}
