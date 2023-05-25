import {
  Container,
  TextField,
  ThemeProvider,
  createTheme,
  Box,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

//pages and react imports
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const defaultTheme = createTheme();

function Login() {
  //   const [formData, setFormData] = useState(new FormData());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const submitHandler = async (event) => {
    event.preventDefault();
    await login(email, password);

    // console.log(formData.get("email"), formData.get("password"));
    // setFormData(new FormData());
  };

  //   const handelInput = (event) => {
  //     const { name, value } = event.target;
  //     formData.set(name, value);

  //   };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            onSubmit={submitHandler}
            sx={{ width: "100%", mt: 1 }}
          >
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              sx={{ mt: 3, mb: 2 }}
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Sign In
            </Button>
            {error && (
              <Box
                sx={{
                  borderRadius: 1,
                  border: 1,
                  p: 1.4,
                  mt: 2,
                  borderColor: "error.main",
                  bgcolor: "error.light",
                  color: "#fff",
                }}
              >
                {error}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
