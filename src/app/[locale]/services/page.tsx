import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services'); // Usa el namespace "services" para traducciones

  return (
    <div className="px-8 py-16 bg-gray-50">
      {/* Encabezado */}
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
        Soluciones Integrales
      </h1>
      <p className="text-lg text-center text-gray-600 mb-12">
        Encuentra las soluciones logísticas más adecuadas para tu empresa.
      </p>

      {/* Contenedor de servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Servicio 1 */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
          <img
            src="/images/service1.jpg"
            alt="Agenciamiento de Aduanas"
            className="w-full object-cover"
          />
          <div className="flex flex-col justify-between flex-grow p-6 text-center">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Agenciamiento de Aduanas
            </h2>
            <p className="text-gray-600">
              Facilitamos todas las gestiones aduaneras, cumpliendo con las normativas y requisitos legales vigentes.
            </p>
          </div>
        </div>

        {/* Servicio 2 */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
          <img
            src="/images/service2.jpg"
            alt="Fletes Internacionales"
            className="w-full object-cover"
          />
          <div className="flex flex-col justify-between flex-grow p-6 text-center">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Fletes Internacionales
            </h2>
            <p className="text-gray-600">
              Ofrecemos transporte de carga internacional con el respaldo de alianzas estratégicas que aseguran una gestión eficiente de envíos.
            </p>
          </div>
        </div>

        {/* Servicio 3 */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
          <img
            src="/images/service3.jpg"
            alt="Asesoría en Comercio Exterior"
            className="w-full object-cover"
          />
          <div className="flex flex-col justify-between flex-grow p-6 text-center">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Asesoría en Comercio Exterior
            </h2>
            <p className="text-gray-600">
              Brindamos apoyo especializado en normativa y procesos aduaneros, manteniéndote actualizado sobre cambios en regulaciones.
            </p>
          </div>
        </div>

        {/* Servicio 4 */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
          <img
            src="/images/service4.jpg"
            alt="Transporte de Carga"
            className="w-full object-cover"
          />
          <div className="flex flex-col justify-between flex-grow p-6 text-center">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Transporte de Carga
            </h2>
            <p className="text-gray-600">
              Ofrecemos traslado de cargas ligeras y pesadas con seguimiento GPS y altos estándares de calidad en logística internacional.
            </p>
          </div>
        </div>

        {/* Servicio 5 */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
          <img
            src="/images/service5.jpg"
            alt="Embaladora a Todo Destino"
            className="w-full object-cover"
          />
          <div className="flex flex-col justify-between flex-grow p-6 text-center">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Embaladora a Todo Destino
            </h2>
            <p className="text-gray-600">
              Garantizamos un embalaje profesional para productos peruanos destinados a cualquier parte del mundo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

