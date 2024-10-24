import { Paper } from "@mui/material";
import scss from "./DataCard.module.scss";
import React from "react";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


// Defines the properties entered into the DataCard component such as the title, value and description which can be passed through based on what 
export type DataCardProps = {
    title: string;
    value: string;
    description: string;
  };
  
  // DataCard component which displays the title, value and description of the data card
  const DataCard = (props: DataCardProps) => {
    const { title, value, description } = props;
    return (
      // Paper component is used to create a surface to display the data card
      <Paper className={scss.dataCard}>
        <div className={scss.header}>
          <Typography fontSize={"h6"} color={"lightslategrey"}>
            {title}
          </Typography>
          <Tooltip
            title={
              <Typography
                fontSize={16}
              >{`${description} which is ${value}`}</Typography>
            }
          >
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Typography fontSize={"h4"}>{value}</Typography>
      </Paper>
    );
  };

export default DataCard;