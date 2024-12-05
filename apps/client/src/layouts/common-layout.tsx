import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Navigation } from "@/components/Navigation";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const CommonLayout = () => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Container maxWidth="md">
        <Outlet />
      </Container>
      <Footer color="primary" />
    </>
  );
};
