
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User } from "@/types";
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just check if the email contains "@"
      if (!email.includes('@')) {
        throw new Error('Correo electrónico inválido');
      }
      
      // Simulate successful login
      const userData = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name: email.split('@')[0]
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast({
        title: "Inicio de sesión exitoso",
        description: "¡Bienvenido de vuelta!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error instanceof Error ? error.message : "Ocurrió un problema al iniciar sesión",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate email
      if (!email.includes('@')) {
        throw new Error('Correo electrónico inválido');
      }
      
      // Validate password
      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      
      // Simulate successful registration
      const userData = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast({
        title: "Registro exitoso",
        description: "¡Bienvenido a Sabor Burdeos!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error al registrarse",
        description: error instanceof Error ? error.message : "Ocurrió un problema al crear la cuenta",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      variant: "default",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
