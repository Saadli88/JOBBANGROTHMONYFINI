import React, { useState } from "react";
import { EmploiList } from "../../data/emploi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./EmploiItem.css";

const EmploiItem = ({ searchTerm, location, likedJobs, setLikedJobs }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [selectedEmploi, setSelectedEmploi] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const toggleEmail = (emploi) => {
    if (selectedEmploi === emploi) {
      setShowEmail(!showEmail);
    } else {
      setSelectedEmploi(emploi);
      setShowEmail(true);
    }
  };

  const toggleDetails = (emploi) => {
    if (selectedEmploi === emploi) {
      setShowDetails(!showDetails);
    } else {
      setSelectedEmploi(emploi);
      setShowDetails(true);
    }
  };

  const filterEmplois = (emplois) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerLocation = location.toLowerCase();

    return emplois.filter(
      (emploi) =>
        (emploi.nom_poste.toLowerCase().includes(lowerSearchTerm) ||
          emploi.nom_entreprise.toLowerCase().includes(lowerSearchTerm) ||
          emploi.categorie.toLowerCase().includes(lowerSearchTerm) ||
          (emploi.description &&
            emploi.description.toLowerCase().includes(lowerSearchTerm))) &&
        (location === "" ||
          emploi.emplacement.toLowerCase().includes(lowerLocation))
    );
  };

  const groupedEmplois = filterEmplois(EmploiList);

  return (
    <div>
      <ul className="lmj-emploi-list">
        {groupedEmplois.length > 0 ? (
          groupedEmplois.map((emploi) => (
            <div className="emploi-container" key={emploi.nom_poste}>
              <div
                className="like-icon"
                onClick={() => {
                  const newLikes = new Set(likedJobs);
                  if (newLikes.has(emploi.nom_poste)) {
                    newLikes.delete(emploi.nom_poste);
                  } else {
                    newLikes.add(emploi.nom_poste);
                  }
                  setLikedJobs(newLikes);
                }}
                style={{ cursor: "pointer" }}
              >
                {likedJobs.has(emploi.nom_poste) ? (
                  <FaHeart color="black" />
                ) : (
                  <FaRegHeart color="black" />
                )}
              </div>
              <h3
                className="jobTitle"
                onClick={() => toggleDetails(emploi)}
                style={{ cursor: "pointer" }}
              >
                {emploi.nom_poste}
              </h3>
              <span className="jobEntreprise">
                <span className="label">Entreprise:</span>{" "}
                {emploi.nom_entreprise}
              </span>
              <span className="jobSector">
                <span className="label">Secteur:</span> {emploi.categorie}
              </span>
              <span className="jobSalary">
                <span className="label">Salaire:</span> {emploi.salaire}
              </span>
              <span className="jobLocation">
                <span className="label">Emplacement:</span> {emploi.emplacement}
              </span>
              <button className="buttonP" onClick={() => toggleEmail(emploi)}>
                Postuler
              </button>

              {/* Affichage de l'email */}
              {showEmail && selectedEmploi === emploi && (
                <div className="popup">
                  <div className="popup-content">
                    <span className="close" onClick={() => setShowEmail(false)}>
                      &times;
                    </span>
                    <h4>
                      Email:{" "}
                      <a href={`mailto:${emploi.email_employeur}`}>
                        {emploi.email_employeur}
                      </a>
                    </h4>
                  </div>
                </div>
              )}
              {showDetails && selectedEmploi === emploi && (
                <div className="details-popup">
                  <div className="details-popup-content">
                    <span
                      className="close"
                      onClick={() => setShowDetails(false)}
                    >
                      &times;
                    </span>
                    <div className="details-content">
                      <h4>Description:</h4>
                      <p>{emploi.description}</p>
                      <h4>Responsabilités:</h4>
                      <p>{emploi.responsabilites}</p>
                      <h4>Exigences:</h4>
                      <p>{emploi.exigences}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <li>Aucune offre d'emploi trouvée.</li>
        )}
      </ul>
    </div>
  );
};

export default EmploiItem;
