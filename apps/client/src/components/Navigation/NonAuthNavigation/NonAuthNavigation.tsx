import { NavLink } from "react-router-dom";
import { Stack, Typography, useTheme } from "@mui/material";
import { navigationStyles } from "@/components/Navigation/Navigation.styles";

export const NonAuthNavigation = () => {
  const theme = useTheme();
  const styles = navigationStyles(theme);
  return (
    <Stack sx={styles.stack}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive
            ? { ...styles.navLink, ...styles.navLinkActive }
            : styles.navLink
        }
      >
        <Typography variant="body1">
          <b>Home</b>
        </Typography>
      </NavLink>
      <NavLink
        to="/log-in"
        style={({ isActive }) =>
          isActive
            ? { ...styles.navLink, ...styles.navLinkActive }
            : styles.navLink
        }
      >
        <Typography variant="body1">
          <b>Log In</b>
        </Typography>
      </NavLink>
      <NavLink
        to="/register"
        style={({ isActive }) =>
          isActive
            ? { ...styles.navLink, ...styles.navLinkActive }
            : styles.navLink
        }
      >
        <Typography variant="body1">
          <b>Register</b>
        </Typography>
      </NavLink>
    </Stack>
  );
};
