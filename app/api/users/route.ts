import { AppDataSource } from '@/lib/ormconfig';
import { Users } from '@/lib/entities/Users';
import { NextResponse } from 'next/server';

export async function GET() {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    const user = await AppDataSource.getRepository(Users).find()

    return NextResponse.json(user);
}

export async function POST(req: Request) {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const body = await req.json();
    const newUser = new Users();
    newUser.username = body.username;
    newUser.password = body.password;

    const preSavedUser = await AppDataSource.getRepository(Users).save(newUser);
    
    preSavedUser.createdBy = body.id;

    const savedUser = await AppDataSource.getRepository(Users).save(preSavedUser);

    return NextResponse.json(savedUser);
}



