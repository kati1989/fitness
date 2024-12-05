import { AppRouter } from "@/app-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
