import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import Button from './Button';

const LangSwitcher: React.FC = () => {
  const t = useTranslations('language');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);

  // Idiomas permitidos
  const options = [
    { country: t('languages.english'), code: 'en' },
    { country: t('languages.spanish'), code: 'es' },
    { country: t('languages.chinese'), code: 'zh' },
  ];

  const cleanPath = (path: string) => {
    const segments = path.split('/').filter(seg => !['en', 'es', 'zh'].includes(seg));
    return `/${segments.join('/')}`;
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <Button
          className="text-destructive inline-flex w-full items-center justify-between gap-3"
          size="small"
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          {t('language')}
          <FiGlobe />
        </Button>
        {isOptionsExpanded && (
          <div className="absolute right-0 mt-2 w-full origin-top-right rounded-md bg-dropdown shadow-lg">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map(lang => {
                const newPath = `/${lang.code}${cleanPath(pathname)}?${searchParams.toString()}`;
                return (
                  <Link key={lang.code} href={newPath}>
                    <button
                      lang={lang.code}
                      onMouseDown={e => e.preventDefault()}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-dropdownHover ${
                        pathname.startsWith(`/${lang.code}`)
                          ? 'bg-selected text-primary hover:bg-selected'
                          : 'text-secondary'
                      }`}
                    >
                      {lang.country}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LangSwitcher;



