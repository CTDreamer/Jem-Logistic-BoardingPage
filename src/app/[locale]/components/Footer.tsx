import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('footer'); // Asegúrate de definir las traducciones en tu archivo de mensajes

  return (
    <footer className="bg-[#5b9bd5] text-white py-8">
      <div className="max-w-screen-lg mx-auto px-6 flex flex-col items-center md:flex-row md:justify-between">
        {/* Logo y Nombre de la Empresa */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo-empresa.png"
            alt="Logo"
            className="w-16 mb-2"
          />
          <p className="text-sm font-bold text-white tracking-wide">Jem Logistic</p>
        </div>

        {/* Información de Contacto */}
        <div className="text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">{t('Contact_Us')}</h2>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-center">
              <i className="fas fa-phone-alt text-yellow-400 mr-2"></i>
              <span>(+51) 998319641 y (+51) 946054805</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-map-marker-alt text-yellow-400 mr-2"></i>
              <span>Urb La Colonial Calle José Amich 174 Dpto 2 - Callao</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope text-yellow-400 mr-2"></i>
              <span>eduardoparedes@jemlogistic.com</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope text-yellow-400 mr-2"></i>
              <span>leslieparedes@jemcargologistic.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Derechos Reservados */}
      <div className="mt-6 text-center text-xs text-gray-200 border-t border-gray-400 pt-4">
        ©2024 <span className="text-yellow-400 font-bold">Jem Logistic</span> - {t('All_Rights_Reserved')}{' '}
        {t('Designed_By')} <span className="text-yellow-400">CT</span>
      </div>
    </footer>
  );
};
