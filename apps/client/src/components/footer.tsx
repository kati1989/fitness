import { Box, Container, useTheme } from "@mui/material";

interface FooterProps {
  color: "primary" | "secondary";
}
export const Footer = ({ color }: FooterProps) => {
  const year = new Date().getFullYear();
  const theme = useTheme();
  return (
    <Box
      id={"footer"}
      sx={{
        py: 3,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container maxWidth="md">© {year} All rights reserved.</Container>
    </Box>
  );
};
