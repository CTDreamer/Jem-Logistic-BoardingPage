import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/db';
import { authenticateRequest } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const stepId = parseInt(params.id, 10);
    if (isNaN(stepId)) {
      return NextResponse.json(
        { error: 'ID de step inválido' },
        { status: 400 }
      );
    }

    // Validar autenticación y rol del usuario
    const { user, response } = authenticateRequest(req);
    if (!user) return response;

    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado para modificar este tracking step' },
        { status: 403 }
      );
    }

    // Parsear el JSON del body
    const { data, completed, step_name, step_order } = await req.json();

    // Validar campos opcionales
    const fieldsToUpdate = [];
    const values = [];
    let index = 1;

    if (data !== undefined) {
      if (typeof data !== 'object' || data === null) {
        return NextResponse.json(
          { error: 'El campo data debe ser un objeto JSON válido' },
          { status: 400 }
        );
      }
      fieldsToUpdate.push(`data = $${index++}::jsonb`);
      values.push(JSON.stringify(data));
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return NextResponse.json(
          { error: 'El campo completed debe ser un booleano' },
          { status: 400 }
        );
      }
      fieldsToUpdate.push(`completed = $${index++}`);
      values.push(completed);
    }

    if (step_name !== undefined) {
      if (typeof step_name !== 'string') {
        return NextResponse.json(
          { error: 'El campo step_name debe ser una cadena de texto' },
          { status: 400 }
        );
      }
      fieldsToUpdate.push(`step_name = $${index++}`);
      values.push(step_name);
    }

    if (step_order !== undefined) {
      if (typeof step_order !== 'number' || step_order < 0) {
        return NextResponse.json(
          { error: 'El campo step_order debe ser un número positivo' },
          { status: 400 }
        );
      }
      fieldsToUpdate.push(`step_order = $${index++}`);
      values.push(step_order);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron campos para actualizar' },
        { status: 400 }
      );
    }

    // Construir y ejecutar la consulta SQL
    values.push(stepId);
    const updateQuery = `
      UPDATE tracking_steps
      SET ${fieldsToUpdate.join(', ')}
      WHERE id = $${index}
      RETURNING *
    `;

    const result = await query(updateQuery, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'No se encontró el tracking_step o no se pudo actualizar' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Tracking step actualizado exitosamente',
        tracking_step: result.rows[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en PATCH /tracking-steps/[id]:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Autenticar la solicitud
    const { user, response } = authenticateRequest(req);
    if (!user) return response;

    if (user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado para agregar pasos" }, { status: 403 });
    }

    const { step_name, data } = await req.json();
    const tracking_number = params.id;  // Usamos el parámetro `id` de la URL

    // Validación del paso
    const validStepNames = [
      "Direccionamiento",
      "Operaciones",
      "Retiro",
      "Proceso de Devolucion",  // Asegúrate de que sea sin tilde
      "Facturacion"
    ];

    if (!validStepNames.includes(step_name)) {
      return NextResponse.json({ error: "Paso inválido" }, { status: 400 });
    }

    // Buscar el tracking_id a partir del tracking_number
    const trackingQuery = `SELECT id FROM tracking WHERE tracking_number = $1`;
    const trackingResult = await query(trackingQuery, [tracking_number]);

    if (trackingResult.rows.length === 0) {
      return NextResponse.json({ error: "Tracking no encontrado" }, { status: 404 });
    }

    // Obtener el tracking_id
    const tracking_id = trackingResult.rows[0].id;

    // Verificar si el paso ya ha sido creado para este tracking_id y step_name
    const checkExistingStepQuery = `
      SELECT * FROM tracking_steps 
      WHERE tracking_id = $1 AND step_name = $2
    `;
    const existingStep = await query(checkExistingStepQuery, [tracking_id, step_name]);

    if (existingStep.rows.length > 0) {
      return NextResponse.json({ error: "Este paso ya fue creado para este tracking" }, { status: 400 });
    }

    // Obtener el último step_order para este tracking_id
    const lastStepQuery = `SELECT MAX(step_order) FROM tracking_steps WHERE tracking_id = $1`;
    const lastStepResult = await query(lastStepQuery, [tracking_id]);
    const nextStepOrder = (lastStepResult.rows[0].max || 0) + 1;

    // Crear el paso en la base de datos y marcarlo como completed: true
    const result = await query(
      `INSERT INTO tracking_steps (tracking_id, step_name, data, step_order, completed) 
       VALUES ($1, $2, $3, $4, true) RETURNING *`,
      [tracking_id, step_name, JSON.stringify(data), nextStepOrder]
    );

    return NextResponse.json({ message: "Paso agregado exitosamente", tracking_step: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
