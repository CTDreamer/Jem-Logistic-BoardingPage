import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'zh'], // Idiomas soportados
  defaultLocale: 'es', // Idioma predeterminado
});

export default function middleware(req: NextRequest) {
  const locale = req.nextUrl.pathname.split('/')[1]; // Extraer el idioma de la URL
  console.log('Detected language in middleware:', locale);

  // Redirigir si no hay un idioma válido
  if (!['en', 'es', 'zh'].includes(locale)) {
    const url = new URL(`/es${req.nextUrl.pathname}`, req.url);
    console.log('Redirecting to:', url.toString());
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en|es|zh)/:path*'], // Rutas soportadas
};


