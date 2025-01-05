import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaBook } from 'react-icons/fa';

export const Footer = () => {
  const t = useTranslations('footer'); // Namespace "footer" for translations
  const locale = useLocale(); // Get the current selected locale

  return (
    <footer className="bg-[#5b9bd5] text-white py-8">
      <div className="max-w-screen-lg mx-auto px-6 flex flex-col items-center md:flex-row md:justify-between">
        {/* Company Logo and Name */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo-empresa.png"
            alt="Logo"
            className="w-16 mb-2"
          />
          <p className="text-sm font-bold text-white tracking-wide">Jem Logistic</p>
        </div>

        {/* Contact Information */}
        <div className="text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">{t('Contact_Us')}</h2>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-center">
              <FaPhoneAlt className="text-yellow-400 mr-2" />
              <span>(+51) 998319641 y (+51) 946054805</span>
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="text-yellow-400 mr-2" />
              <span>(01) 2289207 y (+51) 1 2289207</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-yellow-400 mr-2" />
              <span>Urb La Colonial Calle José Amich 174 Dpto 2 - Callao</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-yellow-400 mr-2" />
              <span>eduardoparedes@jemlogistic.com</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-yellow-400 mr-2" />
              <span>leslieparedes@jemcargologistic.com</span>
            </li>
          </ul>
        </div>

        {/* Claims Book */}
        <div className="text-center mt-6 md:mt-0">
          <Link href={`/${locale}/claims-book`}>
            <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition duration-300 flex items-center">
              <FaBook className="text-blue-600 mr-2" />
              {t('Claims_Book')}
            </button>
          </Link>
        </div>
      </div>

      {/* Reserved Rights */}
      <div className="mt-6 text-center text-xs text-gray-200 border-t border-gray-400 pt-4">
        ©2024 <span className="text-yellow-400 font-bold">Jem Logistic</span> - {t('All_Rights_Reserved')}{' '}
        {t('Designed_By')} <span className="text-yellow-400">CT</span>
      </div>
    </footer>
  );
};
