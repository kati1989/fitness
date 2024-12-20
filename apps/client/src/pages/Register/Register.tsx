import { useState } from "react";
import { Button, Stack, TextField, Typography, Alert } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useRegister } from "@/services/useAuth";

export const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const { data, isError, isLoading, sendRequest } = useRegister();

  const handleRegister = () => {
    if (!firstname || !lastname || !email || !password || !retypePassword) {
      alert("All fields are required");
      return;
    }

    if (password !== retypePassword) {
      alert("Passwords do not match");
      return;
    }

    sendRequest({ firstname, lastname, email, password });
  };

  return (
    <Stack gap={2} sx={{ maxWidth: 400, margin: "0 auto" }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Register
      </Typography>
      {isError && <Alert severity="error">{isError}</Alert>}
      {data && (
        <Alert severity="success">{JSON.stringify(data?.data?.success)}</Alert>
      )}
      <TextField
        id="first-name"
        label="First Name"
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <TextField
        id="last-name"
        label="Last Name"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id="retype-password"
        label="Retype Password"
        type="password"
        value={retypePassword}
        onChange={(e) => setRetypePassword(e.target.value)}
      />
      <Button type="button" variant="contained" onClick={handleRegister}>
        {isLoading ? "Registering..." : "Register"}
      </Button>
      <NavLink to="/log-in">
        <Typography variant="body2">Already have an account? Log In</Typography>
      </NavLink>
    </Stack>
  );
};
