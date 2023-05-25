import { createContext, useReducer } from "react";

export const workoutContext = createContext();
const workotuReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workouts: action.payload };

    case "CREATE_WORKOUT":
      return { workouts: [...state.workouts, action.payload] };

    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workotuReducer, { workouts: [] });

  return (
    <workoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </workoutContext.Provider>
  );
};
