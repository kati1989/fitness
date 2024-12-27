import { Box, Container, useTheme } from "@mui/material";

interface FooterProps {
  color: "primary" | "secondary";
}
export const Footer = ({ color }: FooterProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 3,
        backgroundColor:
          color === "primary"
            ? theme.palette.background.paper
            : theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">Footer</Container>
    </Box>
  );
};
