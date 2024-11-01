import Candidat from '../models/Candidat.js';
import jwt from 'jsonwebtoken'



const createToken = (_id)=>{

    return  jwt.sign({_id}, process.env.SECRET, {expiresIn: '4d' })

}
//git fin ines



//connexion
const loginCandidat = async (req, res) => {
    const { email_candidat, mot_de_passeCandidat } = req.body;

    try {
        const candidat = await Candidat.loginCandidat(email_candidat, mot_de_passeCandidat);
        const token = createToken(candidat._id);

        // Répondre avec les détails de l'utilisateur et le token
        return res.status(200).json({ email_candidat, token }); // Ajoutez 'return' pour arrêter l'exécution
    } catch (error) {
        return res.status(400).json({ error: error.message }); // Ajoutez 'return' pour arrêter l'exécution
    }
}

//inscription
const signupCandidat = async (req, res) => {
    const { nom_candidat, email_candidat, mot_de_passeCandidat } = req.body;

    try {
        const candidat = await Candidat.signupCandidat(nom_candidat, email_candidat, mot_de_passeCandidat);
        const token = createToken(candidat._id);

        // Répondre avec les détails de l'utilisateur et le token
        return res.status(200).json({ email_candidat, token, candidat }); // Ajoutez 'return' pour arrêter l'exécution
    } catch (error) {
        return res.status(400).json({ error: error.message }); // Ajoutez 'return' pour arrêter l'exécution
    }
}

  


export{
    loginCandidat,
    signupCandidat
};