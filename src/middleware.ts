import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

const intlMiddleware = createMiddleware({
  locales: ["en", "es", "zh"], // Idiomas soportados
  defaultLocale: "es", // Idioma predeterminado
});

const SECRET_KEY = "miClaveSecretaSuperSegura"; // ⚠️ Usar variable de entorno en producción

export default function middleware(req: NextRequest) {
  const locale = req.nextUrl.pathname.split("/")[1]; // Extraer el idioma
  console.log("Detected language in middleware:", locale);

  // 🌍 Middleware de Internacionalización (next-intl)
  if (!["en", "es", "zh"].includes(locale)) {
    const url = new URL(`/es${req.nextUrl.pathname}`, req.url);
    console.log("Redirecting to:", url.toString());
    return NextResponse.redirect(url);
  }

  // 🔒 Middleware de Autenticación
  if (req.nextUrl.pathname.startsWith("/profile") || req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      req.headers.set("x-user-role", decoded.role);

      // 🔒 Si la ruta es "/admin", solo los admins pueden acceder
      if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
        return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
      }

      return intlMiddleware(req); // Continúa con la internacionalización
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return intlMiddleware(req); // Si no es ruta protegida, solo ejecuta internacionalización
}

export const config = {
  matcher: ["/", "/(en|es|zh)/:path*", "/profile", "/admin"], // Rutas protegidas
};
