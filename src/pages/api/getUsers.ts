import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm'; // Replace 'some-library' with the actual library name

export default async function getUserByEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const user = await db.select().from(users).where(eq(users.email, email)).get();
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}