import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let dbInstance = null;

export const connectDB = async () => {
  try {
    dbInstance = await open({
      filename: path.join(__dirname, '../../database.sqlite'),
      driver: sqlite3.Database
    });
    console.log('Connected to local SQLite database.');
    return dbInstance;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export function getDB() {
  return dbInstance;
}