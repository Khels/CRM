import { ListItem, ListItemProps, ListItemText } from "@mui/material";
import { FC } from "react";

export interface IVacancyProps extends ListItemProps {
  title: string;
}

export const Vacancy: FC<IVacancyProps> = ({ title, ...props }) => {
  return (
    <ListItem {...props}>
      <ListItemText primary={title}></ListItemText>
    </ListItem>
  );
};
