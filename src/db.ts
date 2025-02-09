import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DB_USER as string, 
  host: process.env.NEXT_PUBLIC_DB_HOST as string,
  database: process.env.NEXT_PUBLIC_DB_NAME as string,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD as string,
  port: Number(process.env.NEXT_PUBLIC_DB_PORT), 
});

export const query = async <T extends QueryResultRow=any>(text: string, params?: unknown[]): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};
