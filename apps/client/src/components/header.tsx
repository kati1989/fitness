import { Box, Container, useTheme } from "@mui/material";
import { FC } from "react";

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: theme.palette.divider,
        backgroundColor: "rgba(250, 250, 250, 0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Container maxWidth="md">
        <header>{children}</header>
      </Container>
    </Box>
  );
};
