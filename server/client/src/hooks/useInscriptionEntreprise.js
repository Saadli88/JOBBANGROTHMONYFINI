import  { useState } from "react";
import { useEntrepriseContext } from "./useEntrepriseContext"; 




export const useInscriptionEntreprise = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useEntrepriseContext()


    const inscriptionEnt = async (
        nom_entreprise, 
        nom_employeur,
        email_entreprise,
        telephone,
        adresse,
        mot_de_passeEntreprise)=> {
            setIsLoading(true)
            setError(null)

            const response  = await fetch('/api/entreprise/inscriptionEntreprise', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nom_entreprise, 
                    nom_employeur,
                    email_entreprise,
                    telephone,
                    adresse,
                    mot_de_passeEntreprise})
            })

            const json = await response.json()

            if(!response.ok){
                setIsLoading(false)
                setError(json.error)
            }
            if(response.ok){
    
                    localStorage.setItem('entreprise', JSON.stringify(json))

                    dispatch ({type:'LOGINENTREPRISE' , payload:json})

                    setIsLoading(false)


            }
    
        }

        return {inscriptionEnt, isLoading, error}

        }







