import { db } from "@/db"; // Import your database connection
import { students } from "@/db/schema/students"; // Import your students table schema
import { Student } from "./getStudents"; // Assuming the Student type is defined in getStudents
import { NextApiRequest, NextApiResponse } from 'next';


async function addStudent(student: Student) {
  try {
    // Construct the SQL query with dynamic values from the student object
    const query = db.insert(students).values({
      name: student.name as string, // Use actual values from the student object
      surname: student.surname as string, // Ensure that 'surname' exists in the Student type
      studentId: student.studentId as string,
      house: student.house as string,
    });

    // Execute the SQL query
    await query.run(); // `run()` instead of `execute()` in Drizzle for inserts
  } catch (error) {
    console.error('Database Insertion Error:', error);
    throw new Error('Failed to add student');
  }
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, surname, studentId, house } = req.body;

    try {
      // Call the addStudent function to insert the student into the database
      await addStudent({
        name,
        surname,
        studentId,
        house,
        id: '' // Set id if necessary, otherwise let DB handle it
      });

      return res.status(200).json({ message: 'Student added successfully' });
    } catch (error) {
      console.error('Error adding student:', error);
      return res.status(500).json({ error: 'Failed to add student' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
