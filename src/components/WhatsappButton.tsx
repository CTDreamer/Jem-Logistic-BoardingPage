import React from 'react';

interface WhatsAppButtonProps {
  number: string;
  hoverText: string;
  positionBottom: number;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  number,
  hoverText,
  positionBottom,
}) => {
  const whatsappLink = `https://wa.me/${number.replace('+', '')}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
      style={{
        bottom: positionBottom,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      title={hoverText} // Texto que aparece al pasar el mouse
    >
      <i className="fab fa-whatsapp text-2xl"></i>
    </a>
  );
};
