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

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar el header solo si el usuario está cerca de la parte superior
      if (window.scrollY <= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Limpiar evento
  }, []);

  return (
    <>
      {/* Header que solo aparece al inicio */}
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

          {/* Navegación */}
          <nav className="hidden md:flex gap-8">
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
          </nav>

          {/* Botones */}
          <div className="flex items-center gap-4">
            <LangSwitcher />
          </div>
        </div>
      </header>

      {/* Espaciado para evitar que el contenido quede oculto */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};
