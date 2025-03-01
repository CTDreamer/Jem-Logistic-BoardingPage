"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Importa usePathname

export default function CreateTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [userId, setUserId] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Obtén la ruta actual
  const locale = pathname.split("/")[1] || "es"; // Extrae el locale de la ruta (por ejemplo, "es")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const requestData = {
      tracking_number: trackingNumber,
      status,
      arrival_date: arrivalDate,
      user_id: userId,
      cargo_type: cargoType,
      transport_mode: transportMode,
    };

    try {
      const response = await fetch("/api/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Tracking creado exitosamente");
        setTimeout(() => {
          router.push(`/${locale}/tracking`); // Redirigir a la página de búsqueda de trackings con el locale
        }, 1500);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error al crear el tracking");
    }
  };

  // Opciones de modo de transporte según el tipo de carga
  const transportOptions = cargoType === "FCL"
    ? [{ value: "maritimo", label: "Marítimo" }] // Solo marítimo para FCL
    : [
        { value: "maritimo", label: "Marítimo" },
        { value: "aereo", label: "Aéreo" },
      ]; // Marítimo y aéreo para LCL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Crear Tracking</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
        {/* Tracking Number */}
        <div className="mb-4">
          <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
            Conocimiento de Embarque
          </label>
          <input
            id="trackingNumber"
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <input
            id="status"
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Arrival Date */}
        <div className="mb-4">
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">
            Fecha de Llegada
          </label>
          <input
            id="arrivalDate"
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* User ID */}
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            ID de Usuario
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Cargo Type */}
        <div className="mb-4">
          <label htmlFor="cargoType" className="block text-sm font-medium text-gray-700">
            Tipo de Carga
          </label>
          <select
            id="cargoType"
            value={cargoType}
            onChange={(e) => {
              setCargoType(e.target.value);
              setTransportMode(""); // Resetear el modo de transporte al cambiar el tipo de carga
            }}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Selecciona</option>
            <option value="FCL">FCL</option>
            <option value="LCL">LCL</option>
          </select>
        </div>

        {/* Transport Mode */}
        <div className="mb-4">
          <label htmlFor="transportMode" className="block text-sm font-medium text-gray-700">
            Modo de Transporte
          </label>
          <select
            id="transportMode"
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            disabled={!cargoType} // Deshabilitar si no se ha seleccionado un tipo de carga
          >
            <option value="">Selecciona</option>
            {transportOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Crear Tracking
        </button>
      </form>

      {/* Mensaje de error */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Mensaje de éxito */}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
    </div>
  );
}