'use client';
import Link from 'next/link'; // Cambiado para usar el componente nativo de Next.js
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import GithubIcon from '../../icons/github';
import LogoIcon from '../../icons/logo';
import LangSwitcher from './LangSwitcher';
import ThemeSwitch from './ThemeSwitch';

interface Props {
  locale: string;
}

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('');

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5">
      <Link href="/" passHref>
        <div className="flex flex-row items-center cursor-pointer">
          <div className="mb-2 h-14 w-14">
            <LogoIcon />
          </div>
          <strong className="mx-2 select-none">Jem Logistic</strong>
        </div>
      </Link>
      <div className="flex flex-row items-center gap-3">
        <nav className="mr-10 inline-flex gap-5">
          <Link href="/es/about" passHref>
            <span className="text-blue-600 hover:underline">{t('About')}</span>
          </Link>
          <Link href="/es/services" passHref>
            <span className="text-blue-600 hover:underline">{t('Services')}</span>
          </Link>
          <Link href="/es/contact" passHref>
            <span className="text-blue-600 hover:underline">{t('Contact')}</span>
          </Link>
        </nav>
        <ThemeSwitch />
        <LangSwitcher />
        <a
          href="https://github.com/yahyaparvar/nextjs-template"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="size-8">
            <GithubIcon />
          </div>
        </a>
      </div>
    </div>
  );
};
