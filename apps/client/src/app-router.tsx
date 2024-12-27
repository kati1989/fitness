import { CommonLayout } from "@/layouts/common-layout";
import { Home } from "@/pages/Home";
import { Register } from "@/pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { AuthenticationLayout } from "@/layouts/authentication-layout";
import { NotFound } from "./pages/NotFound/NotFound";
import { Gyms } from "./pages/Gyms";
import { Gym } from "@/pages/Gyms/views/Gym";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CommonLayout showFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<CommonLayout showFooter paddingTop />}>
          <Route path="/gyms" element={<Gyms />} />
        </Route>

        <Route element={<CommonLayout showFooter fullScreen />}>
          <Route path="/gyms/:id" element={<Gym />} />
        </Route>
        <Route element={<CommonLayout />}>
          <Route element={<AuthenticationLayout />}>
            <Route path="/log-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
