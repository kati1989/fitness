import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Navigation } from "@/components/Navigation";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

interface CommonLayoutProps {
  showFooter?: boolean;
}

export const CommonLayout = ({ showFooter }: CommonLayoutProps) => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <Container maxWidth="md" sx={{ pb: 3 }}>
        <Outlet />
      </Container>
      {showFooter && <Footer color="primary" />}{" "}
    </>
  );
};
