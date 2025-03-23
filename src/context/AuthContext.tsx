
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define types for our auth state and context
type User = {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in local storage on mount
    const storedUser = localStorage.getItem('faithconnect_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('faithconnect_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulating API call - in a real app, this would be a fetch to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (would normally be done server-side)
      if (email === "test@example.com" && password === "password") {
        const newUser = {
          id: "user1",
          email,
          name: "Test User",
          profileImage: "/images/placeholder.svg"
        };
        
        setUser(newUser);
        localStorage.setItem('faithconnect_user', JSON.stringify(newUser));
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, we'd send this data to an API
      const newUser = {
        id: `user${Math.floor(Math.random() * 1000)}`,
        email,
        name,
      };
      
      setUser(newUser);
      localStorage.setItem('faithconnect_user', JSON.stringify(newUser));
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('faithconnect_user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
