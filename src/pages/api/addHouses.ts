import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { houses } from '@/db/schema/houses';
interface HouseData {
  houseName: string;
  houseColour: string;
  houseTotalPoints: number;
}
// This API route is used to add a house
async function addHouse(house: HouseData) {
  try {
    // Add some logging to debug the incoming data
    console.log('Inserting house:', house);
    
    // Insert data into the 'houses' table, auto-increment ID
    await db.insert(houses).values({
      houseName: house.houseName,
      houseColour: house.houseColour,
      houseTotalPoints: house.houseTotalPoints,
    });
    
    console.log('House inserted successfully');
  } catch (error) {
    // Log detailed error information
    console.error('Database Insertion Error:', error);
    throw new Error('Failed to add house');
  }
};

//The handler for the API route (middelman between the client and the database)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { houseName, houseColour } = req.body;

    try {
      // Log request body for debugging
      console.log('Request body:', req.body);
      console.log('House name:', houseName);
      console.log('House colour:', houseColour);

      // Call the addHouse function with request data
      await addHouse({
        houseName,
        houseColour,
        houseTotalPoints: 0,
      });

      // Send a success response
      return res.status(200).json({ message: 'House added successfully' });
    } catch (error) {
      // Log the error to debug it better
      console.error('Error adding house:', error);
      return res.status(500).json({ error: 'Failed to add house' });
    }
  } else {
    // Handle methods other than POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}