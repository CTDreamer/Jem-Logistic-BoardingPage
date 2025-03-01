import { createClient } from '@supabase/supabase-js';
import { QueryResult, QueryResultRow, FieldDef } from 'pg';

// Inicializa Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para realizar consultas
export const query = async <T extends QueryResultRow = any, F extends FieldDef = any>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T, F>> => {
  try {
    // Llama a la función RPC con el nombre y los parámetros
    const { data, error } = await supabase.rpc(text, { params: params || [] });

    if (error) {
      throw error; // Lanza el error si hay problemas con la consulta
    }

    // Adapta la respuesta de Supabase al formato de QueryResult de pg
    return {
      rows: data as T[],               // Los datos obtenidos de la consulta
      rowCount: (data as T[]).length,  // El conteo de las filas devueltas
      fields: [] as F[],               // Los campos no están disponibles, por lo que los dejamos vacíos
      command: 'SELECT',               // Añadimos un valor predeterminado para 'command'
      oid: 0                           // Añadimos un valor predeterminado para 'oid'
    };
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Relanza el error para manejarlo en el código que llama a esta función
  }
};