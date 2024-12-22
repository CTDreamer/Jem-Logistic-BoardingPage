import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales } from './i18n'; // Importar la lista de locales permitidos desde i18n.ts

// Middleware personalizado para logs adicionales (opcional)
const customMiddleware = async (req: NextRequest): Promise<NextRequest> => {
  console.log('Custom middleware executed before next-intl');
  console.log('Request URL:', req.url); // Log para depurar la URL de la solicitud
  return req;
};

// Crear middleware de internacionalización
const intlMiddleware = createMiddleware({
  locales, // Idiomas soportados ['en', 'es', 'zh']
  defaultLocale: 'en', // Idioma predeterminado
});

// Middleware principal
export default async function middleware(
  req: NextRequest
): Promise<ReturnType<typeof intlMiddleware>> {
  await customMiddleware(req); // Ejecutar middleware personalizado antes del middleware de internacionalización
  return intlMiddleware(req); // Pasar al middleware de internacionalización
}

// Configuración del matcher para soportar solo los idiomas definidos
export const config = {
  matcher: ['/', '/(en|es|zh)/:path*'], // Solo permitir rutas para inglés, español y chino
};
