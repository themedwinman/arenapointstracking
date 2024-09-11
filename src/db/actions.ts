"use server"


import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { points } from '@/db/schema/points';
import { students } from './schema/students';

export async function addPoints(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { selectedHouse, selectedStudent, action, pointsValue, eventDescription } = req.body;

    console.log('Received data:', { selectedHouse, selectedStudent, action, pointsValue, eventDescription });

    try {
      // Construct the SQL query
      const query = db.insert(points).values({
        associatedHouse: selectedHouse,
        associatedStudent: selectedStudent ? selectedStudent.id : 'No Student Linked', // Handle optional studentId
        pointsGained: action === 'add' ? pointsValue : 0,
        pointsLost: action === 'remove' ? pointsValue : 0,
      });

      // Execute the SQL query
      await query.execute();

      res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error('Database Insertion Error:', error);
      res.status(500).json({ error: 'Failed to add data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

interface Student {
  studentName: string;
  surname: string;
  studentId: string;
  house: string;
}

export async function addStudents(student: Student) {
  try {
    // Construct the SQL query
    const query = db.insert(students).values({
      name: student.studentName,
      surname: student.surname,
      studentId: student.studentId,
      house: student.house,
    });

    // Execute the SQL query
    await query.execute();
  } catch (error) {
    console.error('Database Insertion Error:', error);
    throw new Error('Failed to add student');
  }
}
export async function removeStudent(studentId: string) {
  try {
    // Construct the SQL query
    const query = db.delete(students).where({ studentId });

    // Execute the SQL query
    await query.execute();
  } catch (error) {
    console.error('Database Deletion Error:', error);
    throw new Error('Failed to remove student');
  }
}


