import { AppDataSource } from "./ormconfig";

let isInitialized = false;

export const initializeDatabase = async () => {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log('Database connected successfully');
      isInitialized = true;
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }
  return AppDataSource;
};