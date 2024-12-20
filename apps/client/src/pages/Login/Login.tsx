import { useLogin } from "@/services/useAuth";
import theme from "@/theme";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, isError, isLoading, sendRequest } = useLogin();

  useEffect(() => {
    f();
  }, []);

  const f = async () => {
    const result = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "user@example.com",
        password: "securepassword123",
      }),
    });

    const data = await result.json();
    console.log(data);
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    sendRequest({ email, password });
  };

  return (
    <Stack gap={2}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", color: theme.palette.text.secondary }}
      >
        Log In
      </Typography>
      {isError && <Alert severity="error">{isError}</Alert>}
      {data && (
        <Alert severity="success">{JSON.stringify(data?.data?.success)}</Alert>
      )}
      <TextField
        id="email"
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel control={<Checkbox />} label="Remember me" />
      <Button
        type="submit"
        variant="contained"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
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
