"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function EditTrackingPage() {
  const { tracking_number } = useParams(); // tracking_number dinámico
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "es"; // Extraer locale del path

  const { user } = useAuth();

  const [tracking, setTracking] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga

  useEffect(() => {
    console.log("EditTrackingPage: tracking_number =", tracking_number);
    const fetchTracking = async () => {
      try {
        const res = await fetch(`/api/tracking/${tracking_number}`);
        const data = await res.json();
        console.log("Datos recibidos del API:", data);
        if (res.ok) {
          setTracking(data);
          setStatus(data.status);
          setCargoType(data.cargo_type);
          setTransportMode(data.transport_mode);
        } else {
          setError(data.error || "Error al cargar tracking");
        }
      } catch (err) {
        console.error("Error en fetchTracking:", err);
        setError("Error al cargar tracking");
      } finally {
        setLoading(false); // Desactivar el indicador de carga
      }
    };

    if (user?.role === "admin") {
      fetchTracking();
    } else {
      setError("No autorizado para editar este tracking");
      setLoading(false); // Desactivar el indicador de carga
    }
  }, [tracking_number, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`/api/tracking/${tracking_number}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          cargo_type: cargoType,
          transport_mode: transportMode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al editar tracking");
      } else {
        // Éxito: redirige a la lista de trackings usando el locale extraído
        router.push(`/${currentLocale}/tracking`);
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError("Error al editar tracking");
    }
  };

  if (!user) {
    return <p className="text-center mt-8">Cargando usuario...</p>;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg flex items-center justify-center h-64">
          <p className="text-center">Cargando tracking...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg flex items-center justify-center h-64">
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg flex items-center justify-center h-64">
          <p className="text-center">No se encontró el tracking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Tracking: {tracking_number}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tipo de Carga</label>
          <select
            value={cargoType}
            onChange={(e) => setCargoType(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="FCL">FCL</option>
            <option value="LCL">LCL</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Modo de Transporte</label>
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="maritimo">Marítimo</option>
            <option value="aereo">Aéreo</option>
          </select>
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}