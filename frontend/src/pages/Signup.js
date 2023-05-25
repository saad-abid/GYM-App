import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const defaultTheme = createTheme();

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, isLoading, error} = useSignup();

    // console.log(isLoading, error)

 const submitHander = async (event)=>{
    event.preventDefault(); 
    console.log(email, password)
    await signup(email, password)

    // const data = new FormData(event.currentTarget)
    // console.log(data);
    // console.log('email: ', data.get('email'), 
    //     'password', data.get('password')
    // )

 }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "theme.secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box
            component="form"
            onSubmit={submitHander}
            noValidate
            autoComplete="off"
            sx={{ width: "100%" }}
          >
            <TextField
            onChange={(e)=>{setEmail(e.target.value)}}
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
              onChange={(e)=>{setPassword(e.target.value)}}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign up
            </Button>
            {error && <Box sx={{ borderRadius: 1 ,border: 1, p: 1.4, mt: 2, borderColor: 'error.main', bgcolor: 'error.light', color: '#fff'}}>{error}</Box>}
          </Box>    
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
