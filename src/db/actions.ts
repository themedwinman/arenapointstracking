import { db } from '@/db'; // Ensure these imports are correct
import { students } from '@/db/schema/students'; // Ensure this import is correct
import { NextApiRequest, NextApiResponse } from 'next';
import { points } from '@/db/schema/points';
import { eq } from 'drizzle-orm';
import { Student } from '@/pages/api/getStudents';
import getStudents from '@/pages/api/getStudents';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { equal } from 'assert';

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






export const handleRemoveStudent = async (studentId: string): Promise<void> => {
  try {
    const response = await db.delete(students).where(eq(students.studentId, studentId)).execute();
    console.log(`Student with id ${studentId} deleted successfully`);
  } catch (error) {
    console.error('Database Deletion Error:', error);
    throw new Error('Failed to delete student');
  }
};