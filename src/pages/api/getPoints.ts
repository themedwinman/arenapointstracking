import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { points } from '@/db/schema/points'; // Import the points schema

const getPoints = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await db.select().from(points).execute();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching points data:', error);
    res.status(500).json({ error: 'Error fetching points data' });
  }
};

export default getPoints;