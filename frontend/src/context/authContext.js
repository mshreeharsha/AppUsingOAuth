const { createContext, useState, useContext } = require("react");

const AuthContext = createContext()

const AuthContextProvider = ({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        cookie:''
    })

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