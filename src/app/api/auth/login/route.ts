import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "@/db"; 

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 🔹 Buscar usuario en la base de datos
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const user = result.rows[0];

    // 🔹 Verificar la contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    // 🔹 Generar el token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // 🔹 Configurar la respuesta con la cookie del token
    const response = NextResponse.json({ message: "Autenticación exitosa" });
    response.cookies.set("token", token, { httpOnly: true, secure: true, maxAge: 3600 });

    return response;
  } catch (error) {
    console.error("Error en el login:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}


