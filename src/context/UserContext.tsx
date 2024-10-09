import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSession } from "next-auth/react";
import { ExtendedUser } from '@/pages/api/auth/[...nextauth]';

interface UserContextProps {
  user: ExtendedUser | null;
  loading: boolean;
}

const UserContext = createContext<UserContextProps>({ user: null, loading: true });

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);