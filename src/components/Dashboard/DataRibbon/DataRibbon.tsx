import Data from "@/pages/dashboard/data";
import DataCard from "../DataCard";
import React from "./index";
import { Grid } from "@mui/material";
import scss from "./DataRibbon.module.scss";

const DataRibbon = () => {
    return (
 <Grid container gap={2} className={scss.dataRibbon}>
      <Grid>
        <DataCard
          title={"Total Braddock Points"}
          value={"1000"}
          description={
            "Total amount of Braddock's House Points this year"
          }
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Total Cook Points"}
          value={"1000"}
          description={"Total amount of Cook's House Points this year"}
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Total Darby Points"}
          value={"1000"}
          description={
            "Total amount of Darby's House Points this year"
          }
        />
      </Grid>
      <Grid>
        <DataCard
        title={"Total Youngman Points"}
        value={"10000"}
        description={"Total amount of Youngman's House Points this year"}
        />
      </Grid>
    </Grid>


    )};

export default DataRibbon;
