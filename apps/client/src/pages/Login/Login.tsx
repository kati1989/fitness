import theme from "@/theme";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const Login = () => {
  return (
    <Stack gap={2}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", color: theme.palette.text.secondary }}
      >
        Log In
      </Typography>
      <TextField id="email" label="Email" type="email" />
      <TextField id="password" label="Password" type="password" />
      <FormControlLabel control={<Checkbox />} label="Remember me" />
      <Button type="submit" variant="contained">
        Log in
      </Button>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <NavLink to={"/reset-password"}>
          <Typography variant="body2" color={"primary.main"}>
            Forgot password
          </Typography>
        </NavLink>
        <NavLink to={"/register"}>
          <Typography variant="body2" color={"primary.main"}>
            Don't have an account? Register
          </Typography>
        </NavLink>
      </Stack>
    </Stack>
  );
};
