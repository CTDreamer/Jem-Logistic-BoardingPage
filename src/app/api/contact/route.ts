import { NextResponse } from 'next/server';
import { query } from '@/db'; // Asegúrate de que la ruta al archivo de conexión es correcta

// Manejo del método POST
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parsear el cuerpo de la solicitud
    const { name, email, phone, message } = body;

    // Verificar que los datos requeridos estén presentes
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    // Consulta para insertar los datos en la base de datos
    await query(
      'INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4)',
      [name, email, phone, message]
    );

    // Responder con éxito
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
