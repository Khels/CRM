import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./constants";
import { MainLayout } from "./layouts/MainLayout";
import { Candidate } from "./pages/Candidatate/Candidate";
import { CandidatePage } from "./pages/Candidatate/Candidates";
import { VacanciesPage } from "./pages/Main/Vacancies";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.MAIN} element={<MainLayout />}>
          <Route index></Route>
          <Route path={PATH.VACANCIES} element={<VacanciesPage />}>
            <Route index></Route>
            <Route path={PATH.CANDIDATES} element={<CandidatePage />}></Route>
          </Route>
        </Route>
        <Route path={PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
        <Route
          path={PATH.CANDIDATE.INDEX + PATH.CANDIDATE.ID}
          element={<Candidate />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
