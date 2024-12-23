export const WhatsAppButton = () => {
    const whatsappNumber = "+51998319641"; // Reemplaza con tu número de WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}`;
  
    return (
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300"
        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>
    );
  };