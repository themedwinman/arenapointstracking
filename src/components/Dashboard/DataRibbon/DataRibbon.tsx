import Data from "@/pages/dashboard/data";
import DataCard from "../DataCard";
import React from "./index";
import { Grid } from "@mui/material";
import scss from "./DataRibbon.module.scss";
import { TotalPointsArray } from "@/components/dataCache";
import { houses } from "@/helper/Util";

const DataRibbon = () => {
  return (
    <Grid container gap={2} className={scss.dataRibbon} sx={{ "--columns": `repeat(clamp(1, ${houses.length},6), minmax(0, 1fr))` }}>
      {houses.map((house, index) => (
        <Grid key={index}>
          <DataCard
            title={`Total ${house} Points`}
            value={String(TotalPointsArray[index])}
            description={`Total amount of ${house} House Points this year`}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DataRibbon;