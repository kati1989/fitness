import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Navigation } from "@/components/Navigation";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

interface CommonLayoutProps {
  showFooter?: boolean;
  paddingTop?: boolean;
  fullScreen?: boolean;
}

export const CommonLayout = ({
  showFooter,
  paddingTop,
  fullScreen,
}: CommonLayoutProps) => {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      {fullScreen ? (
        <Outlet />
      ) : (
        <Container maxWidth="lg" sx={{ pb: 3, pt: paddingTop ? 3 : 0 }}>
          <Outlet />
        </Container>
      )}
      {showFooter && <Footer color="primary" />}{" "}
    </>
  );
};
