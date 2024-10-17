import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq, or } from 'drizzle-orm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const adminUsers = await db.select().from(users)
          .where(or(eq(users.admin, true), eq(users.adminrequest, true)))
          .all();
          console.log("Admin users:", adminUsers);
        return res.status(200).json({ users: adminUsers });
      } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PUT':
      try {
        const { email, admin, adminrequest } = req.body;
        const updatedUser = await db.update(users)
          .set({ admin, adminrequest })
          .where(eq(users.email, email))
          .returning()
          .get();
        return res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user role:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}