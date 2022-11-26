import { useMemo, useState } from "react";
import {
  Toolbar,
  IconButton,
  Modal,
  Box,
  Tooltip,
  Typography,
  Grid,
  Table,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import { candidatesStore } from "../../../store/candidate";
import { observer } from "mobx-react-lite";
import { Candidate } from "../../../api/v1/models";
import { Loader } from "../../../components/common/Loader";
import { PATH } from "../../constants";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import { CandidateForm } from "../../../components/CandidateForm";

function createData({
  id,
  first_name,
  middle_name,
  last_name,
  phone_number,
  email,
  position,
}: Candidate) {
  return {
    id,
    fio: (
      <Link
        to={`/${PATH.CANDIDATE.INDEX + id}`}
      >{`${last_name} ${first_name} ${middle_name}`}</Link>
    ),
    contacts: (
      <>
        <Grid
          container
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "right",
          }}
        >
          <Tooltip title="Перейти в WhatsApp">
            <a
              target="_blank"
              style={{ color: "#45c554" }}
              href={`https://wa.me/+${phone_number}`}
            >
              <WhatsAppIcon />
            </a>
          </Tooltip>
          <Tooltip title="Перейти в Telegram">
            <a
              target="_blank"
              style={{ color: "#1c93e3" }}
              href={`https://t.me/+${phone_number}`}
            >
              <TelegramIcon />
            </a>
          </Tooltip>
          <Tooltip title={email}>
            <a style={{ color: "#178ed8" }} href={`mailto:${email}`}>
              <EmailIcon />
            </a>
          </Tooltip>
          <Tooltip title={`Позвонить +${phone_number}`}>
            <a style={{ color: "#185ed9" }} href={`tel:+${phone_number}`}>
              <LocalPhoneIcon />
            </a>
          </Tooltip>
        </Grid>
      </>
    ),
    position: position?.name,
  };
}

export const CandidatePage = observer(() => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);

  const params = useParams();
  const getCandidatesFromURL = async () => {
    const query = new URLSearchParams();
    // TODO:
    // @ts-ignore
    query.append("position", params?.vacancyId);

    await candidatesStore.getAllCandidatesByVacancyId(query.toString());
  };

  useMemo(() => {
    getCandidatesFromURL();
  }, [params?.vacancyId]);

  const rows = useMemo(() => {
    if (candidatesStore.candidates?.state === "fulfilled") {
      const candidates = [...candidatesStore.candidates?.value?.data];
      // @ts-ignore
      return candidates?.map((candidate) => createData(candidate));
    }

    return [];
  }, [params?.vacancyId, candidatesStore.candidates?.state]);

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Tooltip title="Добавить кандидата">
          <IconButton onClick={handleOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <TableContainer component={Paper} sx={{ width: "100%", height: "100vh" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell align="right">Контакты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidatesStore.candidates?.state === "pending" && <Loader />}
            {rows?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.fio}
                </TableCell>
                <TableCell align="left">{row?.contacts}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal keepMounted open={isOpenModal} onClose={handleClose}>
        <CandidateForm></CandidateForm>
      </Modal>
    </>
  );
});
