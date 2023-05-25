import React, { useContext } from 'react'
import { workoutContext } from '../context/WorkoutContext';

export default function useWorkoutContext() {
  const context = useContext(workoutContext);

  if(!context){
        throw new Error("can't run context ")
  }

  return context;
}
