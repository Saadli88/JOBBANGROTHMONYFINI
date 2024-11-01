//creation offre d'emploi fetch

import React, { useState } from "react";
import NavBarEnt from "../NavBarEnt/NavBarEnt";
import './NouvelleOffre.css'
import { useEmploiContext } from "../../hooks/useEmploiContext";
import { useEntrepriseContext } from "../../hooks/useEntrepriseContext";

const NouvelleOffre = () =>{
  const {entreprise}  = useEntrepriseContext()
    const {dispatch} = useEmploiContext()
    const[nomEntreprise, setNomEntreprise] = useState('')
    const[nomPoste, setNomPoste] = useState('')
    const[salaire, setSalaire] = useState('')
    const[emplacement, setEmplacement] = useState('')
    const[categorie, setCategorie] = useState('')
    const[emailEmployeur, setEmailEmployeur] = useState('')
    const[description, setDescription] = useState('')
    const[responsabilite, setResponsabilite] = useState('')
    const[exigence, setExigence] = useState('')

    const[error, setError] = useState(null)


const handleSubmit = async (e) => {
    e.preventDefault()

    if(!entreprise){
      setError('Tu dois etre connecter')
      return
    }

    
    const offreEmploi = { 
        nom_entreprise: nomEntreprise,
        nom_poste: nomPoste,
        salaire: salaire,
        emplacement: emplacement,
        categorie: categorie,
        email_employeur: emailEmployeur, 
        description: description,
        responsabilite: responsabilite,
        exigence:exigence}


        const response = await fetch('/api/offreEmploi/', {
            method:'POST',
            body: JSON.stringify(offreEmploi),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${entreprise.token}`

            }
        })
        const json = await response.json()

        if(!response.ok){
                setError(json.error)
        }
        if(response.ok){
            setNomEntreprise('')
            setNomPoste('')
            setSalaire('')
            setEmplacement('')
            setCategorie('')
            setEmailEmployeur('')
            setDescription('')
            setResponsabilite('')
            setExigence('')
            setError(null)
            console.log('Offre Ajouter mon amour')
            dispatch({type: 'CREATE_EMPLOIS', payload:json})
        }
    }

    return(
        <div className="entreprise-container">
        <NavBarEnt />

            <div className="offre-emploi-container">
              <h2>Crée une offre d'emploi</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Nom de l'entreprise</label>
                  <input
                    type="text"
                    onChange={(e) => setNomEntreprise(e.target.value)}
                    value={nomEntreprise}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Nom du poste</label>
                  <input
                    type="text"
                    onChange={(e) => setNomPoste(e.target.value)}
                    value={nomPoste}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Salaire</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
                        setSalaire(value);
                      }
                    }}
                    value={salaire}
                    required
                  />
                </div>
  
                <div className="input-group">
                  <label>Emplacement</label>
                  <select
                    onChange={(e) => setEmplacement(e.target.value)}
                    value={emplacement}
                    required

                  >
                    <option value="">Sélectionnez un emplacement</option> 
                    <option value="Montréal">Montréal</option>
                    <option value="Québec">Québec</option>
                    <option value="Laval">Laval</option>
                    <option value="Gatineau">Gatineau</option>
                    <option value="Longueuil">Longueuil</option>
                    <option value="Sherbrooke">Sherbrooke</option>
                    <option value="Saguenay">Saguenay</option>
                    <option value="Trois-Rivières">Trois-Rivières</option>
                    <option value="Drummondville">Drummondville</option>
                    <option value="Autre">Autre</option>
                    
                  </select>
                </div>
                
                <div className="input-group">
                  <label>Catégorie</label>
                  <select
                    onChange={(e) => setCategorie(e.target.value)}
                    value={categorie}
                    required
                  >
                    <option value="">Sélectionnez une categorie</option> 
                    <option value="Technologie">Technologie</option>
                    <option value="Santé">Santé</option>
                    <option value="Environnement">Environnement</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                    <option value="Média">Média</option>
                    <option value="Finance">Finance</option>
                    <option value="Biologie">Biologie</option>
                    <option value="Énergie">Énergie</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                
                <div className="input-group">
                  <label>Email de l'employeur</label>
                  <input
                    type="email"
                    onChange={(e) => setEmailEmployeur(e.target.value)}                    
                    value={emailEmployeur}
                    required
                  />
                </div>


                <div className="input-group">
                  <label>Description du poste</label>
                  <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}                    
                    value={description}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Responsabilité</label>
                  <input
                    type="text"
                    onChange={(e) => setResponsabilite(e.target.value)}                    
                    value={responsabilite}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Exigence</label>
                  <input
                    type="text"
                    onChange={(e) => setExigence(e.target.value)}                    
                    value={exigence}
                    required
                  />
                </div>
                <button type="submit">Soumettre l'offre d'emploi</button>
                {error && <div>{error}</div>}
              </form>
            </div>
         
          
        </div>
   
    )
}

export default NouvelleOffre;