import { NextResponse } from 'next/server';
import { query } from '@/db'; // Ajusta la ruta si tu archivo de conexión a la base de datos está en otro lugar

// Manejo del método POST para el libro de reclamaciones
export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parsear el cuerpo de la solicitud
    const {
      nombre,
      apellidos,
      direccion,
      telefono,
      dni,
      correo,
      bien,
      detalleBien,
      tipoReclamo,
      detalleReclamo,
      acciones,
    } = body;

    // Verificar que todos los campos requeridos estén presentes
    if (
      !nombre ||
      !apellidos ||
      !direccion ||
      !telefono ||
      !dni ||
      !correo ||
      !bien ||
      !detalleBien ||
      !tipoReclamo ||
      !detalleReclamo ||
      !acciones
    ) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    // Consulta para insertar los datos en la base de datos
    await query(
      `
      INSERT INTO claims 
      (nombre, apellidos, direccion, telefono, dni, correo, bien, detalle_bien, tipo_reclamo, detalle_reclamo, acciones) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `,
      [
        nombre,
        apellidos,
        direccion,
        telefono,
        dni,
        correo,
        bien,
        detalleBien,
        tipoReclamo,
        detalleReclamo,
        acciones,
      ]
    );

    // Responder con éxito
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al guardar los datos del libro de reclamaciones:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
