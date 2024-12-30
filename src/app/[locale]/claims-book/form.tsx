'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

// Estructura de datos del formulario
interface FormData {
  nombre: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  dni: string;
  correo: string;
  bien: string;
  detalleBien: string;
  tipoReclamo: string;
  detalleReclamo: string;
  acciones: string;
}

export default function LibroReclamacionesForm() {
  const t = useTranslations('claimsBook'); // Namespace para traducciones
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    dni: '',
    correo: '',
    bien: '',
    detalleBien: '',
    tipoReclamo: '',
    detalleReclamo: '',
    acciones: '',
  });

  const [errores, setErrores] = useState<Partial<FormData>>({});
  const [enviando, setEnviando] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({
    detalleBien: 0,
    detalleReclamo: 0,
    acciones: 0,
  });

  // Validar campos
  const validarCampo = (nombre: keyof FormData, valor: string): string => {
    const trimmedValue = valor.trim();
    switch (nombre) {
      case 'nombre':
      case 'apellidos':
        if (!trimmedValue) return t(`errors.${nombre}`);
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedValue)) return t('errors.soloLetras');
        break;
      case 'telefono':
      case 'dni':
        if (!trimmedValue) return t(`errors.${nombre}`);
        if (!/^[0-9]+$/.test(trimmedValue)) return t('errors.soloNumeros');
        break;
      case 'correo':
        if (!trimmedValue) return t(`errors.${nombre}`);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return t('errors.emailInvalido');
        break;
      case 'detalleBien':
      case 'detalleReclamo':
      case 'acciones':
        const wordCount = trimmedValue ? trimmedValue.split(/\s+/).length : 0;
        setWordCounts((prev) => ({ ...prev, [nombre]: wordCount }));
        if (!trimmedValue) return t(`errors.${nombre}`);
        if (wordCount > 150) return t('errors.limitePalabras');
        break;
      default:
        if (!trimmedValue) return t(`errors.${nombre}`);
    }
    return '';
  };

  // Manejar cambios en los campos
  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrores({ ...errores, [name]: validarCampo(name as keyof FormData, value) });
  };

  // Manejar envío del formulario
  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();

    const erroresFinales = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof FormData] = validarCampo(key as keyof FormData, formData[key as keyof FormData]);
      return acc;
    }, {} as Partial<FormData>);

    setErrores(erroresFinales);

    if (Object.values(erroresFinales).some((error) => error)) {
      toast.error(t('errors.revisarErrores'), { position: 'bottom-right' });
      return;
    }

    setEnviando(true);

    try {
      const respuesta = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (respuesta.ok) {
        toast.success(t('success.mensajeEnviado'), { position: 'bottom-right' });
        setFormData({
          nombre: '',
          apellidos: '',
          direccion: '',
          telefono: '',
          dni: '',
          correo: '',
          bien: '',
          detalleBien: '',
          tipoReclamo: '',
          detalleReclamo: '',
          acciones: '',
        });
        setWordCounts({ detalleBien: 0, detalleReclamo: 0, acciones: 0 });
      } else {
        toast.error(t('errors.envioError'), { position: 'bottom-right' });
      }
    } catch {
      toast.error(t('errors.servidorError'), { position: 'bottom-right' });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="space-y-6 bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">{t('title')}</h1>
      {[ // Campos dinámicos
        { name: 'nombre', label: t('form.nombre'), placeholder: t('form.placeholders.nombre') },
        { name: 'apellidos', label: t('form.apellidos'), placeholder: t('form.placeholders.apellidos') },
        { name: 'direccion', label: t('form.direccion'), placeholder: t('form.placeholders.direccion') },
        { name: 'telefono', label: t('form.telefono'), placeholder: t('form.placeholders.telefono') },
        { name: 'dni', label: t('form.dni'), placeholder: t('form.placeholders.dni') },
        { name: 'correo', label: t('form.correo'), placeholder: t('form.placeholders.correo') },
        {
          name: 'bien',
          label: t('form.bien'),
          select: true,
          options: [t('form.options.product'), t('form.options.service')],
        },
        {
          name: 'detalleBien',
          label: t('form.detalleBien'),
          placeholder: t('form.placeholders.detalleBien'),
          wordCount: wordCounts.detalleBien,
        },
        {
          name: 'tipoReclamo',
          label: t('form.tipoReclamo'),
          select: true,
          options: [t('form.options.complaint'), t('form.options.claim')],
          additionalInfo: [
            t('form.tipoReclamoInfo.complaint'),
            t('form.tipoReclamoInfo.claim')
          ],
        },
        {
          name: 'detalleReclamo',
          label: t('form.detalleReclamo'),
          placeholder: t('form.placeholders.detalleReclamo'),
          wordCount: wordCounts.detalleReclamo,
        },
        {
          name: 'acciones',
          label: t('form.acciones'),
          placeholder: t('form.placeholders.acciones'),
          wordCount: wordCounts.acciones,
        },
      ].map((campo) => (
        <div key={campo.name}>
          <label htmlFor={campo.name} className="block font-medium">
            {campo.label}
          </label>
          {campo.additionalInfo && Array.isArray(campo.additionalInfo) && (
            <div className="text-sm text-gray-600 mb-2">
              {campo.additionalInfo.map((info, index) => (
                <p key={index}>{info}</p>
              ))}
            </div>
          )}
          {campo.select ? (
            <select
              id={campo.name}
              name={campo.name}
              value={formData[campo.name as keyof FormData]}
              onChange={manejarCambio}
              className={`block w-full mt-1 border ${
                errores[campo.name as keyof FormData] ? 'border-red-500' : 'border-gray-300'
              } rounded p-2`}
            >
              <option value="">{t('form.selectPlaceholder')}</option>
              {campo.options?.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          ) : (
            <>
              <input
                type={campo.name === 'correo' ? 'email' : 'text'}
                id={campo.name}
                name={campo.name}
                value={formData[campo.name as keyof FormData]}
                onChange={manejarCambio}
                placeholder={campo.placeholder}
                className={`block w-full mt-1 border ${
                  errores[campo.name as keyof FormData] ? 'border-red-500' : 'border-gray-300'
                } rounded p-2`}
              />
              {campo.wordCount !== undefined && (
                <p className="text-sm text-gray-600 mt-1">
                  {t('form.wordCount', { count: campo.wordCount, max: 150 })}
                </p>
              )}
            </>
          )}
          {errores[campo.name as keyof FormData] && (
            <p className="text-red-500 text-sm mt-1">{errores[campo.name as keyof FormData]}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
        disabled={enviando}
      >
        {enviando ? t('form.enviando') : t('form.enviar')}
      </button>
    </form>
  );
}
