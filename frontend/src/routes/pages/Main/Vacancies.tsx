import { FC, useState } from "react";
import { Vacancies } from "../../../components/Vacancies/Vacancies";
import {
  Paper,
  Grid,
  TextField,
  IconButton,
  Button,
  Modal,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import { vacancyStore } from "../../../store/vacancy";
import { observer } from "mobx-react-lite";
import AddIcon from "@mui/icons-material/Add";
import { Loader } from "../../../components/common/Loader";
import { VacancyForm } from "../../../components/Vacancies/VacancyForm";
import { Outlet } from "react-router-dom";

interface IVacanciesPageProps {}

export const VacanciesPage: FC<IVacanciesPageProps> = observer(({}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);

  const vacansy = vacancyStore.vacancies;

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item sx={{ width: 320 }}>
        <Paper
          sx={{ height: "100%", maxHeight: "100vh", overflow: "auto", p: 1 }}
        >
          <Grid container alignItems={"center"} justifyContent="space-between">
            <Grid>
              <TextField
                required
                fullWidth
                name="vacancy"
                label="Поиск вакансии"
                type="vacancy"
                id="vacancy"
                autoComplete="vacancy"
                onChange={(event) => {
                  const query = new URLSearchParams();
                  query.append("q", event.target.value);

                  vacancyStore.query = query.toString();
                  vacancyStore.get();
                }}
              />
            </Grid>
            <Grid>
              <Tooltip title="Создать вакансию">
                <Button onClick={handleOpen}>
                  <IconButton color="default" aria-label="add to shopping cart">
                    <AddIcon />
                  </IconButton>
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          {vacansy?.case({
            pending: () => <Loader />,
            fulfilled: (v) => <Vacancies vacancies={v.data}></Vacancies>,
          })}
        </Paper>
      </Grid>
      <Grid item>
        <Grid sx={{ width: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
      <Modal keepMounted open={isOpenModal} onClose={handleClose}>
        <VacancyForm closeModal={handleClose}></VacancyForm>
      </Modal>
    </Grid>
  );
});
