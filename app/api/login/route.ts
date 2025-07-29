import { Users } from '@/lib/entities/Users';
import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req : Request) {
    try {
        const { username, password } = await req.json();
        const dataSource = await initializeDatabase();
        const userRepository = dataSource.getRepository(Users);
        const user = await userRepository.findOne({where: {username}});
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 401 });
        }
        // const valid = await bcrypt.compare(password, user.password)
        if (password !== user.password){
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }
        
        const token = jwt.sign(
            {id: user.id, username:user.username}, process.env.JWT_SECRET!,
            { expiresIn: 60 }
        );
        return NextResponse.json({ token , user });
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: err.message }, {status: 500});
    }
}