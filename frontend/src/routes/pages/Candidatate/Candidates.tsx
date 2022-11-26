import { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import { candidatesStore } from "../../../store/candidate";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Candidate } from "../../../api/v1/models";
import { Loader } from "../../../components/common/Loader";
import { PATH } from "../../constants";
import { Grid, Tooltip } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

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
          <Tooltip title="Перейти в Telegram">
            <a target="_blank" href={`https://t.me/+${phone_number}`}>
              <TelegramIcon />
            </a>
          </Tooltip>
          <Tooltip title="Перейти в WhatsApp">
            <a target="_blank" href={`https://wa.me/+${phone_number}`}>
              <WhatsAppIcon />
            </a>
          </Tooltip>
          <Tooltip title={`Позвонить +${phone_number}`}>
            <a href={`tel:+${phone_number}`}>
              <LocalPhoneIcon />
            </a>
          </Tooltip>
          <Tooltip title={email}>
            <a href={`mailto:${email}`}>
              <EmailIcon />
            </a>
          </Tooltip>
        </Grid>
      </>
    ),
    position: position?.name,
  };
}

export const CandidatePage = observer(() => {
  const params = useParams();
  const getCandidatesFromURL = async () => {
    const query = new URLSearchParams();
    // TODO:
    // @ts-ignore
    query.append("position", params?.vacancyId);

    await candidatesStore.get(query.toString());
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
  );
});
