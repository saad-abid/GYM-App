import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import useWorkoutContext from "../hooks/useWorkoutContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const fieldStyle = {
  display: "block",
  marginTop: 3,
};
const paperStyle = {
  width: 600,
  maxWidth: "100%",
  margin: "0 auto",
  padding: 2,
};

function Create() {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [empetyFields, setEmpetyFields] = useState([]);
  const theme = createTheme();

  const { dispatch } = useWorkoutContext();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();
  
  // sending post request
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setEmpetyFields([]);

    if(!user){
      setError("You must be logged in")
      return ;
    }

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization' : `Bearer ${user.token}`
          
        },
        body: JSON.stringify({ title, reps, load }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("this fired");
        console.log(data.empetyFileds);
        setEmpetyFields(data.empetyFileds);
        setLoading(false);
        setError(data.error);
      }
      if (response.ok) {
        setLoading(false);
        dispatch({ type: "CREATE_WORKOUT", payload: data });
        Navigate("/");
      }
    } catch (error) {
      console.log(" catch fired");
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ ...paperStyle }} elevation={0}>
        <form onSubmit={submitHandler} noValidate autoComplete="off">
          <TextField
            required
            fullWidth
            sx={{ ...fieldStyle }}
            type="text"
            label="Title"
            value={title}
            error={empetyFields.includes("title")}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></TextField>

          <TextField
            required
            fullWidth
            sx={{ ...fieldStyle }}
            type="number"
            label="Reps"
            value={reps}
            error={empetyFields.includes("reps")}
            onChange={(e) => {
              setReps(e.target.value);
            }}
            InputProps={{
              inputProps: { min: 1, max: 10 },
            }}
          ></TextField>

          <TextField
            required
            fullWidth
            sx={{ ...fieldStyle }}
            label="Load"
            type="number"
            error={empetyFields.includes("load")}
            value={load}
            onChange={(e) => {
              setLoad(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
              inputProps: { min: 1, max: 60 },
            }}
          ></TextField>

          {loading && (
            <Button
              disabled
              sx={{ ...fieldStyle }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          )}
          {!loading && (
            <Button sx={{ ...fieldStyle }} variant="contained" type="submit">
              Submit
            </Button>
          )}

          {error && (
            <Box>
              <Typography
                variant="error"
                sx={{
                  color: theme.palette.error.main,
                  border: 1,
                  padding: 2,
                  marginTop: 2,
                  display: "block",
                }}
              >
                {" "}
                {error}
              </Typography>
            </Box>
          )}
        </form>
      </Paper>
    </ThemeProvider>
  );
}

export default Create;
