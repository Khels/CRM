import { ListItem, ListItemProps, ListItemText } from "@mui/material";
import { FC } from "react";
import { vacancyStore } from "../../store/vacancy";

export interface IVacancyProps extends ListItemProps {
  title: string;
  id: number;
}

export const Vacancy: FC<IVacancyProps> = ({ title, id, ...props }) => {
  
  const removeItem = () => {
    vacancyStore.delete(id);
  };

  return (
    <ListItem {...props}>
      <ListItemText primary={title}></ListItemText>
      <Tooltip title="Удалить вакансию">
        <IconButton onClick={removeItem}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};
