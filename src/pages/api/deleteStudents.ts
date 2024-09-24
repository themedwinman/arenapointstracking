

// Import Drizzle ORM methods and types
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { students } from '@/db/schema/students';

import { NextApiRequest, NextApiResponse } from 'next'; // Or Express types if you're using Express

export default async function deleteStudents(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ error: 'Missing studentId' });
  }

  try {
    // Use Drizzle ORM to delete the student where the student ID matches
    await db.delete(students).where(eq(students.studentId, studentId));

    // Return a success response
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return res.status(500).json({ error: 'Failed to delete student' });
  }
}
