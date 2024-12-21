export const Footer = () => {
  return (
    <footer className="bg-[#5b9bd5] text-white py-12">
      <div className="max-w-screen-lg mx-auto px-8 flex flex-col items-center md:flex-row md:justify-between">
        {/* Logo y Texto */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo-empresa.png"
            alt="Logo"
            className="w-20 mb-2"
          />
          <p className="text-lg font-semibold text-white">Jem Logistic</p>
        </div>

        {/* Información de Contacto */}
        <div className="text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">CONTÁCTENOS</h2>
          <ul className="space-y-2 text-white">
            <li>
              <i className="fas fa-phone-alt text-yellow-400 mr-2"></i>
              (+51) 000-0000
            </li>
            <li>
              <i className="fas fa-map-marker-alt text-yellow-400 mr-2"></i>
              Calle Ejemplo - Bellavista, Callao
            </li>
            <li>
              <i className="fas fa-envelope text-yellow-400 mr-2"></i>
              <a
                href="mailto:ejemplo@gmail.com"
                className="hover:underline"
              >
                ejemplo@gmail.com
              </a>
            </li>
            <li>
              <i className="fas fa-envelope text-yellow-400 mr-2"></i>
              <a
                href="mailto:ejemplo@gmail.com"
                className="hover:underline"
              >
                ejemplo@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Derechos Reservados */}
      <div className="mt-8 text-center text-sm text-gray-200">
        ©2024 <span className="text-yellow-400 font-bold">Jem Logistic</span> - Todos los derechos reservados. Diseñado por{' '}
        <a href="#" className="text-yellow-400 hover:underline">
          CT
        </a>
      </div>
    </footer>
  );
};
