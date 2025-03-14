import { AppRouter } from "@/app-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { ErrorProvider } from "./contexts/ErrorContext";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <ErrorProvider>
            <AppRouter />
          </ErrorProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
