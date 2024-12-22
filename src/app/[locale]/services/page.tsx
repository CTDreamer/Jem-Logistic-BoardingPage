import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Services({
  params,
  searchParams,
}: {
  params: { locale: string }; // Cambiado a `locale`
  searchParams: { tab?: string };
}) {
  const t = useTranslations('services');
  const selectedTab = searchParams.tab || 'jemLogistic';

  // Usamos el locale del parámetro dinámico
  const locale = params.locale;

  // Estilo de fondo por pestaña
  const tabBackgrounds: Record<string, string> = {
    jemLogistic: 'bg-gradient-to-b from-blue-50 to-gray-100',
    jemCargo: 'bg-gradient-to-b from-green-50 to-gray-100',
  };

  return (
    <section className={`px-8 py-16 ${tabBackgrounds[selectedTab]} transition-colors duration-500`}>
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 animate-fade-in">
          {t('header.title')}
        </h1>
        <p className="text-lg text-gray-600 animate-fade-in-delay">{t('header.subtitle')}</p>
      </div>

      {/* Barra de navegación */}
      <div className="flex justify-center mb-8">
        <Link
          href={`/${locale}/services?tab=jemLogistic`}
          className={`px-6 py-2 font-bold rounded-lg transition-all ${
            selectedTab === 'jemLogistic'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          Jem Logistic
        </Link>
        <Link
          href={`/${locale}/services?tab=jemCargo`}
          className={`ml-4 px-6 py-2 font-bold rounded-lg transition-all ${
            selectedTab === 'jemCargo'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          Jem Cargo
        </Link>
      </div>

      {/* Contenedor de servicios */}
      <div
        className={`grid gap-8 ${
          selectedTab === 'jemCargo' ? 'grid-cols-1 place-items-center' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {selectedTab === 'jemLogistic' && (
          <>
            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 animate-slide-up">
              <img
                src="/agenciamiento-aduana.jpg"
                alt={t('services.customs.title')}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col justify-between flex-grow p-6 text-center">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{t('services.customs.title')}</h2>
                <p className="text-gray-600">{t('services.customs.description')}</p>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 animate-slide-up">
              <img
                src="/fletes-internacionales.jpg"
                alt={t('services.freight.title')}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col justify-between flex-grow p-6 text-center">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{t('services.freight.title')}</h2>
                <p className="text-gray-600">{t('services.freight.description')}</p>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 animate-slide-up">
              <img
                src="/asesoria-comercio.jpg"
                alt={t('services.consulting.title')}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col justify-between flex-grow p-6 text-center">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{t('services.consulting.title')}</h2>
                <p className="text-gray-600">{t('services.consulting.description')}</p>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'jemCargo' && (
          <>
            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 animate-slide-up">
              <img
                src="/transporte-carga.jpg"
                alt={t('services.transport.title')}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col justify-between flex-grow p-6 text-center">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{t('services.transport.title')}</h2>
                <p className="text-gray-600">{t('services.transport.description')}</p>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 animate-slide-up">
              <img
                src="/embaladora-destino.jpg"
                alt={t('services.packaging.title')}
                className="w-full h-56 object-cover"
              />
              <div className="flex flex-col justify-between flex-grow p-6 text-center">
                <h2 className="text-xl font-bold text-blue-600 mb-2">{t('services.packaging.title')}</h2>
                <p className="text-gray-600">{t('services.packaging.description')}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Botón de acción rápida */}
      <div className="text-center mt-12 animate-fade-in">
        <Link
          href={`/${locale}/contact`}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-110 flex items-center justify-center space-x-2"
        >
          <span>📞</span>
          <span>{t('cta.button')}</span>
        </Link>
      </div>
    </section>
  );
}
