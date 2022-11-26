import {
  Box,
  Button,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Candidate as CandidateType } from "../../../api/v1/models";
import { Loader } from "../../../components/common/Loader";
import { candidatesStore } from "../../../store/candidate";

interface ICandidateProps {}

export const Candidate: FC<ICandidateProps> = observer(({}) => {
  const params = useParams();

  const candidate = candidatesStore.candidate;

  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [candidateInfo, setCandidateInfo] = useState<CandidateType>({} as CandidateType);


  useEffect(() => {
      getCandidate();
  }, []);

  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    candidatesStore.updateCondidate(candidateInfo);
  };

  const getCandidate = async () => {
    await candidatesStore.getCandidateById(Number(params.candidateId));
  };

  useMemo(() => {
    if(candidate?.state === "fulfilled") {
      setCandidateInfo(({...candidate?.value.data}))
    }
  }, [candidate?.value])


  return (
    <Box
      sx={{
        maxWidth: "1500px",
        padding: "0 40px",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: "50%",
          marginTop: "20px",
          flexDirection: "column",
        }}
      >
        {candidate?.state === "pending" && <Loader />}
        {candidate?.state === "fulfilled" && (
          <form onSubmit={handleSubmit}>
            <TextField
              id="firstName"
              label="Имя"
              name="firstName"
              sx={{ width: "80%", marginBottom: "10px" }}
              required
              type="text"
              autoComplete="off"
              value={candidateInfo.first_name}
              onChange={(e) =>
                setCandidateInfo((prevCandidateInfo) => ({
                  ...prevCandidateInfo,
                  first_name: e.target.value,
                }))
              }
              disabled={!isUpdateMode}
            />
            <TextField
              id="lastName"
              label="Фамилия"
              name="lastName"
              sx={{ width: "80%", marginBottom: "10px" }}
              required
              type="text"
              autoComplete="off"
              value={candidateInfo.last_name}
              onChange={(e) =>
                setCandidateInfo((prevCandidateInfo) => ({
                  ...prevCandidateInfo,
                  last_name: e.target.value,
                }))
              }
              disabled={!isUpdateMode}
            />
            <TextField
              id="middleName"
              label="Отчество"
              name="middleName"
              sx={{ width: "80%", marginBottom: "10px" }}
              required
              type="text"
              autoComplete="off"
              value={candidateInfo.middle_name}
              onChange={(e) =>
                setCandidateInfo((prevCandidateInfo) => ({
                  ...prevCandidateInfo,
                  middle_name: e.target.value,
                }))
              }
              disabled={!isUpdateMode}
            />
            <TextField
              id="phoneNumber"
              label="Номер Телефона"
              name="phoneNumber"
              sx={{ width: "80%", marginBottom: "10px" }}
              required
              type="text"
              autoComplete="off"
              value={candidateInfo.phone_number}
              onChange={(e) =>
                setCandidateInfo((prevCandidateInfo) => ({
                  ...prevCandidateInfo,
                  phone_number: e.target.value,
                }))
              }
              disabled={!isUpdateMode}
            />
            <TextField
              id="email"
              label="Email"
              name="email"
              sx={{ width: "80%", marginBottom: "10px" }}
              required
              type="text"
              autoComplete="off"
              value={candidateInfo.email}
              onChange={(e) =>
                setCandidateInfo((prevCandidateInfo) => ({
                  ...prevCandidateInfo,
                  email: e.target.value,
                }))
              }
              disabled={!isUpdateMode}
            />
            <RadioGroup name="controlled-radio-buttons-group" value={candidateInfo.sex} row>
              <FormControlLabel disabled value="1" control={<Radio />} label="Female" />
              <FormControlLabel disabled value="2" control={<Radio />} label="Male" />
            </RadioGroup>
            {isUpdateMode && (
              <Button type="submit" variant="contained" color="success">
                Подтвердить изменения
              </Button>
            )}
          </form>
        )}
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        {!isUpdateMode && (
          <Button onClick={() => setIsUpdateMode(true)} variant="contained">
            Обновить данные
          </Button>
        )}
      </Box>
    </Box>
  );
});
