import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string; 

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("🔑 Token recibido en /verify:", token); // 👀 Verifica el token

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("👤 Usuario decodificado:", decoded); // 👀 Verifica el usuario
    return NextResponse.json({ authenticated: true, user: decoded });
  } catch (error) {
    console.error("❌ Error al verificar token:", error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
