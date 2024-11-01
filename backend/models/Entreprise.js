import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator'


const Schema = mongoose.Schema;
const entrepriseSchema = new Schema({
    nom_entreprise: {
        type: String,
        required: true
    },
    nom_employeur: {
        type: String,
        required: true
    },
    email_entreprise: {
        type: String,
        required: true,
        unique:true
    },
    telephone: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    mot_de_passeEntreprise: {
        type: String,
        required: true
    }
 });



 entrepriseSchema.statics.inscriptionEntreprise = async function(
    nom_entreprise,
    nom_employeur,
    email_entreprise,
    telephone,
    adresse,
    mot_de_passeEntreprise
 ) {

    //validation:
    if(!email_entreprise || !mot_de_passeEntreprise){ 
        throw Error('tous les champs doivent être remplis')
    }
    if(!validator.isEmail(email_entreprise)){
        throw Error('email entreprise invalide')
    }
    if(!validator.isStrongPassword(mot_de_passeEntreprise)){
        throw Error('mot de passe entreprise invalide')
    }


    const exists = await this.findOne({email_entreprise})

    if(exists){
        throw Error('Email deja utiliser');
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(mot_de_passeEntreprise,salt)

      const entreprise = await this.create({
        nom_entreprise,
        nom_employeur,
        email_entreprise,
        telephone,
        adresse,
        mot_de_passeEntreprise: hash})

        return entreprise


 }

 //static login methodes
entrepriseSchema.statics.loginEntreprise = async function (
    email_entreprise,
    mot_de_passeEntreprise) {
    

        if(!email_entreprise || !mot_de_passeEntreprise){ 
            throw Error('tous les champs doivent être remplis')
        }


        const entreprise = await this.findOne({email_entreprise})

        if(!entreprise){
            throw Error('Email entreprise incorrect');
          }

          const match = await bcrypt.compare(mot_de_passeEntreprise, entreprise.mot_de_passeEntreprise)

          if(!match){
            throw Error('mot de passe entreprise invalide')
          }

          return entreprise
}



 

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);
export default Entreprise;
