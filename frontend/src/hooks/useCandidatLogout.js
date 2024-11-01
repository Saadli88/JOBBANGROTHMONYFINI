import { useCandidatContext } from "./useCandidatContext"
import { useEmploiContext } from "./useEmploiContext"


export const useCandidatLougout = () => {
    const {dispatch} = useCandidatContext()
    const {dispatch: emploiDispatch} = useEmploiContext()

    const lougoutcandidat = () => {

        //remove user from storage
        localStorage.removeItem('candidat')
        dispatch({type:'LOGOUTCANDIDAT'})
        emploiDispatch({type: 'SET_EMPLOIS', payload: null})

}

return {lougoutcandidat}
}