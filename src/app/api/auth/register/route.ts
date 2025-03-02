import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {query} from "@/db";

export async function POST(req:Request) {
    console.log(await query);
    try{
        const{email, password, role} = await req.json();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Formato de email inválido" }, { status: 400 });
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
            return NextResponse.json({ 
            error: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número" 
            }, { status: 400 });
        }
        const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
        return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const validRoles = ["user", "admin"];
        const assignedRole = validRoles.includes(role) ? role : "user";

        await query(
            "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
            [email, hashedPassword, assignedRole]
        );
      
        return NextResponse.json({ message: "Usuario registrado con éxito" });
    }catch(error){
        if(error instanceof Error){
            console.log(error.message);
        }
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}