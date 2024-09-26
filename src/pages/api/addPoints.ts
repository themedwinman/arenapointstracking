import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { eq, sql } from 'drizzle-orm';
import { points } from '@/db/schema/points';
import { houses } from '@/db/schema/houses';

export default async function addPoints(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { studentId, houseId, points: pointsValue, action } = req.body;

  if (!studentId || !houseId || !pointsValue || !action) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Determine if we are adding or removing points
    const isAddingPoints = action === 'add points';
    console.log(isAddingPoints)
    console.log('House Id:' + houseId)
    // Update the points table
    await db.insert(points).values({
      associatedStudent: studentId,
      associatedHouse: houseId,
      pointsGained: isAddingPoints ? pointsValue : 0,
      pointsLost: isAddingPoints ? 0 : pointsValue,
    }).execute();
  
    // Update the house's total points
    await db.update(houses)
      .set({
        houseTotalPoints: sql`${houses.houseTotalPoints} + ${isAddingPoints ? pointsValue : -pointsValue}`
      })
      .where(eq(houses.id, houseId))
      .execute();
  
    // Return a success response
    return res.status(200).json({ message: 'Points updated successfully' });
  } catch (error) {
    console.error('Error updating points:', error);
    return res.status(500).json({ error: 'Failed to update points' });
  }
}