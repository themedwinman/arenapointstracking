import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSession } from "next-auth/react";
import { ExtendedUser } from '@/pages/api/auth/[...nextauth]';

interface UserContextProps {
  user: ExtendedUser | null;
  loading: boolean;
}

// Create a context to store the user data
const UserContext = createContext<UserContextProps>({ user: null, loading: true });

interface UserProviderProps {
  children: React.ReactNode;
}

// UserProvider component which provides the user data to the application
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the user role from the session
    const fetchUserRole = async () => {
      const session = await getSession();
      if (session?.user) {
        const user = session.user as ExtendedUser;
        setUser(user);
      }
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  return (
    // Provide the user data to the application
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);