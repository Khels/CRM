import { ListItem, ListItemText } from "@mui/material";
import { FC } from "react";

export interface IVacancyProps {
  title: string;
}

export const Vacancy: FC<IVacancyProps> = ({ title }) => {
  return (
    <ListItem>
      <ListItemText primary={title}></ListItemText>
    </ListItem>
  );
};
