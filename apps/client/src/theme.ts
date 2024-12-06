import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

const theme = createTheme({
  shadows: [
    "none",
    `0px 1px 3px ${alpha("#000", 0.1)}, 0px 1px 2px ${alpha("#000", 0.06)}`,
    `0px 1px 5px ${alpha("#000", 0.12)}, 0px 2px 4px ${alpha("#000", 0.08)}`,
  ],
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
  palette: {
    // primary: {
    //   main: "#0061C2",
    // },
    divider: "#E8EAEE",
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

export default theme;
