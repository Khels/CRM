import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useState } from "react";
import { candidatesStore } from "../store/candidate";

interface ICandidateFormProps {}

export const CandidateForm: FC<ICandidateFormProps> = observer(({}) => {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData);

    console.log(userData);

    await candidatesStore.add({
      ...userData,
      sex: Number(userData.sex),
      position_id: Number(userData.position_id),
      phone_number: Number(userData.phone_number),
    });
    // TODO:
    // @ts-ignore\
  };

  return (
    <>
      <Typography variant="h4">Новый пользователь</Typography>
      <Box
        component={"form"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          width: "100%",
          maxWidth: 600,
          pl: 4,
          pr: 4,
          pt: 10,
          pb: 10,
          gap: 1,
          display: "grid",
          borderRadius: 2,
        }}
        onSubmit={onSubmit}
      >
        <Box
          sx={{
            display: "flex",
            maxWidth: "100%",
            marginTop: "20px",
            flexDirection: "column",
          }}
        >
          <TextField
            id="first_name"
            label="Имя"
            name="first_name"
            sx={{ width: "80%", marginBottom: "10px" }}
            required
            type="text"
            autoComplete="off"
          />
          <TextField
            id="last_name"
            label="Фамилия"
            name="last_name"
            sx={{ width: "80%", marginBottom: "10px" }}
            required
            type="text"
            autoComplete="off"
          />
          <TextField
            id="middle_name"
            label="Отчество"
            name="middle_name"
            sx={{ width: "80%", marginBottom: "10px" }}
            required
            type="text"
            autoComplete="off"
          />
          <TextField
            id="phone_number"
            label="Номер Телефона"
            name="phone_number"
            sx={{ width: "80%", marginBottom: "10px" }}
            required
            type="number"
            autoComplete="off"
          />
          <TextField
            id="position_id"
            label="Номер Телефона"
            name="position_id"
            sx={{ width: "80%", marginBottom: "10px" }}
            required
            type="number"
            autoComplete="off"
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            sx={{ width: "80%", marginBottom: "10px" }}
            required
            type="text"
            autoComplete="off"
          />
          {/* <Checkbox value={} name="sex" id="sex" label="" required></Checkbox> */}
          <RadioGroup name="sex" id="sex" row>
            <FormControlLabel value={1} control={<Radio />} label="Жен." />
            <FormControlLabel value={2} control={<Radio />} label="Муж." />
          </RadioGroup>
        </Box>
        <Button type="submit">Добавить</Button>
      </Box>
    </>
  );
});
