import  { useState } from "react";
import { useCandidatContext } from "./useCandidatContext"; 

export const useInscriptionCandidat = () => {

const [error, setError] = useState(null)
const [isLoading, setIsLoading] = useState(null)
const {dispatch} = useCandidatContext()


const inscriptionCad = async (
    nom_candidat, 
    email_candidat,
    mot_de_passeCandidat)=> {
        setIsLoading(true)
        setError(null)

        const response  = await fetch('/api/candidat/signupCandidat' , {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nom_candidat, 
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



        }

    }

    return {inscriptionCad, isLoading, error}

} 






