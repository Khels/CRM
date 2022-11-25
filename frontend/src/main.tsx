import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes/Router";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/styles/base/reset.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Router />
  </React.StrictMode>
);
