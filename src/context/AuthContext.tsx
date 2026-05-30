"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (userData: any) => {
    setUser(userData);
  };


  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {

    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/getuser");

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};