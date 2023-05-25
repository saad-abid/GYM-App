const express = require("express");
const Workout = require("../models/workoutModel");

//workout router import
const workoutRouter = express.Router();

//controller functions
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updatedWorkout,
  deleteWorkout
} = require("../controller/workoutController");

//importing middleware
const requireAuth = require('../middleware/requireAuth')

//require auth for all workouts 
workoutRouter.use(requireAuth)

//get all workouts
workoutRouter.get("/", getAllWorkouts);

//get single workout
workoutRouter.get("/:id", getSingleWorkout);

//add single workout
workoutRouter.post("/", createWorkout);

//delete workout
workoutRouter.delete("/:id",deleteWorkout);

//update workout
workoutRouter.patch("/:id",  updatedWorkout);

module.exports = workoutRouter;
