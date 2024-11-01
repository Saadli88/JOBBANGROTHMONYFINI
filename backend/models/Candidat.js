import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator'

const Schema = mongoose.Schema;

const candidatSchema = new Schema({
    nom_candidat: {
        type: String,
        required: true
      },
      email_candidat: {
        type: String,
        required: true,
        unique:true
      },
     mot_de_passeCandidat: {
        type: String,
        required: true
      }
      
    });

    //static signup
  // Dans le modèle Candidat (Candidat.js)
candidatSchema.statics.signupCandidat = async function (
  nom_candidat,
  email_candidat,
  mot_de_passeCandidat
) {


 //validation:
 if(!email_candidat || !mot_de_passeCandidat){ 
  throw Error('tous les champs doivent être remplis')
}
if(!validator.isEmail(email_candidat)){
  throw Error('email candidat invalide')
}
if(!validator.isStrongPassword(mot_de_passeCandidat)){
  throw Error('mot de passe candidat invalide')
}


  const exists = await this.findOne({ email_candidat });

  if (exists) {
      throw Error('Email deja utiliser');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(mot_de_passeCandidat, salt);

  const candidat = await this.create({
      nom_candidat,
      email_candidat,
      mot_de_passeCandidat: hash,
  });

  return candidat;


};


 //static login methodes

 candidatSchema.statics.loginCandidat = async function (
  email_candidat,
  mot_de_passeCandidat) {
  

      if(!email_candidat || !mot_de_passeCandidat){ 
          throw Error('tous les champs doivent être remplis')
      }


      const candidat = await this.findOne({email_candidat})

      if(!candidat){
          throw Error('Email candidat incorrect');
        }

        const match = await bcrypt.compare(mot_de_passeCandidat, candidat.mot_de_passeCandidat);
        if(!match){
          throw Error('mot de passe candidat invalide')
        }

        return candidat
}




;



 

    const Candidat = mongoose.model('Candidat', candidatSchema);
    export default Candidat;










