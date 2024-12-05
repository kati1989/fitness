import { NavLink } from "react-router-dom";
import { Stack, Typography, useTheme } from "@mui/material";
import { navigationStyles } from "./Navigation.styles";

export const Navigation = () => {
  const theme = useTheme(); // Access the theme
  const styles = navigationStyles(theme); // Generate styles based on the theme

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
        <Typography variant="button">
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
        <Typography variant="button">
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
        <Typography variant="button">
          <b>Register</b>
        </Typography>
      </NavLink>
    </Stack>
  );
};
