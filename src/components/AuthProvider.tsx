"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

// Definir la estructura del contexto de autenticación
interface AuthContextType {
  user: { email: string; role: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Definir los props del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "es";

  // 🔄 Función para obtener usuario desde el servidor
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/verify");
      const data = await res.json();
      console.log("🔎 Verificando sesión:", data);
      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Cargar sesión al iniciar
  useEffect(() => {
    fetchUser();
  }, []);

  // 🔐 Función para iniciar sesión
  const login = async (email: string, password: string): Promise<void> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      await fetchUser(); // ✅ Cargar usuario inmediatamente después del login
      router.push(`/${locale}/profile`);
    } else {
      throw new Error("Error en login");
    }
  };

  // 🚪 Función para cerrar sesión
  const logout = async (): Promise<void> => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push(`/${locale}/login`);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children} {/* 🔄 Esperar a que termine la carga antes de renderizar */}
    </AuthContext.Provider>
  );
}

// Hook para acceder al contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
