import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./EmploiItem.css";
import { useEmploiContext } from "../../hooks/useEmploiContext";
import { useCandidatContext } from "../../hooks/useCandidatContext"; // Import candidat context if token is here

const EmploiItem = ({ searchTerm, location, likedJobs, setLikedJobs }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [selectedEmploi, setSelectedEmploi] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const { emplois, dispatch } = useEmploiContext();
  const { candidat } = useCandidatContext(); // Access the candidat context to get the token

  useEffect(() => {
    const fetchEmploi = async () => {
      try {
        const response = await fetch('/api/offreEmploi', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${candidat.token}` // Add token to headers
          }
        });

        const json = await response.json();

        if (response.ok) {
          console.log('Fetched emplois:', json);
          dispatch({ type: 'SET_EMPLOIS', payload: json });
        } else {
          console.error('Error fetching emplois:', json);
        }
      } catch (error) {
        console.error('Error fetching emplois:', error);
      }
    };

    if (candidat && candidat.token) { // Ensure token exists before making the request
      fetchEmploi();
    }
  }, [dispatch, candidat]); // Depend on candidat to ensure token is available

  const emploisList = emplois || [];

  console.log("emploiList", emploisList); // Check if emploisList has data

  const filteredEmplois = emploisList.filter(emploi => {
    return (
      emploi.visibility === true &&
      (emploi.nom_poste.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emploi.nom_candidat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emploi.categorie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emploi.description && emploi.description.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (location === "" || emploi.emplacement.toLowerCase().includes(location.toLowerCase()))
    );
  });

  console.log("filteredEmplois", filteredEmplois);

  if (!emploisList.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="lmj-emploi-list">
        {filteredEmplois.length > 0 ? (
          filteredEmplois.map((emploi) => (
            <div className="emploi-container" key={emploi.nom_poste}>
              {/* Like Icon */}
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

              {/* Job Title */}
              <h3
                className="jobTitle"
                onClick={() => setShowDetails(!showDetails)}
                style={{ cursor: "pointer" }}
              >
                {emploi.nom_poste}
              </h3>
              <span className="jobCandidat">
                <span className="label">Candidat:</span> {emploi.nom_candidat}
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

              {/* Apply Button */}
              <button className="buttonP" onClick={() => setShowEmail(!showEmail)}>
                Postuler
              </button>

              {/* Email Popup */}
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

              {/* Job Details Popup */}
              {showDetails && selectedEmploi === emploi && (
                <div className="details-popup">
                  <div className="details-popup-content">
                    <span className="close" onClick={() => setShowDetails(false)}>
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
