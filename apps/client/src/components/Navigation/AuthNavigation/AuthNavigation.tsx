import { NavLink } from "react-router-dom";
import { Stack, Typography, useTheme } from "@mui/material";
import { navigationStyles } from "@/components/Navigation/Navigation.styles";
import { UserMenu } from "@/components/Navigation/AuthNavigation/components/UserMenu";

export const AuthNavigation = () => {
  const theme = useTheme();
  const styles = navigationStyles(theme);
  return (
    <Stack sx={styles.stack}>
      <NavLink
        to="/profile"
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
        to="/gyms"
        style={({ isActive }) =>
          isActive
            ? { ...styles.navLink, ...styles.navLinkActive }
            : styles.navLink
        }
      >
        <Typography variant="body1">
          <b>Gyms</b>
        </Typography>
      </NavLink>

      <UserMenu />
    </Stack>
  );
};
