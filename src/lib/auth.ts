import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse} from "next/server";

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string;

interface UserPayload extends JwtPayload {
  id: number;
  email: string;
  role: string;
}

export function getUserFromToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function authenticateRequest(req: NextRequest){
  let token = req.headers.get("Authorization")?.split(" ")[1];
  if(!token){
    token = req.cookies.get("token")?.value;
  }

  if(!token){
    return{user: null, response: NextResponse.json({error: "No autenticado"}, {status: 401})}
  }

  const user = getUserFromToken(token);
  if(!user || typeof user !== "object" || !user.id || !user.role){
    return { user: null, response: NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 }) };
  }

  return{user, response:null};
}