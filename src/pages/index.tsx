import scss from "../components/Layout/Layout.module.scss";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Dashboard from "@/pages/dashboard";
import Login from "@/components/login/Login";

interface HomeProps {
  userRole: string | null;
}

const Home: React.FC<HomeProps> = () => {
  const { data: session, status } = useSession();
  const [userRole, setUserRole] = useState<string | null>(null);

  console.log("Session status:", status); // Add logging
  console.log("Session data:", session); // Add logging

  useEffect(() => {
    const fetchUserRole = async () => {
      if (session?.user?.email) {
        const email = session.user.email;
        console.log("Fetching user role for email:", email); // Add logging

        try {
          const response = await fetch("/api/getUserRole", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });

          console.log("API response status:", response.status); // Add logging

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("API response data:", data); // Add logging

          setUserRole(data.role); // Ensure to access the role property
          console.log("Set userRole:", data.role); // Add logging
        } catch (error) {
          console.error("Error fetching user role:", error); // Add logging
        }
      } else {
        console.log("No email found in session"); // Add logging
      }
    };

    if (status === "authenticated") {
      fetchUserRole();
    } else {
      console.log("User is not authenticated"); // Add logging
    }
  }, [session, status]);

  console.log("userRole before rendering:", userRole); // Add logging

  return (
    <main className={scss.main}>
      {session && userRole && <Dashboard userRole={userRole} />}
      {!session && <Login />}
    </main>
  );
};

export default Home;