import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./constants";
import { MainPage } from "./pages/Main";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.MAIN} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};
