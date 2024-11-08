import { EmploiContext} from "../context/EmploiContext";
import { useContext } from "react";



export const useEmploiContext =() => {
    const context = useContext(EmploiContext)

    if(!context){
        throw Error( 'UseEmploiContext dois e4tre utiliser dedans EmploiContextProvider')
    
    }

    return context
}




















