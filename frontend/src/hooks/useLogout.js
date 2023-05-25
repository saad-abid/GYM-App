import { useAuthContext } from "./useAuthContext"

export const useLogout = ()=>{
    const {dispatch} = useAuthContext();

    const logout = ()=>{

        //remove user from local storange
        localStorage.removeItem('user')

        dispatch({type: "LOGOUT"})

    }

    return {logout }
}