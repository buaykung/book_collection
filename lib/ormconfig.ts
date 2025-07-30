import { DataSource } from 'typeorm';
import { Users } from './entities/Users';
import { Role } from './entities/Role';
import { Book } from './entities/Book';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',     
  password: 'buay1234', 
  database: 'postgres',  
  entities: [Users, Role, Book],
  // migrations: [`${__dirname}/migration/*.{ts,js}`],
  synchronize: true,
  logging: true
});