import { useTranslations } from 'next-intl';
import Button from './components/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function DashboardPage() {
  const t = useTranslations('');

  return (
    <div>
      {/* Sección principal: Título y botones */}
      <section className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-blue-100 via-white to-gray-50">
        <h1 className="text-center text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
          {t('An')}{' '}
          <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
            {t('Booster')}
          </span>
          <br />
          {t('to_Your_NextJS_Apps')}
        </h1>
        <div className="my-4 px-4 md:px-20 text-center text-lg md:text-2xl text-gray-600">
          {t(
            'An_approachable_performant_and_versatile_boilerplate_for_building_SSR_applications'
          )}
        </div>
        <div className="mt-4 flex flex-col items-center gap-4">
          <a href="/es/services">
            <Button
              rounded
              size="large"
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 shadow-lg transition-transform transform hover:scale-105"
            >
              {t('Use_Services')}
            </Button>
          </a>

          <a href="/es/about">
            <Button
              rounded
              size="large"
              variant="secondary"
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 shadow-lg transition-transform transform hover:scale-105"
            >
              {t('Learn_More')}
            </Button>
          </a>
        </div>
      </section>

      {/* Sección secundaria: Tarjetas de información */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tarjeta 1 */}
          <div className="text-center flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105">
            <div className="mb-4 text-blue-500">
              <i className="fa-solid fa-earth-americas text-4xl"></i>
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-blue-800">
              {t('Approachable')}
            </h2>
            <p className="text-gray-600 text-base max-w-[500px]">
              {t(
                'Add_components_without_sending_additional_client_side_JavaScript_Built_on_the_latest_React_features'
              )}
            </p>
          </div>
          {/* Tarjeta 2 */}
          <div className="text-center flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105">
            <div className="mb-4 text-blue-500">
              <i className="fa-solid fa-box text-4xl"></i>
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-blue-800">
              {t('Versatile')}
            </h2>
            <p className="text-gray-600 text-base max-w-[500px]">
              {t(
                'Automatic_Image_Font_and_Script_Optimizations_for_improved_UX_and_Core_Web_Vitals'
              )}
            </p>
          </div>
          {/* Tarjeta 3 */}
          <div className="text-center flex flex-col items-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105">
            <div className="mb-4 text-blue-500">
              <i className="fa-solid fa-chart-line text-4xl"></i>
            </div>
            <h2 className="mb-3 text-2xl font-semibold text-blue-800">
              {t('Performant')}
            </h2>
            <p className="text-gray-600 text-base max-w-[500px]">
              {t(
                'A_rich_incredibly_adoptable_template_that_scales_between_a_small_showcase_website_and_a_full_size_app'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Nueva Sección: Mapa interactivo */}
      <section className="py-16 bg-gradient-to-b from-gray-200 to-gray-300">
        <div className="mx-auto max-w-screen-lg px-6 text-center">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">
            {t('Our_Location')}
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            {t('Visit_Us_Description')}
          </p>
          <p className="text-gray-600 mb-6">
            <strong>{t('Opening_Hours')}:</strong> {t('Opening_Hours_Details')}
          </p>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-gray-300 mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d124864.628973481!2d-77.1235937!3d-12.0421677!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c956caaab1ad%3A0x5fd2b64541849869!2sJos%C3%A9%20Amich%20174%2C%20Callao%2007006!5e0!3m2!1ses!2spe!4v1734914437338!5m2!1ses!2spe"
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg border-none"
            />
          </div>
        </div>
        <div className="mx-auto max-w-screen-lg px-6 text-center">
          <p className="text-gray-600 text-lg mb-4">
            {t('Visit_Us_Description2')}
          </p>
          <p className="text-gray-600 mb-6">
            <strong>{t('Opening_Hours')}:</strong> {t('Opening_Hours_Details')}
          </p>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border border-gray-300 mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d434646.77562467306!2d-77.25490150993389!3d-12.138763416687944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDAxJzQ5LjYiUyA3N8KwMDUnNDEuMSJX!5e0!3m2!1ses!2spe!4v1736045290964!5m2!1ses!2spe"
              width="100%"
              height="100%"
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg border-none"
            />
          </div>
          <a
            href="/es/contact"
            className="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            {t('Contact_Us')}
          </a>
        </div>
      </section>
    </div>
  );
}
