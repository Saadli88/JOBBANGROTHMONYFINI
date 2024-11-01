import { useState } from 'react';
import { useEmploiContext } from "../../hooks/useEmploiContext";
import "./EmploiDetails.css";
import edit from '../../images/edit.png';
import { locations } from '../../data/locations';
import { useEntrepriseContext } from "../../hooks/useEntrepriseContext";

const EmploiDetail = ({ emploi }) => {
  const {entreprise} = useEntrepriseContext()
  const { dispatch } = useEmploiContext();
  const [showDetails, setShowDetails] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmploi, setEditedEmploi] = useState({ ...emploi });
  const [isVisible, setIsVisible] = useState(emploi.isVisible || false); // État pour le switch

  // Fonction pour supprimer l'emploi
  const handleClick = async () => {
    setLoading(true);
    setError(null);
    if(!entreprise){
      return
    }

    const response = await fetch('/api/offreEmploi/' + emploi._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${entreprise.token}`

      }
    });
    const json = await response.json();
    setLoading(false);
    if (response.ok) {
      dispatch({ type: 'DELETE_EMPLOIS', payload: json });
    } else {
      setError('Échec de la suppression: ' + json.message);
    }
  };

  // Fonction pour afficher/masquer les détails
  const toggleDetails = () => setShowDetails(prev => !prev);

  // Fonction pour afficher/masquer l'email de l'employeur
  const toggleEmail = () => setShowEmail(prev => !prev);

  // Fonction pour activer/désactiver le mode édition
  const toggleEdit = () => setIsEditing(prev => !prev);

  // Fonction pour gérer les changements dans le formulaire d'édition
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmploi(prev => ({ ...prev, [name]: value }));
  };

  // Fonction pour gérer le changement du switch de visibilité
  const handleVisibilityChange = () => {
    setIsVisible(prev => !prev);
    setEditedEmploi(prev => ({ ...prev, isVisible: !prev.isVisible })); // Met à jour l'état de visibilité dans l'objet d'emploi
  };

  // Fonction pour soumettre les modifications
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/offreEmploi/' + emploi._id, {
      method: 'PATCH',
      body: JSON.stringify(editedEmploi),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${entreprise.token}`
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_EMPLOIS', payload: json });
      toggleEdit();
    } else {
      setError('Échec de la mise à jour: ' + json.message);
    }
  };

  return (
    <div className="emploi-detail-container">
      <ul className="lmj-emploi-list">
        <div className={`emploi-container ${isEditing ? "editing" : ""}`}>
          <div className="image-containerB" onClick={toggleEdit}>
            <img src={edit} alt="edit" className="small-image" />
          </div>
          
          <h3 className="jobTitle" onClick={toggleDetails} style={{ cursor: "pointer" }}>
            {emploi.nom_poste}
          </h3>
          <span className="jobEntreprise">
            <span className="label">Entreprise:</span> {emploi.nom_entreprise}
          </span>
          <span className="jobLocation">
            <span className="label">Emplacement:</span> {emploi.emplacement}
          </span>
          <span className="jobSalary">
            <span className="label">Salaire:</span> {emploi.salaire}
          </span>
          <span className="jobSector">
            <span className="label">Catégorie:</span> {emploi.categorie}
          </span>
          <button className="buttonAf" onClick={toggleEmail}>
            Afficher l'email
          </button>

          {showEmail && (
            <div className="popup email-popup">
              <div className="popup-content">
                <span className="close" onClick={toggleEmail}>&times;</span>
                <h4>Email: <a href={`mailto:${emploi.email_employeur}`}>{emploi.email_employeur}</a></h4>
              </div>
            </div>
          )}

          {showDetails && (
            <div className="details-popup">
              <div className="details-popup-content">
                <span className="close" onClick={toggleDetails}>&times;</span>
                <div className="details-content">
                  <h4>Description:</h4>
                  <p>{emploi.description}</p>
                  <h4>Responsabilités:</h4>
                  <p>{emploi.responsabilite}</p>
                  <h4>Exigences:</h4>
                  <p>{emploi.exigence}</p>
                </div>
              </div>
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}

          <button onClick={handleClick} className="delete-button" disabled={loading}>
            {loading ? 'Suppression...' : 'Supprimer l\'annonce'}
          </button>

          {isEditing && (
            <div className="edit-popup">
              <div className="edit-popup-content">
                <span className="close" onClick={toggleEdit}>&times;</span>
                <h4>Modifier l'offre d'emploi</h4>
                <form onSubmit={handleSubmitEdit} className="edit-job-form">
                  <div className="inputs-groups">
                    <label>Nom de l'entreprise</label>
                    <input
                      type="text"
                      name="nom_entreprise"
                      value={editedEmploi.nom_entreprise}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputs-groups">
                    <label>Nom du poste</label>
                    <input
                      type="text"
                      name="nom_poste"
                      value={editedEmploi.nom_poste}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputs-groups">
                    <label>Salaire</label>
                    <input
                      type="text"
                      name="salaire"
                      value={editedEmploi.salaire}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
                          handleChange(e);
                        }
                      }}
                      required
                    />
                  </div>
                  <div className="inputs-groups">
                    <label>Emplacement</label>
                    <select
                      name="emplacement"
                      value={editedEmploi.emplacement}
                      onChange={handleChange}
                      required
                    >
                      {locations.map((loc, index) => (
                        <option key={index} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputs-groups">
                    <label>Catégorie</label>
                    <select
                      name="categorie"
                      value={editedEmploi.categorie}
                      onChange={handleChange}
                      required
                    >
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
                  <div className="inputs-groups">
                    <label>Email de l'employeur</label>
                    <input
                      type="email"
                      name="email_employeur"
                      value={editedEmploi.email_employeur}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputs-groups">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={editedEmploi.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputs-groups">
                    <label>Exigences</label>
                    <textarea
                      name="exigence"
                      value={editedEmploi.exigence}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputs-groups">
                    <label>Responsabilités</label>
                    <textarea
                      name="responsabilite"
                      value={editedEmploi.responsabilite}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="inputs-groups">
                    <label>Afficher aux candidats</label>
                    <label className="switch">
                      <input type="checkbox" checked={isVisible} onChange={handleVisibilityChange} />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <button type="submit" className="submit-button">Sauvegarder</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default EmploiDetail;
