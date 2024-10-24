import scss from "../components/Layout/Layout.module.scss";
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Dashboard from "@/pages/dashboard";
import Login from "@/components/login/Login";
import { exportedDbUser, ExtendedUser } from "@/pages/api/auth/[...nextauth]";

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Fetch user role from the database
    const fetchUserRole = async () => {
      setSession(session);
      console.log("Session data:", session); // Add logging
      console.log("Session data:", session); // Add logging
      console.log("Session user:", session?.user); // Add logging

      if (session?.user) {
        // Get the user object from the session
        const user = session.user as ExtendedUser;
        console.log("User admin:", user.admin); // Add logging
        console.log("User superadmin:", user.superadmin); // Add logging
      } else {
        console.log("No user found in session"); // Add logging
      }

      setLoading(false);
    };

    fetchUserRole();
  }, []);

  console.log("exportedDbUser before rendering:", exportedDbUser); // Add logging

  if (loading) {
    // Show a loading indicator while the user role is being fetched
    return <div>Loading...</div>;
  }

  return (
    //show the dashboard if the user is logged in, otherwise show the login page
    <main className={scss.main}>
      {!session ? <Dashboard /> : <Login />}
    </main>
  );
};

export default Home;