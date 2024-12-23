'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import LogoIcon from '../../icons/logo';
import LangSwitcher from './LangSwitcher';

interface Props {
  locale: string;
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('header');
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5 lg:px-10">
          {/* Logo */}
          <Link href="/" passHref>
            <div className="flex flex-row items-center cursor-pointer">
              <div className="h-12 w-12">
                <LogoIcon />
              </div>
              <strong className="ml-2 text-xl text-blue-900 font-semibold tracking-wide">
                Jem Logistic
              </strong>
            </div>
          </Link>

          {/* Navegación (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center gap-10">
            <Link href={`/${locale}/about`} passHref>
              <span className="text-blue-700 font-medium hover:text-blue-900 transition-colors duration-200 cursor-pointer">
                {t('About')}
              </span>
            </Link>
            <Link href={`/${locale}/services`} passHref>
              <span className="text-blue-700 font-medium hover:text-blue-900 transition-colors duration-200 cursor-pointer">
                {t('Services')}
              </span>
            </Link>
            <Link href={`/${locale}/contact`} passHref>
              <span className="text-blue-700 font-medium hover:text-blue-900 transition-colors duration-200 cursor-pointer">
                {t('Contact')}
              </span>
            </Link>
          </div>

          {/* Selector de idioma (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <LangSwitcher />
          </div>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden flex items-center justify-center w-12 h-12 text-blue-700 bg-blue-100 rounded-md shadow-lg"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Menú desplegable móvil */}
        {isMenuOpen && (
          <nav className="md:hidden bg-blue-50 p-5 shadow-md rounded-b-lg">
            <Link href={`/${locale}/about`} passHref>
              <span
                onClick={() => setIsMenuOpen(false)} // Cerrar menú al hacer clic
                className="block text-blue-700 font-medium hover:text-blue-900 transition-colors duration-200 cursor-pointer py-2"
              >
                {t('About')}
              </span>
            </Link>
            <Link href={`/${locale}/services`} passHref>
              <span
                onClick={() => setIsMenuOpen(false)}
                className="block text-blue-700 font-medium hover:text-blue-900 transition-colors duration-200 cursor-pointer py-2"
              >
                {t('Services')}
              </span>
            </Link>
            <Link href={`/${locale}/contact`} passHref>
              <span
                onClick={() => setIsMenuOpen(false)}
                className="block text-blue-700 font-medium hover:text-blue-900 transition-colors duration-200 cursor-pointer py-2"
              >
                {t('Contact')}
              </span>
            </Link>

            {/* Selector de idioma (Mobile) */}
            <div className="mt-4">
              <LangSwitcher />
            </div>
          </nav>
        )}
      </header>

      {/* Espaciado para evitar contenido oculto */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};
