import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout exitoso" });
  response.cookies.set("token", "", { expires: new Date(0) }); // Elimina la cookie

  return response;
}
