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
      <Link to={`/${id}`}>{`${last_name} ${first_name} ${middle_name}`}</Link>
    ),
    contacts: (
      <>
        <div>{phone_number}</div>
        <div>{email}</div>
      </>
    ),
    position: position?.name,
  };
}

export const CandidatePage = observer(() => {
  const params = useParams();
  const [candidates, setCandidates] = useState<Candidate[]>();
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
      // @ts-ignore
      setCandidates(candidatesStore.candidates?.value.data);
    }

    return candidates?.map((candidate) => createData(candidate));
  }, [params?.vacancyId, candidatesStore.candidates?.state]);

  return (
    <TableContainer component={Paper} sx={{ width: "100%", height: "100vh" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell align="right">Контакты</TableCell>
            <TableCell align="right">Прошлая должность</TableCell>
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
              <TableCell align="right">{row?.position}</TableCell>
              <TableCell align="right">{row?.contacts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
