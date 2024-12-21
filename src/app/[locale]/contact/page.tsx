import { useTranslations } from 'next-intl';
import Button from '../components/Button';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-md mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
          {t('title')}
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          {t('description')}
        </p>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              {t('form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              {t('form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-medium text-gray-700"
            >
              {t('form.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu teléfono"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-700"
            >
              {t('form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <Button type="submit" rounded size="large">
              {t('form.submit')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
