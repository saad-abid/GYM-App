import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";
import { red } from "@mui/material/colors";

function WorkoutCard({ workout, deleteHandler }) {
  const borderStyle = {
    borderLeft: 5,
    borderColor: red[500],
    borderRadius: 1,
  };
  return (
    <Card
      sx={{ display: "flex", justifyContent: "space-between" }}
      elevation={0}
    >
      <Box sx={{ padding: 2 }}>
        <CardContent sx={{ ...borderStyle }}>
          <Typography sx={{ color: "#333" }} variant="h5" component="h1">
            Title: {workout.title}
          </Typography>
          <Typography sx={{ color: "#777" }} variant="body2">
            Reps: {workout.reps}
          </Typography>
          <Typography sx={{ color: "#999" }} variant="body2">
            Load: {workout.load}
          </Typography>
        </CardContent>
      </Box>
      <CardHeader
        action={
          <IconButton onClick={()=>{deleteHandler(workout._id)}} >
            <DeleteOutlinedIcon />
          </IconButton>
        }
      ></CardHeader>
    </Card>
  );
}

export default WorkoutCard;
