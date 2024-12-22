'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Define la estructura de datos del formulario
interface FormData {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
}

export default function FormularioDeContacto() {
  const t = useTranslations('contact'); // Namespace para traducciones del formulario
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });

  // Estado para almacenar errores en los campos
  const [errores, setErrores] = useState<Partial<FormData>>({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: '',
  });

  // Estado para controlar el estado de envío
  const [enviando, setEnviando] = useState(false);

  // Función para validar campos
  const validarCampo = (nombre: keyof FormData, valor: string): string => {
    const trimmedValue = valor.trim();
    switch (nombre) {
      case 'nombre': {
        const regexNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
        return trimmedValue
          ? regexNombre.test(trimmedValue)
            ? ''
            : t('errors.nombreLetras') // Traducción para "El nombre solo debe contener letras y espacios."
          : t('errors.nombreObligatorio'); // Traducción para "El nombre es obligatorio."
      }
      case 'correo': {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(trimmedValue)
          ? ''
          : t('errors.correoInvalido'); // Traducción para "El correo no es válido."
      }
      case 'telefono': {
        if (valor.includes(' ')) {
          return t('errors.telefonoEspacios'); // Traducción para "No se permiten espacios en el teléfono."
        }
        const regexTelefono = /^[0-9]+$/;
        return regexTelefono.test(trimmedValue)
          ? ''
          : t('errors.telefonoNumerico'); // Traducción para "El teléfono debe ser numérico."
      }
      case 'mensaje': {
        const palabras = trimmedValue === '' ? 0 : trimmedValue.split(/\s+/).length;
        if (!trimmedValue) return t('errors.mensajeObligatorio'); // Traducción para "El mensaje es obligatorio."
        if (palabras > 150) return t('errors.mensajePalabras'); // Traducción para "El mensaje no puede tener más de 150 palabras."
        return '';
      }
      default:
        return '';
    }
  };

  // Manejar cambios en los campos
  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Actualizar el estado del formulario y los errores
    setFormData({ ...formData, [name]: value });
    setErrores({
      ...errores,
      [name]: validarCampo(name as keyof FormData, value),
    });
  };

  // Manejar envío del formulario
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    const erroresFinales: Partial<FormData> = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key as keyof FormData] = validarCampo(
          key as keyof FormData,
          formData[key as keyof FormData]
        );
        return acc;
      },
      {} as Partial<FormData>
    );

    setErrores(erroresFinales);

    console.log('Errores finales:', erroresFinales); // Debug
    console.log('Formulario enviado con:', formData); // Debug

    // Si hay errores, detener el envío
    if (Object.values(erroresFinales).some((error) => error)) {
      toast.error(t('errors.corregirErrores'), {
        position: 'bottom-right',
      });
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.correo,
          phone: formData.telefono,
          message: formData.mensaje,
        }),
      });

      const resultado = await respuesta.json();
      if (respuesta.ok) {
        toast.success(t('success.mensajeEnviado'), {
          position: 'bottom-right',
        });
        setFormData({ nombre: '', correo: '', telefono: '', mensaje: '' });
      } else {
        toast.error(resultado.error || t('errors.envioError'), {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('errors.servidorError'), {
        position: 'bottom-right',
      });
    } finally {
      setEnviando(false);
    }
  };

  // Renderizar formulario
  return (
    <div className="flex flex-col items-center py-16 px-4">
      <div className="text-center mb-20">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 animate-fade-in">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600">{t('description')}</p>
      </div>

      <form
        onSubmit={manejarEnvio}
        className="bg-white p-10 shadow-lg rounded-xl w-full max-w-xl space-y-6 animate-slide-in transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-300"
      >
        {[
          { name: 'nombre', label: t('form.nombre'), placeholder: t('form.nombrePlaceholder') },
          { name: 'correo', label: t('form.correo'), placeholder: t('form.correoPlaceholder') },
          { name: 'telefono', label: t('form.telefono'), placeholder: t('form.telefonoPlaceholder') },
          {
            name: 'mensaje',
            label: t('form.mensaje'),
            placeholder: t('form.mensajePlaceholder'),
            textarea: true,
          },
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
                  value={formData[campo.name as keyof FormData]}
                  onChange={manejarCambio}
                  rows={4}
                  className={`mt-2 block w-full border ${
                    errores[campo.name as keyof FormData] ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={campo.placeholder}
                  required
                ></textarea>
              ) : (
                <input
                  type={campo.name === 'correo' ? 'email' : 'text'}
                  id={campo.name}
                  name={campo.name}
                  value={formData[campo.name as keyof FormData]}
                  onChange={manejarCambio}
                  className={`mt-2 block w-full border ${
                    errores[campo.name as keyof FormData] ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={campo.placeholder}
                  required
                />
              )}
            </div>
            {errores[campo.name as keyof FormData] && (
              <p className="text-red-500 text-sm mt-1">
                {errores[campo.name as keyof FormData]}
              </p>
            )}
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
            {enviando ? <i className="fas fa-spinner fa-spin" /> : t('form.enviar')}
          </button>
        </div>
      </form>
    </div>
  );
}
