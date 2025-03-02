import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEXT_CONNECTION_STRING
});

export const query = async <T extends QueryResultRow = any>(text: string, params?: unknown[]): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};
