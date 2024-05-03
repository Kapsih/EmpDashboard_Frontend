import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios"
export const useLogin = ()=>{
    const [error,setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const login = async(email,password) =>{
        setisLoading(true)
        setError(null)

        await axios.post("http://localhost:5000/auth/login",{
            email: email,
            password: password
          })
        .then((res)=>{
                localStorage.setItem('user',JSON.stringify(res.data))
                dispatch({type: 'LOGIN', payload: res.data})
                setisLoading(false)
        })
        .catch((err)=>{
            setisLoading(false)
            setError(err)
        })
    }

    return {login, isLoading,error}
}