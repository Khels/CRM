import { FC, useState } from "react";
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
  Divider,
} from "@mui/material";
import { vacancyStore } from "../../store/vacancy";
import { observer } from "mobx-react-lite";

interface IVacancyFormProps {
  closeModal: () => void
}

export const VacancyForm: FC<IVacancyFormProps> = observer(({closeModal}) => {

  const [text, setText] = useState<string>("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = { name: formData.get("vacancy") };

    // TODO:
    // @ts-ignore
    vacancyStore.add(userData);
    setText("");
    closeModal();
  };

  return (
    <Box
      component={"form"}
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        width: "100%",
        maxWidth: 360,
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
      <Typography
        id="keep-mounted-modal-title"
        variant="h5"
        component="h2"
        textAlign={"center"}
        sx={{ mb: 3 }}
      >
        Новая вакансия
      </Typography>
      {/* <Divider /> */}
      <TextField
        required
        fullWidth
        inputRef={input => input && input.focus()}
        type="text"
        name="vacancy"
        label="Название вакансии"
        id="vacancy"
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Добавить
      </Button>
    </Box>
  );
});
