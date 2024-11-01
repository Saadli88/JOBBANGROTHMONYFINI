import  { useState } from "react";
import { useCandidatContext } from "./useCandidatContext"; 

export const useConnexionCandidat = () => {

const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const {dispatch} = useCandidatContext()


const connexionCad = async (

    email_candidat,
    mot_de_passeCandidat)=> {
        setIsLoading(true)
        setError(null)

        const response  = await fetch('/api/candidat/loginCandidat' , {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              
                email_candidat,
                mot_de_passeCandidat})

        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
                localStorage.setItem('candidat', JSON.stringify(json))

                dispatch ({type:'LOGINCANDIDAT' , payload:json})

                setIsLoading(false)

        }

    }

    return {connexionCad, isLoading, error}

} 






