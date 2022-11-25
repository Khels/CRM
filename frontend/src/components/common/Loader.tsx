import { FC } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { Grid } from "@mui/material";

interface ILoaderProps {}

export const Loader: FC<ILoaderProps> = ({}) => {
  return (
    <Grid
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ height: "100%", width: "100%" }}
    >
      <LoopIcon />
    </Grid>
  );
};
