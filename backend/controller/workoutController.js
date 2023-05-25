const Workout = require("../models/workoutModel");
const mongoose = require('mongoose')


//get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt : -1});

    res.json(workouts);
};

//get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({error: 'No such workout'})
  }
  const workout = await Workout.findById(id);
  
  if(!workout){
    return res.status(404).json({error: 'Cannot find workout!!' })
  }

  res.status(200).json(workout);
};


// create workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body;

  const empetyFileds = [];

  if(!title){
    empetyFileds.push('title')
  }
  if(!reps){
    empetyFileds.push('reps');
  }

  if(!load){
    empetyFileds.push('load');
  }

  if(empetyFileds.length > 0){
    console.log(empetyFileds)
     return res.status(400).json({error: 'Please fill all fields', empetyFileds})
  }

  try {
    const workout = await Workout.create(req.body);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//delete workout
const deleteWorkout = async (req, res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
     return res.status(404).json({error: "Sorry no such workout found!!"});
  }

  const workout = await Workout.findOneAndDelete({_id: id});

  if(!workout){
    return res.status(404).json({error: "No such workout!!"})
  }

  res.status(200).json(workout);

}

//updated workout

const updatedWorkout = async(req, res)=>{
    const {id} = req.params;

    console.log(id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, { ...req.body})

    if(!workout){
        console.log(workout)
        return res.status(404).json({error: "No sunch Workout!!"})
    }

    res.status(200).json(workout)
}

module.exports = {
    getAllWorkouts,
    getSingleWorkout, 
    createWorkout,
    updatedWorkout,
    deleteWorkout
}
