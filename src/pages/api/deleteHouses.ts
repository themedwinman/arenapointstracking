import { NextApiRequest, NextApiResponse } from "next";
import { eq } from 'drizzle-orm';
import { db } from "@/db";
import { students } from "@/db/schema/students";
import { houses } from "@/db/schema/houses";

export default async function deleteHouses(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { houseName } = req.body;

  if (!houseName) {
    return res.status(400).json({ error: 'Missing House Name' });
  }

  try {
    // Use Drizzle ORM to delete the students where the house matches
    await db.delete(students).where(eq(students.house, houseName)).execute();

    // Use Drizzle ORM to delete the house where the house name matches
    await db.delete(houses).where(eq(houses.houseName, houseName)).execute();

    // Return a success response
    return res.status(200).json({ message: 'House and associated students deleted successfully' });
  } catch (error) {
    console.error('Error deleting house and students:', error);
    return res.status(500).json({ error: 'Failed to delete house and students' });
  }
}