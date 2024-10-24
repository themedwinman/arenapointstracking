import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { houses } from '@/db/schema/houses'; // Import the houses schema

// This API route is used to fetch all houses

const getHouses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch all houses
    const data = await db.select().from(houses).execute();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching houses data:', error);
    res.status(500).json({ error: 'Error fetching houses data' });
  }
};

export default getHouses;