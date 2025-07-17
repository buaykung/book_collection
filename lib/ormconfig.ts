import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',     // <-- ใส่ user จริง
  password: 'buay1234', // <-- ใส่รหัสจริง
  database: 'postgres', // <-- ชื่อ database จริง
  synchronize: true,         // ให้สร้างตารางอัตโนมัติ (ใช้เฉพาะ dev)
  entities: [User],          // บอกว่า Entity ไหนจะใช้
});