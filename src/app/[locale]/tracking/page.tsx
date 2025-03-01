"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function TrackingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "es";

  const [trackings, setTrackings] = useState<any[]>([]);
  const [filters, setFilters] = useState({ trackingNumber: "", date: "", filterType: "trackingNumber" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Estado para el indicador de carga al eliminar

  useEffect(() => {
    if (user === null) {
      router.push(`/${locale}/login`);
    }
  }, [user, router, locale]);

  const fetchTrackings = async () => {
    setError(null);
    setLoading(true);

    try {
      let url = "/api/tracking";

      if (filters.filterType === "trackingNumber" && filters.trackingNumber) {
        url = `/api/tracking/${filters.trackingNumber}`;
      } else if (filters.filterType === "date" && filters.date) {
        url = `/api/tracking?arrival_date=${filters.date}`;
      } else {
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setTrackings([]);
      } else {
        setTrackings(Array.isArray(data) ? data : [data]);
      }
    } catch (error) {
      console.error("Error fetching trackings:", error);
      setError("Error al obtener los envíos");
      setTrackings([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    if ((filters.filterType === "trackingNumber" && !filters.trackingNumber) || (filters.filterType === "date" && !filters.date)) {
      setError(`Debe proporcionar un ${filters.filterType === "trackingNumber" ? "Conocimiento de Embarque" : "fecha"}`);
      return;
    }
    fetchTrackings();
  };

  const resetFilters = () => {
    setFilters({ trackingNumber: "", date: "", filterType: "trackingNumber" });
    setError(null);
    setTrackings([]);
    setHasSearched(false);
  };

  const isAdmin = user?.role === "admin";

  // Eliminar tracking
  const handleDelete = async (trackingToDelete: any) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/tracking/${trackingToDelete.tracking_number}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedTrackings = trackings.filter(
          (t) => t.tracking_number !== trackingToDelete.tracking_number
        );
        setTrackings(updatedTrackings);
        // Reiniciamos hasSearched para que el mensaje "No se encontraron envíos" no se muestre automáticamente
        if (updatedTrackings.length === 0) {
          setHasSearched(false);
        }
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("Error al eliminar el tracking:", error);
      setError("Error al eliminar el tracking");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Seguimiento de Envíos</h1>

      {/* Filtros */}
      <div className="flex flex-col gap-4 mb-6 w-full max-w-3xl">
        <select
          name="filterType"
          value={filters.filterType}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
        >
          <option value="trackingNumber">Buscar por Conocimiento de Embarque</option>
          <option value="date">Buscar por Fecha</option>
        </select>

        {filters.filterType === "trackingNumber" && (
          <input
            type="text"
            name="trackingNumber"
            value={filters.trackingNumber}
            onChange={handleFilterChange}
            placeholder="Ingrese el Conocimiento de Embarque"
            className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
          />
        )}

        {filters.filterType === "date" && (
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
          />
        )}

        <div className="flex gap-2 justify-center">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Buscar
          </button>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Mensajes de error */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Lista de trackings */}
      <div className="w-full max-w-3xl">
        {loading ? (
          <p className="text-center text-blue-800">Cargando...</p>
        ) : hasSearched && trackings.length === 0 ? (
          <p className="text-center text-gray-700">No se encontraron envíos con esos filtros.</p>
        ) : trackings.length > 0 ? (
          trackings.map((tracking) => (
            <div key={tracking.id} className="border border-gray-300 p-4 rounded-md mb-4 bg-white shadow-lg">
              <h3 className="font-bold text-lg text-blue-800">Conocimiento de Embarque: {tracking.tracking_number}</h3>
              <p><strong>Estado:</strong> {tracking.status}</p>
              <p><strong>Tipo de Carga:</strong> {tracking.cargo_type}</p>
              <p><strong>Tipo de Transporte:</strong> {tracking.transport_mode}</p>
              <p><strong>Fecha de Llegada:</strong> {tracking.arrival_date}</p>

              <h4 className="mt-4 font-semibold text-blue-800">Pasos:</h4>
              <ul className="list-inside list-disc">
                {tracking.steps?.map((step: any) => (
                  <li key={step.id}>
                    <strong>{step.step_name}</strong> - {step.completed ? "Completado" : "Pendiente"}
                  </li>
                ))}
              </ul>

              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() =>
                    router.push(
                      `/${locale}/tracking/${tracking.tracking_number}?data=${encodeURIComponent(
                        JSON.stringify(tracking)
                      )}`
                    )
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Ver detalles
                </button>

                {/* Botones de Eliminar y Editar solo para Admin */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => router.push(`/${locale}/tracking/edit/${tracking.tracking_number}`)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(tracking)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                      disabled={isDeleting} // Deshabilitar el botón mientras se elimina
                    >
                      {isDeleting ? "Eliminando..." : "Eliminar"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : null}
      </div>

      {/* Botones de admin */}
      {isAdmin && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push(`/${locale}/tracking/create-tracking`)}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Crear Tracking
          </button>
        </div>
      )}
    </div>
  );
}