const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext()

const AuthContextProvider = ({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        cookie:''
    })
    useEffect(()=>{
        const data=localStorage.getItem('auth')
        if(data){
            const parseData=JSON.parse(data)
            setAuth(
                {
                    ...auth,
                    user:parseData.user,
                    cookie:parseData.cookie,
                }
            )
        }
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