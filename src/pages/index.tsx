import scss from "../components/Layout/Layout.module.scss";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Dashboard from "@/pages/dashboard";
import Login from "@/components/login/Login";
import { exportedDbUser } from "@/pages/api/auth/[...nextauth]"; // Import the exported dbUser

interface HomeProps {
  userRole: string | null;
}

console.log("exportedDbUser:", exportedDbUser); // Add logging

const Home: React.FC<HomeProps> = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const session = await getSession();
      console.log("Session data:", session); // Add logging

      if (session?.user?.email) {
        console.log("Using exportedDbUser for permissions:", exportedDbUser); // Add logging

        if (exportedDbUser?.superadmin === true) {
          setUserRole("superadmin");
        } else if (exportedDbUser?.admin === true) {
          setUserRole("admin");
        } else {
          setUserRole("user");
        }
      } else {
        console.log("No email found in session"); // Add logging
      }

      setLoading(false);
    };

    fetchUserRole();
  }, []);

  const getUserPermissions = (role: string | null) => {
    if (role === "superadmin") {
      return ["superadmin"];
    } else if (role === "admin") {
      return ["admin"];
    } else {
      return ["user"];
    }
  };

  const userPermissions = getUserPermissions(userRole);
  console.log("User permissions:", userPermissions); // Add logging

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={scss.main}>
      {userRole ? <Dashboard userRole={userRole} /> : <Login />}
    </main>
  );
};

export default Home;