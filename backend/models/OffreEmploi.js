import mongoose from "mongoose";

const Schema = mongoose.Schema;

const offreSchema = new Schema({
    nom_entreprise: {
        type: String,
        required: true
      },
      nom_poste: {
        type: String,
        required: true
      },
      salaire: {
        type: String,
        required: true
      },
      emplacement: {
        type: String,
        required: true
      },
      categorie: {
        type: String,
        required: true
      },
      email_employeur: {
        type: String,
        required: true
      }, 
      description: {
        type: String,
        required: true
      }, 
      responsabilite: {
        type: String,
        required: true
      },
      exigence: {
        type: String,
        required: true
      },
      entreprise_id:{
        type: String,
        required: true
      }
    }, { timestamps: true });


 

    const OffreEmploi = mongoose.model('OffreEmploi', offreSchema);
    export default OffreEmploi;
//export default OffreEmploi;
//OffreEmploi.find()
// module.exports = mongoose.model('Offre', offreSchema);









