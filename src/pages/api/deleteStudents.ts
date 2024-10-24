import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { students } from '@/db/schema/students';

import { NextApiRequest, NextApiResponse } from 'next'; // Or Express types if you're using Express
import { points } from '@/db/schema/points';

export default async function deleteStudents(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ error: 'Missing studentId' });
  }

  console.log(`Received request to delete student with ID: ${studentId}`);

  try {
    // First, delete all points associated with the student
    const pointsDeleteResult = await db.delete(points).where(eq(points.associatedStudent, studentId)).execute();
    console.log(`Points delete result: ${JSON.stringify(pointsDeleteResult)}`);

    // Then delete the student record
    const studentDeleteResult = await db.delete(students).where(eq(students.id, studentId)).execute();
    console.log(`Student delete result: ${JSON.stringify(studentDeleteResult)}`);

    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return res.status(500).json({ error: 'Failed to delete student' });
  }
}