import { useTranslations } from 'next-intl';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

export default function About({ params }: { params: { locale: string } }) {
  const t = useTranslations('about'); // Namespace "about"
  const locale = params.locale; // Obtenemos el locale actual

  return (
    <div className="px-8 md:px-16 py-12 bg-gray-50">
      {/* Título Principal */}
      <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">
        {t('title')}
      </h1>

      {/* Introducción */}
      <div className="text-center mb-10">
        <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
          {t('intro')}
        </p>
      </div>

      {/* Contenedor de Secciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Misión */}
        <section className="bg-blue-50 shadow-md rounded-lg p-6 border-t-4 border-blue-500 hover:scale-105 transition-transform text-center">
          <div className="flex justify-center mb-4">
            <i className="fas fa-bullseye text-blue-600 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-blue-500 mb-3">
            {t('mission.title')}
          </h2>
          <p className="text-gray-600 font-medium">{t('mission.description')}</p>
        </section>

        {/* Visión */}
        <section className="bg-green-50 shadow-md rounded-lg p-6 border-t-4 border-green-500 hover:scale-105 transition-transform text-center">
          <div className="flex justify-center mb-4">
            <i className="fas fa-eye text-green-600 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-green-500 mb-3">
            {t('vision.title')}
          </h2>
          <p className="text-gray-600 font-medium">{t('vision.description')}</p>
        </section>

        {/* Alianzas Estratégicas */}
        <section className="bg-yellow-50 shadow-md rounded-lg p-6 border-t-4 border-yellow-500 hover:scale-105 transition-transform text-center">
          <div className="flex justify-center mb-4">
            <i className="fas fa-handshake text-yellow-600 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-3">
            {t('alliances.title')}
          </h2>
          <p className="text-gray-600 font-medium">{t('alliances.description')}</p>
        </section>
      </div>

      {/* Nuestra Historia */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md mt-12 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2 max-w-sm mx-auto">
          <img
            src="/nuestra-historia.jpg"
            alt={t('history.title')}
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            <i className="fas fa-history text-blue-600 mr-2"></i>{t('history.title')}
          </h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            {t('history.description')}
          </p>
        </div>
      </div>

      {/* Nuestra Red Global */}
      <div className="bg-green-50 p-6 rounded-lg shadow-md mt-12 flex flex-col-reverse md:flex-row items-center gap-6">
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            <i className="fas fa-globe text-green-600 mr-2"></i>{t('globalNetwork.title')}
          </h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            {t('globalNetwork.description')}
          </p>
        </div>
        <div className="md:w-1/2 max-w-sm mx-auto">
          <img
            src="/red-global.jpg"
            alt={t('globalNetwork.title')}
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-md text-center mt-12">
        <h3 className="text-2xl font-bold text-blue-600">
          <i className="fas fa-rocket text-blue-600 mr-2"></i>{t('cta.title')}
        </h3>
        <p className="text-gray-600 mt-4">
          {t('cta.description')}
        </p>
        <Link href={`/${locale}/services`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full mt-6 shadow-md transition-transform duration-300 transform hover:scale-105">
            {t('cta.button')}
          </button>
        </Link>
      </div>
    </div>
  );
}
