 const EmploiDetail = ({ emploi})=>{


    return (
        <div>
          <ul className="lmj-emploi-list">
        
                <div className="emploi-container-details" >
                  <h2 className="jobTitle">{emploi.nom_poste}</h2>
                  <span className="jobEntreprise">{emploi.nom_entreprise}</span>
                  <span className="jobSector">{emploi.categorie}</span>
                  <span className="jobSalary">{emploi.salaire}</span>
                  <span className="jobLocation">{emploi.emplacement}</span>
                  <span className="jobEmail">{emploi.email_employeur}</span>
                  <span className="jobEmail">{emploi.description}</span>
                  <span className="jobEmail">{emploi.responsabilite}</span>
                  <span className="jobEmail">{emploi.exigence}</span>



                  <p>{emploi.createdAt}</p>

                 
                </div>
              
          
          </ul>
        </div>
      );


}
export default EmploiDetail;