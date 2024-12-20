import { AppRouter } from "@/app-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme";
import { ErrorProvider } from "./contexts/ErrorContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorProvider>
        <AppRouter />
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default App;
