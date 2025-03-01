import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DB_USER,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  database: process.env.NEXT_PUBLIC_DB_NAME, // Corregido aquí
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  port: parseInt(process.env.NEXT_PUBLIC_DB_PORT || '5432', 10), // Corregido la conversión de tipo
  connectionString: process.env.NEXT_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

export const query = async <T extends QueryResultRow = any>(text: string, params?: unknown[]): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};
