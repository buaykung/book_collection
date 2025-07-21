import { DataSource } from 'typeorm';
import { Users } from './entities/Users';
import { Role } from './entities/Role';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',     
  password: 'buay1234', 
  database: 'postgres', 
  migrationsRun: true, 
  entities: [Users, Role],  
});