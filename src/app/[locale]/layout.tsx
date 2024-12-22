import { ThemeProvider } from '@/src/app/[locale]/components/ThemeProvider';
import type { Metadata } from 'next';
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useMessages
} from 'next-intl';
import { Inter, Rubik, Space_Grotesk } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import 'react-toastify/dist/ReactToastify.css'; // Importación de estilos para react-toastify
import { ToastContainer } from 'react-toastify';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter'
});
const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Jem Logistic',
  description: 'Find the best logistics solutions with Jem Logistic.'
};

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Mensajes para la internacionalización
  const messages = useMessages();

  // Dirección del idioma (LTR o RTL)
  const isRTL = locale === 'ar' || locale === 'fa';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${spaceGrotesk.variable} ${rubik.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        {/* Proveedor del tema */}
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="light"
          themes={[
            'light',
            'dark',
            'instagram',
            'facebook',
            'discord',
            'netflix',
            'twilight',
            'reddit'
          ]}
        >
          {/* Proveedor de internacionalización */}
          <NextIntlClientProvider
            locale={locale}
            messages={messages as AbstractIntlMessages}
          >
            {/* Contenedor de notificaciones */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={isRTL}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />

            {/* Indicador de carga superior */}
            <NextTopLoader
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              color="var(--primary)"
              showSpinner={false}
            />

            {/* Encabezado */}
            <Header locale={locale} />

            {/* Contenido principal */}
            <main className="mx-auto max-w-screen-2xl px-4 md:px-8">
              {children}
            </main>

            {/* Pie de página */}
            <Footer />

            {/* Botón flotante de WhatsApp */}
            <WhatsAppButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
