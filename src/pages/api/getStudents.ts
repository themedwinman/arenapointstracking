import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { students } from '@/db/schema/students';

export interface Student {
  id: string;
  name: string;
  surname: string;
  studentId: string;
  house: string;
}

const getStudents = async (): Promise<Student[]> => {
  try {
    const fetchStudents = await db.select().from(students).execute();
    console.log(fetchStudents)
    return fetchStudents.map((student: any) => ({
      id: student.id as string,
      name: student.name as string,
      surname: student.surname as string,
      studentId: student.studentId as string,
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
    console.log('Students api side:', students);
    res.status(200).json(students); // Send the students as JSON response
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

export default handler;