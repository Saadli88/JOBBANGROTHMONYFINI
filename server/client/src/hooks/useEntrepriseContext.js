import { EntrepriseContext} from "../context/EntrepriseContext";
import { useContext } from "react";



export const useEntrepriseContext =() => {
    const context = useContext(EntrepriseContext)

    if(!context){
        throw Error( 'UseEntrepriseContext dois e4tre utiliser dedans EntrepriseContextProvider')
    
    }

    return context
}




















