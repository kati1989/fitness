import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const AuthenticationLayout = () => {
  return (
    <Container maxWidth="xs" sx={{ pt: 10 }}>
      <Outlet />
    </Container>
  );
};
