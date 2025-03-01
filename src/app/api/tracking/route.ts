import { NextRequest, NextResponse } from "next/server";
import { query } from "@/db";
import { authenticateRequest } from "@/lib/auth"; 

export async function GET(req: NextRequest) {
  try {
    const { user, response } = authenticateRequest(req);
    if (!user) return response!; 

    const arrivalDate = req.nextUrl.searchParams.get("arrival_date");

    if (!arrivalDate) {
      return NextResponse.json({ error: "Debe proporcionar un arrival_date" }, { status: 400 });
    }

    let result;
    let stepsResult;

    // Consultar tracking y sus pasos según el rol del usuario
    if (user.role === "admin") {
      result = await query(
        `SELECT * FROM tracking WHERE arrival_date = $1`,
        [arrivalDate]
      );
    } else {
      result = await query(
        `SELECT * FROM tracking WHERE arrival_date = $1 AND user_id = $2`,
        [arrivalDate, user.id]
      );
    }

    // Si no encontramos tracking, retornar un error
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Tracking no encontrado" }, { status: 404 });
    }

    // Obtener los pasos (tracking_steps) para cada tracking
    const tracking = result.rows[0];

    stepsResult = await query(
      `SELECT * FROM tracking_steps WHERE tracking_id = $1 ORDER BY step_order`,
      [tracking.id]
    );

    // Adjuntar los pasos al objeto de tracking
    tracking.steps = stepsResult.rows;

    // Retornar la respuesta con los datos del tracking y sus pasos
    return NextResponse.json(tracking, { status: 200 });

  } catch (error) {
    console.error("Error en GET /tracking:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = authenticateRequest(req);
    if (!user) return response!; 

    if (user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado para crear trackings" }, { status: 403 });
    }

    const { tracking_number, status, arrival_date, user_id, cargo_type, transport_mode } = await req.json();

    // 🔹 Verificar que todos los datos obligatorios están presentes
    if (!tracking_number || !status || !arrival_date || !user_id || !cargo_type || !transport_mode) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // 🔹 Validar que cargo_type y transport_mode sean valores correctos
    const validCargoTypes = ["FCL", "LCL"];
    const validTransportModes = ["maritimo", "aereo"];

    if (!validCargoTypes.includes(cargo_type)) {
      return NextResponse.json({ error: "Tipo de carga inválido. Debe ser 'FCL' o 'LCL'." }, { status: 400 });
    }
    if (!validTransportModes.includes(transport_mode)) {
      return NextResponse.json({ error: "Modo de transporte inválido. Debe ser 'maritimo' o 'aereo'." }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO tracking (tracking_number, status, arrival_date, user_id, cargo_type, transport_mode) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [tracking_number, status, arrival_date, user_id, cargo_type, transport_mode]
    );

    return NextResponse.json({ message: "Tracking creado exitosamente", tracking: result.rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
