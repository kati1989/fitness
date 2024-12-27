import { AppRouter } from "@/app-router";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";
import { ErrorProvider } from "./contexts/ErrorContext";

function App() {
  const theme = useTheme();
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
