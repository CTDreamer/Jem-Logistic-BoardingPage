import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Solo soportar inglés, español y chino
export const locales = ['en', 'es', 'zh']
export default getRequestConfig(async ({ locale }) => {
  // Validar que el parámetro `locale` sea válido
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
