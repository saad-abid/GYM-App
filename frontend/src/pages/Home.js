import React, { useEffect} from "react";

//mui imports
import WorkoutCard from "../components/WorkoutCard";
import useWorkoutContext from "../hooks/useWorkoutContext";
import { Box } from "@mui/material";

//user auth context
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
//   const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();

  const {user} = useAuthContext();
  

   const deleteHandler = async (id) =>{
        if(!user){
           return  
        }

        const url = '/api/workouts/'+ id;
        try{
        const response = await fetch(url , {
            method: "DELETE",
            headers: {
              'Authorization' : `Bearer ${user.token}`
            }
        })

        if(response.ok){
            dispatch({type: "DELETE_WORKOUT", payload: id})
            console.log('removed')
        }
         }catch(error){
            console.log(error.message)
        }
   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/workouts", {
          headers: {
            'Authorization' : `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        if (!response.ok) {
          return new Error("Could not fetch");
        }
        if (response.ok) {
           dispatch({type: 'SET_WORKOUT', payload: data})
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    //if there is user then fetch this
    if(user){
    fetchData();
   }
  }, [dispatch, user]);

  return (
    <>
      {workouts &&
      workouts.map((workout) => (
          <WorkoutCard deleteHandler={deleteHandler} key={workout._id} workout={workout} />
        ))}
       {workouts.length === 0 && <Box sx={{textAlign: "center", m: 1, fontSize: '1.5rem'}}>No data available please add some</Box>}
   </>
  );
}

export default Home;
