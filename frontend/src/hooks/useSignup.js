import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch }= useAuthContext();

  const signup = async (email, password) => {
    try{
    setIsloading(true);
    setError(null);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });

    const json = await response.json();
    
    if (!response.ok) { 
       setIsloading(false);
    //    console.log(json.error)
       setError(json.error);
    }

    if (response.ok) {
      //setting local storange
      localStorage.setItem("user", JSON.stringify(json));

      //dispatching for to set authcontext for global state
      dispatch({ type: "LOGIN", payload: json });
    
      //resetting the state
      setIsloading(true);
      setError(null);
    }
    }catch(error){
        //this will called if there is any error in syntax of request or etc
        // console.log("it reached here",error);
        setIsloading(false)
        setError(error.message)

    }
  
  }

  return { signup, isLoading, error };
};
