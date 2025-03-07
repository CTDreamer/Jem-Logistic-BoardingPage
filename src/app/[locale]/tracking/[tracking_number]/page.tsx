"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function TrackingDetailPage() {
  const { tracking_number } = useParams(); // Única declaración correcta
  const router = useRouter();
  const { user } = useAuth();

  const [tracking, setTracking] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  const steps = tracking?.cargo_type === "FCL"
    ? ["Direccionamiento", "Operaciones", "Retiro", "Proceso de Devolucion", "Facturacion"]
    : ["Direccionamiento", "Operaciones", "Retiro", "Facturacion"];

  const fetchTrackingDetails = async () => {
    try {
      const response = await fetch(`/api/tracking/${tracking_number}`);
      const data = await response.json();

      if (response.ok) {
        setTracking(data);
      } else {
        console.error("Tracking no encontrado:", data.error);
        setTracking(null);
      }
    } catch (error) {
      console.error("Error obteniendo tracking:", error);
      setTracking(null);
    }
  };

  const initializeFormData = () => {
    const stepToEdit = tracking?.steps?.find((step: any) => step.step_name === activeStep);
  
    if (!stepToEdit || typeof stepToEdit.data !== "object") {
      setFormData({ data: {}, completed: false });
      return;
    }
  
    setFormData({
      data: stepToEdit.data ?? {}, // Asegura que siempre sea un objeto
      completed: stepToEdit.completed ?? false,
    });
  };
  

  const handleEdit = async () => {
    if (!activeStep) return;

    const stepToEdit = tracking.steps.find((step: any) => step.step_name === activeStep);
    if (!stepToEdit) return;

    try {
      const response = await fetch(`/api/tracking_steps/${stepToEdit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setTracking((prevTracking: any) => ({
          ...prevTracking,
          steps: prevTracking.steps.map((step: any) =>
            step.id === stepToEdit.id ? data.tracking_step : step
          ),
        }));
        setIsEditing(false);
      } else {
        console.error("Error al editar el paso:", data.error);
      }
    } catch (error) {
      console.error("Error en PATCH:", error);
    }
  };

  useEffect(() => {
    fetchTrackingDetails();
  }, [tracking_number]);

  useEffect(() => {
    if (tracking && activeStep && isEditing) {
      initializeFormData();
    }
  }, [tracking, activeStep, isEditing]);

  if (!tracking) {
    return <p className="text-center mt-8">Cargando ...</p>;
  }

  const activeStepData = tracking.steps?.find((step: any) => step.step_name === activeStep)?.data;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Detalles del Tracking: {tracking.tracking_number}
      </h1>

      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-3xl">
        <p><strong>Tipo de Carga:</strong> {tracking.cargo_type}</p>
        <p><strong>Estado:</strong> {tracking.status}</p>
        <p><strong>Fecha de Llegada:</strong> {tracking.arrival_date}</p>
      </div>

      {user?.role === "admin" && (
        <button
          onClick={() => router.push(`/es/tracking/${tracking_number}/create-step`)}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Crear Paso
        </button>
      )}

      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {steps.map((step) => {
          const stepInfo = tracking.steps?.find((s: any) => s.step_name === step);
          return (
            <button
              key={step}
              onClick={() => {
                setActiveStep(step);
                setIsEditing(false);
              }}
              className={`px-4 py-2 rounded-md ${
                stepInfo?.completed ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-700"
              }`}
            >
              {step}
            </button>
          );
        })}
      </div>
        
      {activeStep && tracking.steps?.filter((step: any) => step.step_name === activeStep).map((step: any) => (
        <div key={step.id} className="mt-6 w-full max-w-3xl bg-white p-6 rounded-md shadow-md">
          {Object.entries(step.data).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong>{" "}
              {typeof value === "string" && value.startsWith("data:image") ? (
                <a
                href={activeStepData.pagos_proforma}
                download="imagen_proforma.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline cursor-pointer"
              >
                Ver imagen
              </a>

              ) : (
                String(value)
              )}
            </p>
          ))}
          <p><strong>Completado:</strong> {step.completed ? "Sí" : "No"}</p>

          {user?.role === "admin" && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              {isEditing ? "Cancelar Edición" : "Editar Paso"}
            </button>
          )}

          {isEditing && (
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                handleEdit(); 
              }} 
              className="mt-4 space-y-4 w-full"
            >
              {formData.data && Object.entries(formData.data).length > 0 ? (
                Object.entries(formData.data).map(([key, value]) => {
                  // Detectar tipo de campo
                  const isDateField = key.toLowerCase().includes("fecha");
                  const isFileField = key.toLowerCase().includes("pdf") || key.toLowerCase().includes("imagen");

                  return (
                    <div key={key} className="flex flex-col">
                      <label className="text-gray-700 font-medium">{key}</label>

                      {isDateField ? (
                        // Campo de Fecha
                        <input
                          type="date"
                          value={String(value)}
                          onChange={(e) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              data: { ...prev.data, [key]: e.target.value },
                            }))
                          }
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : isFileField ? (
                        // Campo de Subida de Archivos
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData((prev: any) => ({
                                  ...prev,
                                  data: { ...prev.data, [key]: reader.result },
                                }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        // Campo de Texto Normal
                        <input
                          type="text"
                          value={String(value)}
                          onChange={(e) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              data: { ...prev.data, [key]: e.target.value },
                            }))
                          }
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 italic">No hay datos para editar.</p>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.completed}
                  onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700 font-medium">Completado</label>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          )}

        </div>
      ))}
    </div>
  );
}
