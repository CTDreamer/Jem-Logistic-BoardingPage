import { useTranslations } from 'next-intl';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function About() {
  const t = useTranslations('about'); // Namespace "about"

  return (
    <div className="px-8 md:px-20 py-16 bg-gray-50">
      {/* Título Principal */}
      <h1 className="text-5xl font-bold text-center text-blue-600 mb-12">
        {t('title')}
      </h1>

      {/* Contenedor de Secciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Misión */}
        <section className="bg-white shadow-lg rounded-lg p-8 border-t-4 border-blue-500 hover:scale-105 transition-transform text-center">
          <div className="flex justify-center mb-4">
            <i className="fas fa-bullseye text-blue-600 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            {t('mission.title')}
          </h2>
          <p className="text-gray-700">{t('mission.description')}</p>
        </section>

        {/* Visión */}
        <section className="bg-white shadow-lg rounded-lg p-8 border-t-4 border-green-500 hover:scale-105 transition-transform text-center">
          <div className="flex justify-center mb-4">
            <i className="fas fa-eye text-green-600 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-green-500 mb-4">
            {t('vision.title')}
          </h2>
          <p className="text-gray-700">{t('vision.description')}</p>
        </section>

        {/* Alianzas Estratégicas */}
        <section className="bg-white shadow-lg rounded-lg p-8 border-t-4 border-yellow-500 hover:scale-105 transition-transform text-center">
          <div className="flex justify-center mb-4">
            <i className="fas fa-handshake text-yellow-600 text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            {t('alliances.title')}
          </h2>
          <p className="text-gray-700">{t('alliances.description')}</p>
        </section>
      </div>
    </div>
  );
}
