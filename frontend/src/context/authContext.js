import axios from 'axios'

const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext()

const AuthContextProvider = ({children})=>{
    const [auth,setAuth]=useState({
        user:null
    })
    useEffect(()=>{
        // const data=localStorage.getItem('auth')
        // if(data){
        //     const parseData=JSON.parse(data)
        //     setAuth(
        //         {
        //             user:parseData
        //         }
        //     )
        // }
        axios.get('/auth/google/login-success').then((response)=>{
            if(response.data.success){
                setAuth({user:response.data.user})
            }
        }).catch((error)=>{
            setAuth({user:null})
            console.log(error.message)
        })
        // eslint-disable-next-line
    },[])
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = ()=>{
    return useContext(AuthContext)
}

export {useAuthContext,AuthContextProvider}