import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PATH } from "./constants";
import MainPage from "./pages/Main";
import { SignInPage } from "./pages/SignIn";
import { SignUpPage } from "./pages/SignUp";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.MAIN} element={<MainPage />} />
        <Route path={PATH.SIGN_IN} element={<SignInPage />} />
        <Route path={PATH.SIGN_UP} element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};
