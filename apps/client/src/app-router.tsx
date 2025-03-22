import { CommonLayout } from "@/layouts/common-layout";
import { Home } from "@/pages/Home";
import { Register } from "@/pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Login } from "@/pages/Login";
import { AuthenticationLayout } from "@/layouts/authentication-layout";
import { NotFound } from "./pages/NotFound/NotFound";
import { Gyms } from "./pages/Gyms";
import { Gym } from "@/pages/Gyms/views/Gym";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/pages/Profile";
import { Subscription } from "./pages/Subscription";

const membershipDurations = ["monthly", "yearly"] as const;
export type MembershipDuration = (typeof membershipDurations)[number];

// Wrapper for public routes
const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/gyms" replace /> : <Outlet />;
};

// Wrapper for private routes
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/log-in" replace />;
};

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route element={<CommonLayout showFooter />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<CommonLayout />}>
            <Route element={<AuthenticationLayout />}>
              <Route path="/log-in" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Route>
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<CommonLayout showFooter paddingTop />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/gyms" element={<Gyms />} />
            {Object.values(membershipDurations).includes(
              new URLSearchParams(window.location.search).get(
                "duration"
              ) as MembershipDuration
            ) && <Route path="/subscription/:id" element={<Subscription />} />}
          </Route>
          <Route element={<CommonLayout showFooter fullScreen />}>
            <Route path="/gyms/:id" element={<Gym />} />
          </Route>
        </Route>

        {/* Catch-all for 404 */}
        <Route element={<CommonLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
