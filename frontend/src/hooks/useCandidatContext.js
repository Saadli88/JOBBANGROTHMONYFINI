import { CandidatContext} from "../context/CandidatContext";
import { useContext } from "react";



export const useCandidatContext =() => {
    const context = useContext(CandidatContext)

    if(!context){
        throw Error( 'UseCandidatContext dois e4tre utiliser dedans CandidatContextProvider')
    
    }

    return context
}




















