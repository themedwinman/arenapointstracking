import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

// This API route is used to fetch a user role by email

export const getUserRole = async (email: string): Promise<string> => {
  console.log("Fetching user role from database for email:", email);

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get();

    console.log("Database query result:", user);

    if (!user) {
      console.log("No user found for email:", email);
      return "user";
    }
    // Check if the user is a superadmin, admin, or regular user
    if (user.superadmin === true) {
      return "superadmin";
    } else if (user.admin === true) {
      return "admin";
    } else {
      return "user";
    }
  } catch (error) {
    console.error("Error querying database:", error);
    throw new Error("Database query failed");
  }
};



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;

    console.log("Received POST request with email:", email);

    if (!email) {
      // Return an error if the email is missing
      return res.status(400).json({ error: "Email is required" });
    }

    try {
      // Fetch user role
      const role = await getUserRole(email);
      console.log("Fetched user role:", role);
      res.status(200).json({ role });
    } catch (error) {
      console.error("Error fetching user role:", error);
      res.status(500).json({ error: "Failed to fetch user role" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;