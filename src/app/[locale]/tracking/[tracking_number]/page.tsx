"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react"; // Importa useEffect
import { useAuth } from "@/components/AuthProvider"; // Importa el hook de autenticación
import { useRouter } from "next/navigation"; // Importa useRouter

export default function TrackingDetailsPage() {
  const searchParams = useSearchParams();
  const trackingData = searchParams.get("data");
  const { user } = useAuth(); // Obtén el usuario actual
  const router = useRouter(); // Inicializa el router

  const [tracking, setTracking] = useState<any>(trackingData ? JSON.parse(trackingData) : null);
  const [activeStep, setActiveStep] = useState<string | null>(null); // Paso activo (para mostrar su info)
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
  const [formData, setFormData] = useState<any>({}); // Estado para almacenar los datos del formulario de edición

  // Determinar los pasos según el tipo de carga
  const steps = tracking?.cargo_type === "FCL"
    ? ["Direccionamiento", "Operaciones", "Retiro", "Proceso de Devolución", "Facturación"]
    : ["Direccionamiento", "Operaciones", "Retiro", "Facturación"];

  // Obtener la información del paso activo
  const activeStepData = tracking?.steps?.find(
    (step: any) => step.step_name === activeStep
  )?.data;

  // Función para manejar la edición de un paso
  const handleEdit = async () => {
    if (!activeStep) return;

    const stepToEdit = tracking.steps.find((step: any) => step.step_name === activeStep);
    if (!stepToEdit) return;

    try {
      const response = await fetch(`/api/tracking_steps/${stepToEdit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar el estado local con los nuevos datos
        const updatedSteps = tracking.steps.map((step: any) =>
          step.id === stepToEdit.id ? { ...step, ...data.tracking_step } : step
        );
        setTracking({ ...tracking, steps: updatedSteps });
        setIsEditing(false); // Salir del modo de edición
      } else {
        console.error("Error al actualizar el paso:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud PATCH:", error);
    }
  };

  // Inicializar el formulario con los datos del paso activo
  const initializeFormData = () => {
    if (activeStepData) {
      setFormData({
        data: { ...activeStepData }, // Copia de los datos del paso
        completed: tracking.steps.find((step: any) => step.step_name === activeStep)?.completed || false,
      });
    }
  };

  // Actualizar el formulario cuando cambia el paso activo
  useEffect(() => {
    if (activeStep) {
      initializeFormData();
    }
  }, [activeStep]); // Dependencia: activeStep

  if (!tracking) {
    return <p className="text-center">No se encontró el tracking.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Detalles del Tracking: {tracking.tracking_number}</h1>

      {/* Información general del tracking */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-6">
        <p><strong>Tipo de Carga:</strong> {tracking.cargo_type}</p>
        <p><strong>Estado:</strong> {tracking.status}</p>
        <p><strong>Fecha de Llegada:</strong> {tracking.arrival_date}</p>
      </div>

      {/* Botón "Crear Paso" para administradores */}
      {user?.role === "admin" && (
        <div className="mt-4 mb-6"> {/* Añadí mb-6 para dar más espacio debajo del botón */}
          <button
            onClick={() => router.push(`/es/tracking/${tracking.tracking_number}/create-step`)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            Crear Paso
          </button>
        </div>
      )}

      {/* Botones de pasos */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {steps.map((step) => {
          const stepData = tracking?.steps?.find((s: any) => s.step_name === step);
          const isCompleted = stepData?.completed;

          return (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`px-4 py-2 rounded-md ${
                isCompleted
                  ? "bg-blue-200 text-blue-800 hover:bg-blue-300" // Azul claro para completados
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Gris para no completados
              }`}
            >
              {step}
            </button>
          );
        })}
      </div>

      {/* Información del paso activo */}
      {activeStepData && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-xl font-bold mb-4 text-blue-800">{activeStep}</h2>
          <div className="space-y-2">
            {Object.entries(activeStepData).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-semibold">{key}:</span>
                <span>{String(value)}</span>
              </div>
            ))}
          </div>

          {/* Botón de editar (solo para admin) */}
          {user?.role === "admin" && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  initializeFormData(); // Inicializar el formulario al entrar en modo edición
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
              >
                {isEditing ? "Cancelar Edición" : "Editar Paso"}
              </button>
            </div>
          )}

          {/* Formulario de edición (solo visible en modo edición) */}
          {isEditing && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-800">Editar Paso: {activeStep}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit();
                }}
              >
                <div className="space-y-4">
                  {/* Campos dinámicos para los datos del paso */}
                  {Object.entries(activeStepData).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {key}:
                      </label>
                      <input
                        type="text"
                        value={formData.data?.[key] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            data: { ...formData.data, [key]: e.target.value },
                          })
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                  ))}

                  {/* Campo completado */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.completed || false}
                      onChange={(e) =>
                        setFormData({ ...formData, completed: e.target.checked })
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Completado
                    </label>
                  </div>
                </div>

                {/* Botón de guardar cambios */}
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}