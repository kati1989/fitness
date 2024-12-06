import theme from "@/theme";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Register = () => {
  return (
    <Stack gap={2}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", color: theme.palette.text.secondary }}
      >
        Register
      </Typography>
      <Stack direction={"row"} gap={2}>
        <TextField id="first-name" label="First name" type="text" />
        <TextField id="last-name" label="Last name" type="text" />
      </Stack>
      <TextField id="email" label="Email" type="email" />
      <TextField id="password" label="Password" type="password" />
      <TextField id="password" label="Retype your password" type="password" />
      <Button type="submit" variant="contained">
        Register
      </Button>
      <Stack direction="row" justifyContent="space-between">
        <NavLink to="/log-in">
          <Typography variant="body2" color="primary.main">
            Already have an account? Log In
          </Typography>
        </NavLink>
      </Stack>
    </Stack>
  );
};
