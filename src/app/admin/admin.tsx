"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login"); // Si no es admin, redirigir al login
    }
  }, [user, router]);

  if (!user || user.role !== "admin") return <p>Redirigiendo...</p>;

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user.email}</p>
    </div>
  );
}
