import Entreprise from '../models/Entreprise.js';

import jwt from 'jsonwebtoken'

const createToken = (_id)=>{

   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '4d' })

}





//connexion
const loginEntreprise = async (req,res) =>{
   

    const { 
        email_entreprise,
        mot_de_passeEntreprise} = req.body



        try{
            const entreprise = await Entreprise.loginEntreprise(
                email_entreprise,
                mot_de_passeEntreprise)


                if (!entreprise) {
                    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
                }
                //create token

                const token = createToken(entreprise._id)

            res.status(200).json({email_entreprise, token}) 
        }
        catch(error){
            res.status(400).json({error:error.message})

        }


}

//inscription
const inscriptionEntreprise = async (req,res) =>{

    const{ 
        nom_entreprise,
        nom_employeur,
        email_entreprise,
        telephone,
        adresse,
        mot_de_passeEntreprise} = req.body

        try{
            const entreprise = await Entreprise.inscriptionEntreprise(
                nom_entreprise,
                nom_employeur,
                email_entreprise,
                telephone,
                adresse,
                mot_de_passeEntreprise)



                //create token

                const token = createToken(entreprise._id)

           // res.status(200).json({email_entreprise, token}) 
            res.status(200).json({ email_entreprise, token, entreprise });
          //  res.status(200).json({email_entreprise, entreprise}) 

        }
        catch(error){
            res.status(400).json({error:error.message})

        }
    
}

export{
    loginEntreprise,
    inscriptionEntreprise
};