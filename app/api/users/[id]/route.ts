import { AppDataSource } from '@/lib/ormconfig';
import { Users } from '@/lib/entities/Users';
import { NextResponse } from 'next/server';

export async function GET(req : Request, {params} : {params :{ id : number }}) {
    try{
        if(!AppDataSource.isInitialized){
            await AppDataSource.initialize();
        }
    
        const user = await AppDataSource.getRepository(Users).findOneBy( {id : params.id} )

        if(!user){
            return NextResponse.json({ message: "User not found"},{status : 404})
        }
    
        return NextResponse.json(user);
    }catch(error) {
        const err = error as Error;
        console.error("Error fetching user:", err)
        return NextResponse.json({ message: err.message }, {status: 500})
    }
}

export async function PUT(req: Request, {params} : {params :{ id : number }}) {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    
        const body = await req.json();
        const oldUser = await AppDataSource.getRepository(Users).findOneBy( {id : params.id} );
        
        if (!oldUser){
            return NextResponse.json({ message: "User not found"},{status : 404});
        }else{
            oldUser.username = body.username;
        }
        const updatedUser = await AppDataSource.getRepository(Users).save(oldUser);
         
        return NextResponse.json(updatedUser);
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: err.message }, {status: 500});
    }
}

export async function DELETE(req: Request, {params} : {params :{ id : number }}) {
    try {

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const body = await req.json();
        const oldUser = await AppDataSource.getRepository(Users).findOneBy( {id : params.id} );

        if (!oldUser){
            return NextResponse.json({ message: "User not found"},{status : 404});
        }
        oldUser.deletedAt = new Date(body.deleted_at);
        await AppDataSource.getRepository(Users).save(oldUser);
        return NextResponse.json(
            { message: 'User Deleted successfully'},
            { status: 200}
        )
    } catch (error) {
        const err = error as Error;
        console.error("Error fetching user:", err);
        return NextResponse.json({ message: err.message }, {status: 500});
    }
}