'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function FormularioDeContacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });

  const [enviando, setEnviando] = useState(false);

  const validarCampo = (nombre: string, valor: string) => {
    switch (nombre) {
      case 'nombre':
        const regexNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
        return valor.trim()
          ? regexNombre.test(valor)
            ? ''
            : 'El nombre solo debe contener letras y espacios.'
          : 'El nombre es obligatorio.';
      case 'correo':
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(valor) ? '' : 'El correo no es válido.';
      case 'telefono':
        return valor.trim() && !isNaN(Number(valor))
          ? ''
          : 'El teléfono debe ser numérico.';
      case 'mensaje':
        const palabras = valor.trim() === '' ? 0 : valor.trim().split(/\s+/).length;
        if (!valor.trim()) return 'El mensaje es obligatorio.';
        if (palabras > 150) return 'El mensaje no puede tener más de 150 palabras.';
        return '';
      default:
        return '';
    }
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setErrores({ ...errores, [name]: validarCampo(name, value) });
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const erroresFinales = {
      nombre: validarCampo('nombre', formData.nombre),
      correo: validarCampo('correo', formData.correo),
      telefono: validarCampo('telefono', formData.telefono),
      mensaje: validarCampo('mensaje', formData.mensaje),
    };

    setErrores(erroresFinales);

    if (Object.values(erroresFinales).some((error) => error)) {
      toast.error('Por favor corrige los errores antes de enviar.', { position: 'bottom-right' });
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resultado = await respuesta.json();
      if (respuesta.ok) {
        toast.success('Mensaje enviado correctamente.', { position: 'bottom-right' });
        setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
      } else {
        toast.error(resultado.error || 'Error al enviar el mensaje.', { position: 'bottom-right' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Hubo un error al enviar el formulario.', { position: 'bottom-right' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-16 px-4">
      <div className="text-center mb-20">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 animate-fade-in">
          Contáctanos
        </h1>
        <p className="text-lg text-gray-600">
          Estamos aquí para ayudarte. Por favor, llena el siguiente formulario y nos pondremos en
          contacto contigo lo antes posible.
        </p>
      </div>

      <form
        onSubmit={manejarEnvio}
        className="bg-white p-10 shadow-lg rounded-xl w-full max-w-xl space-y-6 animate-slide-in transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-300"
      >
        {[
          { name: 'nombre', label: 'Nombre Completo', placeholder: 'Escribe tu nombre completo' },
          { name: 'correo', label: 'Correo Electrónico', placeholder: 'ejemplo@correo.com' },
          { name: 'telefono', label: 'Teléfono', placeholder: 'Número de teléfono' },
          { name: 'mensaje', label: 'Mensaje', placeholder: 'Déjanos tu consulta o comentario aquí...', textarea: true },
        ].map((campo) => (
          <div key={campo.name}>
            <label htmlFor={campo.name} className="block text-lg font-medium text-gray-700">
              {campo.label}
            </label>
            <div className="relative">
              {campo.textarea ? (
                <textarea
                  id={campo.name}
                  name={campo.name}
                  value={formData[campo.name]}
                  onChange={manejarCambio}
                  rows={4}
                  className={`mt-2 block w-full border ${
                    errores[campo.name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={campo.placeholder}
                  required
                ></textarea>
              ) : (
                <input
                  type={campo.name === 'correo' ? 'email' : 'text'}
                  id={campo.name}
                  name={campo.name}
                  value={formData[campo.name]}
                  onChange={manejarCambio}
                  className={`mt-2 block w-full border ${
                    errores[campo.name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={campo.placeholder}
                  required
                />
              )}
            </div>
            {errores[campo.name] && <p className="text-red-500 text-sm mt-1">{errores[campo.name]}</p>}
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={enviando}
            className={`bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 ${
              enviando ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {enviando ? <i className="fas fa-spinner fa-spin" /> : 'Enviar Mensaje'}
          </button>
        </div>
      </form>
    </div>
  );
}

