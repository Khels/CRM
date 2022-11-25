import { List } from "@mui/material";
import { FC } from "react";
import { Position } from "../../api/v1/models";
import { Vacancy } from "./Vacancy";

interface IVacancyItem extends Position {}

interface IVacanciesProps {
  vacancies: IVacancyItem[];
}

export const Vacancies: FC<IVacanciesProps> = ({ vacancies }) => {
  return (
    <List>
      {vacancies.map(({ id, name }) => (
        <Vacancy key={id} title={name} />
      ))}
    </List>
  );
};
