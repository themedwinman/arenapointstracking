import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db'; // Adjust the path as necessary
import { houses } from '@/db/schema/houses'; // Import the correct table schema

const getHouses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const housesData = await db.select().from(houses).all();
    res.status(200).json(housesData);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'Failed to fetch houses' });
  }
};

export default getHouses;