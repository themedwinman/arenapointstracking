import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { students } from '@/db/schema/students';

export interface Student {
  id: string;
  name: string;
  surname: string;
  studentId: number;
  house: string;
}

const getStudents = async (): Promise<Student[]> => {
  try {
    const fetchStudents = await db.select().from(students).execute();
    return fetchStudents.map((student: any) => ({
      id: student.id as string,
      name: student.student_name as string,
      surname: student.surname as string,
      studentId: student.student_id as number,
      house: student.house as string,
    }));
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw new Error('Failed to fetch students');
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const students = await getStudents();
    res.status(200).json(students); // Send the students as JSON response
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

export default handler;