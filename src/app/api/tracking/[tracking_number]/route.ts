import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";
import { authenticateRequest } from "@/lib/auth"; 

export async function GET(req: NextRequest, { params }: { params: { tracking_number: string } }) {
  const trackingNumber = params.tracking_number; // Ahora obtenemos el tracking_number desde la URL

  console.log("Recibiendo parámetros:", { trackingNumber });

  try {
    let queryText = "SELECT * FROM tracking WHERE tracking_number = $1"; // Consulta por tracking_number
    const result = await query(queryText, [trackingNumber]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Tracking no encontrado" }, { status: 404 });
    }

    const tracking = result.rows[0];
    const stepsResult = await query(
      "SELECT * FROM tracking_steps WHERE tracking_id = $1 ORDER BY step_order",
      [tracking.id]
    );

    tracking.steps = stepsResult.rows;

    return NextResponse.json(tracking, { status: 200 });
  } catch (error) {
    console.error("Error en GET /tracking/:tracking_number:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

/** PATCH: Editar un tracking existente */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { tracking_number: string } }
) {
  try {
    // Autenticación
    const { user, response } = authenticateRequest(req);
    if (!user) return response!;

    // Solo admin puede editar
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado para editar este tracking" },
        { status: 403 }
      );
    }

    const trackingNumber = params.tracking_number;
    const body = await req.json();

    // Campos que se pueden editar
    const { status, cargo_type, transport_mode } = body;

    // Construir consulta dinámica
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (status) {
      fieldsToUpdate.push(`status = $${index++}`);
      values.push(status);
    }
    if (cargo_type) {
      fieldsToUpdate.push(`cargo_type = $${index++}`);
      values.push(cargo_type);
    }
    if (transport_mode) {
      fieldsToUpdate.push(`transport_mode = $${index++}`);
      values.push(transport_mode);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json(
        { error: "No se proporcionaron campos para actualizar" },
        { status: 400 }
      );
    }

    // Verificar que el tracking existe
    const check = await query(
      "SELECT id FROM tracking WHERE tracking_number = $1",
      [trackingNumber]
    );
    if (check.rows.length === 0) {
      return NextResponse.json(
        { error: "Tracking no encontrado" },
        { status: 404 }
      );
    }
    const trackingId = check.rows[0].id;

    // Actualizar
    values.push(trackingNumber); // Se agrega al final para la cláusula WHERE
    const updateQuery = `
      UPDATE tracking
      SET ${fieldsToUpdate.join(", ")}
      WHERE tracking_number = $${index}
      RETURNING *
    `;
    const result = await query(updateQuery, values);

    return NextResponse.json(
      { message: "Tracking actualizado", tracking: result.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en PATCH /tracking/:tracking_number:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/** DELETE: Eliminar un tracking */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { tracking_number: string } }
) {
  try {
    // Autenticación
    const { user, response } = authenticateRequest(req);
    if (!user) return response!;

    // Solo admin puede eliminar
    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado para eliminar este tracking" },
        { status: 403 }
      );
    }

    const trackingNumber = params.tracking_number;

    // Verificar que el tracking existe
    const check = await query(
      "SELECT id FROM tracking WHERE tracking_number = $1",
      [trackingNumber]
    );
    if (check.rows.length === 0) {
      return NextResponse.json(
        { error: "Tracking no encontrado" },
        { status: 404 }
      );
    }
    const trackingId = check.rows[0].id;

    // Eliminar
    // Nota: si tu base de datos tiene FK con ON DELETE CASCADE en tracking_steps,
    // se eliminarán los pasos automáticamente
    await query("DELETE FROM tracking WHERE id = $1", [trackingId]);

    return NextResponse.json(
      { message: "Tracking eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en DELETE /tracking/:tracking_number:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}