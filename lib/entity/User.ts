import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity({name : 'users'})
export class User {
    @PrimaryGeneratedColumn({name : 'id'})
    id: number;

    @Column({name : 'username'})
    username: string;

    @Column({name : 'password'})
    password: string;
    
    @CreateDateColumn({name : 'created_at'})
    createdAt: Date;
    
    @UpdateDateColumn({name : 'updated_at'})
    updatedAt: Date;
    
    @DeleteDateColumn({name : 'deleted_at'})
    deletedAt: Date;

    @Column({name : 'created_by'})
    craetedBy: number;
    
    @Column({name : 'updated_by'})
    updatedBy: number;
    
}