import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { points } from '@/db/schema/points';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
}