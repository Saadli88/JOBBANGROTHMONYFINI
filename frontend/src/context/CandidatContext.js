import { createContext, useReducer , useEffect} from "react";



export const CandidatContext = createContext()

export const candidatReducer = (state,action)=>{

switch(action.type) {
    case 'LOGINCANDIDAT':
        return {candidat : action.payload}

    case 'LOGOUTCANDIDAT':
        return {candidat: null}

    default:
        return state
}

}

export const CandidatContextProvider =({children}) => {

const [state,dispatch] = useReducer(candidatReducer, {
    candidat:null
})


useEffect(()=> {

    const candidat = JSON.parse(localStorage.getItem('candidat'))
    if(candidat){
        dispatch({type:'LOGINCANDIDAT', payload: candidat})
    }

}, [])

console.log('CandidatContext: ', state)


return(

    <CandidatContext.Provider value={{...state, dispatch}}>

    {children}

    </CandidatContext.Provider>
)


}




