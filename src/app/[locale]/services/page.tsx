import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaFileInvoice, FaShippingFast, FaTools, FaTruck, FaPlane, FaShip } from 'react-icons/fa';

interface Subcategory {
  subtitle: string;
  details: string[];
}

interface Tarifa {
  title: string;
  details?: string[];
  subcategories?: Subcategory[];
  icon: JSX.Element;
}

export default function Services({
  params,
  searchParams,
}: {
  params: { locale: string };
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

  // Tarifas Jem Logistic
  const tarifasLogistic: Tarifa[] = [
    {
      title: t('tariffs.import.title'),
      details: [
        t('tariffs.import.detail1'),
        t('tariffs.import.detail2'),
        t('tariffs.import.detail3'),
      ],
      icon: <FaFileInvoice />,
    },
    {
      title: t('tariffs.export.title'),
      details: [
        t('tariffs.export.detail1'),
        t('tariffs.export.detail2'),
        t('tariffs.export.detail3'),
      ],
      icon: <FaShippingFast />,
    },
    {
      title: t('tariffs.special.title'),
      details: [
        t('tariffs.special.detail1'),
        t('tariffs.special.detail2'),
        t('tariffs.special.detail3'),
        t('tariffs.special.detail4'),
      ],
      icon: <FaTools />,
    },
  ];

  // Tarifas Jem Cargo
  const tarifasCargo: Tarifa[] = [
    {
      title: t('tariffs.maritime.title'),
      subcategories: [
        {
          subtitle: t('tariffs.maritime.fcl.title'),
          details: [
            t('tariffs.maritime.fcl.detail1'),
            t('tariffs.maritime.fcl.detail2'),
            t('tariffs.maritime.fcl.detail3'),
            t('tariffs.maritime.fcl.detail4'),
          ],
        },
        {
          subtitle: t('tariffs.maritime.lcl.title'),
          details: [
            t('tariffs.maritime.lcl.detail1'),
            t('tariffs.maritime.lcl.detail2'),
            t('tariffs.maritime.lcl.detail3'),
            t('tariffs.maritime.lcl.detail4'),
          ],
        },
      ],
      icon: <FaShip />,
    },
    {
      title: t('tariffs.air.title'),
      details: [
        t('tariffs.air.detail1'),
        t('tariffs.air.detail2'),
        t('tariffs.air.detail3'),
        t('tariffs.air.detail4'),
      ],
      icon: <FaPlane />,
    },
    {
      title: t('tariffs.land.title'),
      details: [
        t('tariffs.land.detail1'),
        t('tariffs.land.detail2'),
        t('tariffs.land.detail3'),
      ],
      icon: <FaTruck />,
    },
  ];

  const tarifas = selectedTab === 'jemLogistic' ? tarifasLogistic : tarifasCargo;

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

      {/* Sección de Tarifas */}
      <div className="mt-16">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8">{t('tariffs.title')}</h2>
        <div className="text-md text-center text-gray-500 mb-6 italic space-y-2">
          {selectedTab === 'jemLogistic' ? (
            <>
              <p>*{t('tariffs.note.logistic.dispatchTime')}</p>
              <p>*{t('tariffs.note.validity')}</p>
              <p>– {t('tariffs.note.noVAT')}</p>
              <p>– {t('tariffs.note.negotiable')}</p>
            </>
          ) : (
            <>
              <p>*{t('tariffs.note.cargo.serviceTime')}</p>
              <p>*{t('tariffs.note.validity')}</p>
              <p>– {t('tariffs.note.noVAT')}</p>
              <p>– {t('tariffs.note.negotiable')}</p>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tarifas.map((tarifa, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 text-4xl text-blue-600">{tarifa.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">{tarifa.title}</h3>
              {tarifa.subcategories ? (
                tarifa.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="mb-4">
                    <h4 className="text-lg font-medium text-gray-700 mb-2">{subcategory.subtitle}</h4>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {subcategory.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <ul className="list-disc text-gray-600 space-y-1">
                  {tarifa.details!.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
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
