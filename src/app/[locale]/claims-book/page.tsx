import LibroReclamacionesForm from './form';
import { useTranslations } from 'next-intl';

export default function ClaimsBookPage() {
  const t = useTranslations('claimsBook'); // Namespace para traducciones

  return (
    <div className="max-w-screen-lg mx-auto py-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">{t('name')}</h1>
      <p className="text-center text-gray-600 mb-6">
        {t('description')}
      </p>
      <LibroReclamacionesForm />
    </div>
  );
}
