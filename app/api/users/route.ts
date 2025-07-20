import { AppDataSource } from '@/lib/ormconfig';
import { User } from '@/lib/entity/User';
import { NextResponse } from 'next/server';

export async function GET() {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    const user = await AppDataSource.getRepository(User).find()

    return NextResponse.json(user);
}