import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { houses } from '@/db/schema/houses';

interface HouseData {
  houseName: string;
  houseColour: string;
  houseTotalPoints: number;
}

async function addHouse(house: HouseData) {
  try {
    const query = db.insert(houses).values({
      houseName: house.houseName,
      houseColour: house.houseColour,
      houseTotalPoints: house.houseTotalPoints,
    });

    await query.run();
  } catch (error) {
    console.error('Database Insertion Error:', error);
    throw new Error('Failed to add house');
  }
};

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { houseName, houseColour, houseTotalPoints } = req.body;

    try {
      await addHouse({
        houseName,
        houseColour,
        houseTotalPoints,
      });

      return res.status(200).json({ message: 'House added successfully' });
    } catch (error) {
      console.error('Error adding house:', error);
      return res.status(500).json({ error: 'Failed to add house' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}