import theme from "@/theme";
import { Box, Container } from "@mui/material";
import { FC } from "react";

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: theme.palette.divider }}>
      <Container maxWidth="md">
        <header>{children}</header>
      </Container>
    </Box>
  );
};
