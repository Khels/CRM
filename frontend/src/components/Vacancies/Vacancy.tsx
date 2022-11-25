import { ListItem, ListItemProps, ListItemText, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from "react";
import { vacancyStore } from "../../store/vacancy";
import { useNavigate } from "react-router-dom";

export interface IVacancyProps extends Omit<ListItemProps, "id"> {
  title: string;
  id: number;
}

export const Vacancy: FC<IVacancyProps> = ({ title, id, ...props }) => {

  const navigate = useNavigate();
  
  const removeItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    vacancyStore.delete(id);
    navigate('/vacancies/');
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
