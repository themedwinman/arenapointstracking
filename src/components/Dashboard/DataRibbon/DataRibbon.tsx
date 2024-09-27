import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import DataCard from "../DataCard";
import scss from "./DataRibbon.module.scss";
import { TotalPointsArray } from "@/components/dataCache";

const DataRibbon = () => {
  interface House {
    id: number;
    houseName: string;
    houseTotalPoints: number;
  }
  
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('/api/getHouses');
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  return (
    <Grid container gap={2} className={scss.dataRibbon} sx={{ "--columns": `repeat(clamp(1, ${houses.length},6), minmax(0, 1fr))` }}>
      {houses.map((house, index) => (
        <Grid key={house.id}>
          <DataCard
            title={`Total ${house.houseName} Points`}
            value={String(house.houseTotalPoints)}
            description={`Total amount of ${house.houseName} House Points this year`}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DataRibbon;