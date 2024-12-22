export const Footer = () => {
  return (
    <footer className="bg-[#5b9bd5] text-white py-6">
      <div className="max-w-screen-lg mx-auto px-6 flex flex-col items-center md:flex-row md:justify-between">
        {/* Logo y Texto */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo-empresa.png"
            alt="Logo"
            className="w-16 mb-1"
          />
          <p className="text-sm font-semibold text-white">Jem Logistic</p>
        </div>

        {/* Información de Contacto */}
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-base font-bold text-yellow-400 mb-3">CONTÁCTENOS</h2>
          <ul className="space-y-1 text-white text-sm">
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
      <div className="mt-6 text-center text-xs text-gray-200">
        ©2024 <span className="text-yellow-400 font-bold">Jem Logistic</span> - Todos los derechos reservados. Diseñado por{' '}
        <a href="#" className="text-yellow-400 hover:underline">
          CT
        </a>
      </div>
    </footer>
  );
};
