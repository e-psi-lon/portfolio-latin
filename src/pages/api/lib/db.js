import { neon } from '@neondatabase/serverless';

let sql;

export function getDb() {
  if (!sql) {
    const databaseUrl = process.env.STORAGE_DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    sql = neon(databaseUrl);
  }
  return sql;
}

