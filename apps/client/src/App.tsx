import { AppRouter } from "@/app-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { ErrorProvider } from "./contexts/ErrorContext";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorProvider>
          <AppRouter />
        </ErrorProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
