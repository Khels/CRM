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

interface IVacanciesPageProps {}

export const VacanciesPage: FC<IVacanciesPageProps> = observer(({}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);

  const vacansy = vacancyStore.vacancies;

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid>
        <Paper sx={{ height: "100%" }}>
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
              {
                // TODO: AHHAHAHAHAHAH
              }
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
      <Grid></Grid>
      <Modal
        keepMounted
        open={isOpenModal}
        onClose={handleClose}

        // aria-labelledby="keep-mounted-modal-title"
        // aria-describedby="keep-mounted-modal-description"
      >
        <VacancyForm></VacancyForm>
      </Modal>
    </Grid>
  );
});
