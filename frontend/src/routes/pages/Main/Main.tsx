import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { PATH } from "../../constants";
import { VacanciesPage } from "./Vacancies";

export default function MainPage() {
  return (
    <MainLayout>
      <Routes>
        {/* <Route index element={<MainPage />}></Route> */}
        <Route path={PATH.VACANCIES} element={<VacanciesPage />}></Route>
      </Routes>
    </MainLayout>
  );
}
