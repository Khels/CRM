import { List } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Position } from "../../api/v1/models";
import { Vacancy } from "./Vacancy";
import { vacancyStore } from "../../store/vacancy";

interface IVacancyItem extends Position {}

interface IVacanciesProps {
  defaultSelected?: Position;
  vacancies: IVacancyItem[];
}

export const Vacancies: FC<IVacanciesProps> = ({
  vacancies,
  defaultSelected,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedVacancy, setSelectedVacancy] = useState<number | undefined>(
    Number(params.vacancyId) || defaultSelected?.id
  );

  const onSelect = (id: number) => {
    navigate(`${id}/`);
    setSelectedVacancy(id);
  };

  return (
    <List>
      {vacancies.map(({ id, name }) => (
        <Vacancy
          selected={selectedVacancy === id}
          onClick={() => onSelect(id)}
          key={id}
          title={name}
		  id={id}
        />
      ))}
    </List>
  );
};
