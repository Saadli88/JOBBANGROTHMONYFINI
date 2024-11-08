import { createContext, useReducer , useEffect} from "react";


export const EntrepriseContext = createContext()

export const entrepriseReducer = (state,action)=>{

switch(action.type) {
    case 'LOGINENTREPRISE':
        return {entreprise : action.payload}

    case 'LOGOUTENTREPRISE':
        return {entreprise: null}

    default:
        return state
}

}

export const EntrepriseContextProvider =({children}) => {

const [state,dispatch] = useReducer(entrepriseReducer, {
    entreprise:null
})

useEffect(()=> {
const entreprise = JSON.parse(localStorage.getItem('entreprise'))


if(entreprise){
dispatch({type: 'LOGINENTREPRISE', payload:entreprise })
}
}, [])

console.log('EntrepriseContext: ', state)


return(

    <EntrepriseContext.Provider value={{...state, dispatch}}>

        {children}

    </EntrepriseContext.Provider>
)

}











