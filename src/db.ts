import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', // Cambia esto
  host: 'localhost',
  database: 'contact_form', // Nombre de tu base de datos
  password: 'dwbr', // Cambia esto
  port: 5432, // Puerto predeterminado de PostgreSQL
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
