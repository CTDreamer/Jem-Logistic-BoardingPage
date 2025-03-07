"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function CreateStepPage() {
  const { tracking_number } = useParams(); // Obtén el tracking_number de la URL
  const router = useRouter();
  const { user } = useAuth();

  const [stepName, setStepName] = useState("");
  const [stepData, setStepData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState<any>(null); // Para almacenar los detalles del tracking

  // Definir el orden de los pasos
  const stepOrderMap = {
    Direccionamiento: 1,
    Operaciones: 2,
    Retiro: 3,
    "Proceso de Devolucion": 4,
    Facturacion: 5,
  };

  // Calcular el orden del paso automáticamente
  const stepOrder = stepName ? stepOrderMap[stepName as keyof typeof stepOrderMap] : "";

  // Campos dinámicos para los datos del paso
  const stepFields = {
    Direccionamiento: [
      { key: "deposito_temporal", label: "Depósito Temporal", type: "text" },
      { key: "volante", label: "Volante", type: "text" },
    ],
    Operaciones: [
      { key: "revision_documentacion", label: "Revisión de Documentación", type: "text" },
      { key: "observaciones", label: "Campo de Observaciones", type: "text" },
      { key: "numeracion", label: "Numeración", type: "section" }, // Sección
      { key: "numero_dam", label: "Número de DAM", type: "text" },
      { key: "pago_impuestos", label: "Pago Impuestos", type: "file" },
      { key: "canal", label: "Canal", type: "text" },
      { key: "notificaciones", label: "Notificaciones", type: "text" },
      { key: "levante_autorizado", label: "Levante Autorizado", type: "text" },
      { key: "regularizacion", label: "Regularización", type: "text" },
    ],
    Retiro: [
      { key: "confirmacion", label: "Confirmación", type: "section" }, // Sección
      { key: "de_vb", label: "De VB", type: "text" },
      { key: "pagos_proforma", label: "Pagos de Proforma", type: "file" },
      { key: "numero_ar", label: "Número de AR", type: "text" },
      { key: "fecha_retiro", label: "Fecha de Retiro", type: "date" },
    ],
    "Proceso de Devolucion": [
      { key: "deposito_devolucion", label: "Depósito de Devolución", type: "text" },
      { key: "cita_devolucion", label: "Cita de Devolución", type: "text" },
    ],
    Facturacion: [
      { key: "documentos_facturacion", label: "Documentos de Facturación", type: "file" },
      { key: "recepcion_facturacion", label: "Recepción de Facturación", type: "file" },
      { key: "saldo", label: "Saldo", type: "text" },
      { key: "cancelacion_saldo", label: "Cancelación de Saldo", type: "text" },
    ],
  };

  // Obtener los detalles del tracking al cargar la página
  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const response = await fetch(`/api/tracking/${tracking_number}`);
        const data = await response.json();
        if (response.ok) {
          setTrackingDetails(data);
        } else {
          setError(data.error || "Error al obtener los detalles del tracking");
        }
      } catch (error) {
        console.error("Error en la solicitud GET:", error);
        setError("Error al obtener los detalles del tracking");
      }
    };

    fetchTrackingDetails();
  }, [tracking_number]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`/api/tracking_steps/${tracking_number}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step_name: stepName, data: stepData, step_order: stepOrder }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        router.push(`/es/tracking/${tracking_number}`); // ⬅️ Corrección aquí
      } else {
        setError(data.error || "Error al crear el paso");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error al crear el paso");
    } finally {
      setLoading(false);
    }
  };  

  // Función para manejar la subida de archivos
  const handleFileChange = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setStepData((prev: Record<string, any>) => ({
        ...prev,
        [key]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };
  

  if (!user || user.role !== "admin") {
    return <p className="text-center mt-8">No autorizado para crear pasos.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Paso</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        {/* Campo para seleccionar el nombre del paso */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre del Paso</label>
          <select
            value={stepName}
            onChange={(e) => {
              setStepName(e.target.value);
              setStepData({}); // Reiniciar los datos del paso al cambiar el nombre
            }}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="">Selecciona un paso</option>
            <option value="Direccionamiento">Direccionamiento</option>
            <option value="Operaciones">Operaciones</option>
            <option value="Retiro">Retiro</option>
            <option value="Proceso de Devolucion">Proceso de Devolucion</option>
            <option value="Facturacion">Facturacion</option>
          </select>
        </div>

        {/* Campo para el orden del paso (automático) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Orden del Paso</label>
          <input
            type="number"
            value={stepOrder}
            readOnly
            className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Campos dinámicos para los datos del paso */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Datos del Paso</label>
          {stepName &&
            stepFields[stepName as keyof typeof stepFields]?.map((field) => (
              <div key={field.key} className="mt-2">
                {field.type === "section" ? (
                  <h3 className="text-lg font-semibold mb-2">{field.label}</h3>
                ) : field.type === "file" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(field.key, e.target.files[0]);
                        }
                      }}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                    <input
                      type={field.type}
                      value={stepData[field.key] || ""}
                      onChange={(e) =>
                        setStepData({ ...stepData, [field.key]: e.target.value })
                      }
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Paso"}
        </button>
      </form>

      {/* Mostrar errores */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}
