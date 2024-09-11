"use server"

// getStudents.ts
import { db } from '@/db';
import { students } from '@/db/schema/students';

interface Student {
  id: string;
  studentName: string;
  surname: string;
  studentId: string;
  house: string;
}

export const getStudents = async (): Promise<Student[]> => {
  try {
    const fetchStudents = await db.select().from(students).execute();
    return fetchStudents.map((student: any) => ({
        id: student.id as string,
        studentName: student.student_name as string,
        surname: student.surname as string,
        studentId: student.student_id as string,
        house: student.house as string,
    }));
  } catch (error) {
    console.error('Failed to fetch students:', error);
    throw new Error('Failed to fetch students');
  }
};