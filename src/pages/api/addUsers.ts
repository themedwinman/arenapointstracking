import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { users } from '@/db/schema/users';


async function addUser(email: string, name: string, surname: string) {
  try {
    // Construct the SQL query with dynamic values from the user object
    const query = db.insert(users).values({
      email: email as string, // Use actual values from the user object
      name: name as string,
      admin: false,
      superadmin: false,
    });

    // Execute the SQL query
    await query.run(); // `run()` instead of `execute()` in Drizzle for inserts
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Failed to add user');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, name, surname } = req.body;
    try {
      await addUser(email, name, surname);
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}