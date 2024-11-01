import { useEntrepriseContext } from "./useEntrepriseContext"
import { useEmploiContext } from "./useEmploiContext"


export const useEntrepriseLougout = () => {

    const {dispatch} = useEntrepriseContext()
    const {dispatch: emploiDispatch} = useEmploiContext()

    const lougoutentreprise = () => {

        //remove user from storage
        localStorage.removeItem('entreprise')

        //dispatch lougout action
        dispatch({type:'LOGOUTENTREPRISE'})
        emploiDispatch({type: 'SET_EMPLOIS', payload: null})

}

return {lougoutentreprise }
}