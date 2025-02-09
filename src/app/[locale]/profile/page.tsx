"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "es";

  const [loading, setLoading] = useState(true);

  // ✅ Espera hasta que el usuario esté cargado antes de redirigir
  useEffect(() => {
    if (user === null) {
      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 100);
    } else {
      setLoading(false);
    }
  }, [user, router, locale]);

  if (loading) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Rol:</strong> {user?.role}</p>
    </div>
  );
}
