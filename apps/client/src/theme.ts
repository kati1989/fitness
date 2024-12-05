import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1D1E21",
    },
    secondary: {
      main: "#FFD1BF",
    },
    text: {
      primary: "#1D1E21",
      secondary: "#B76379",
    },
    background: {
      default: "#ffffff",
      paper: "#EEEEEE",
    },
    error: {
      main: "#B76379",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

export default theme;
