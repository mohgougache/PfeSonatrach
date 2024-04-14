import db from "../baseDonne/connection.js"
class AgentModule{
    static insertAgent(agentData, callback) {
        db.query("INSERT INTO `agent`(Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [agentData.Division, agentData.Direction, agentData.Unite, agentData.Service, agentData.Atelier, agentData.Nom, agentData.Prenom, agentData.DateN, agentData.LieuN, agentData.Sex, agentData.SitutionFamille, agentData.Adreese, agentData.GroupeSanguim, agentData.Allergie, agentData.Nss, agentData.Scolaire, agentData.Professionnelle, agentData.Qprofessionnelle, agentData.ActiProAntet, agentData.ServiceNational], (error, agentResult) => {
            if (error) {
                console.error("Erreur lors de l'insertion de l'agent :", error);
                callback(error, null);
            } else {
                callback(null, agentResult.insertId);
            }
        });
    }
    
    static insertPostes(postesData, callback) {
        const values = postesData.map(poste => [poste.Poste, poste.DateD, poste.DateF, poste.RisqueProfess, poste.Motifs, poste.IdA]);

db.query('INSERT INTO postes (Poste, DateD, DateF, RisqueProfess, Motifs, IdA) VALUES ?', [values], (error, postesResult) => {
    if (error) {
        console.error("Erreur lors de l'insertion des postes :", error);
        callback(error);
    } else {
        callback(null);
    }
});

    }
    
    static async getagentall()
    {
     return new Promise(resolve =>{
        db.query("SELECT Nom, Prenom, Sex, DateN, Nss FROM agent  " ,[],(error,result)=>{
            if(!error){
                resolve(result)
            }
            if(error){
                console.log(error);
                 resolve(error);
            }
        })
     })
    }
    static async getagent(IdA)
    {
        return new Promise((resolve) => {
            db.query(
              "SELECT * FROM agent WHERE IdA= ?  ",
              [IdA],
              (error, result) => {
                if (!error) {
                  resolve(result);
                  console.log( resolve(result));
                }
                if (error) {
                  console.log(error);
                }
              }
            );
      
          });
    }
    
     
      static updateAgent(agentId, agentData, callback) {
        db.query('UPDATE agent SET ? WHERE IdA = ', [agentData, agentId], (error, results) => {
            if (error) {
                callback(error);
            } else {
                callback(null);
            }
        });
    
    }
    static addPoste(agentId, posteData, callback) {
      db.query('INSERT INTO postes (IdA,Poste, DateD, DateF,RisqueProfess,Motifs) VALUES (?,?, ?, ?,?,?)', [ agentId,posteData.Poste, posteData.DateD, posteData.DateF,posteData.RisqueProfess,posteData.Motifs], (error, results) => {
          if (error) {
              callback(error);
          } else {
              callback(null);
          }
      });
    }

    static suppAgent(agentId, callback) {
        db.beginTransaction((error) => {
          if (error) {
            console.error("Erreur lors du démarrage de la transaction :", error);
            callback(error);
            return;
          }
    
          // Supprimer les postes associés à l'agent
          db.query('DELETE FROM postes WHERE IdA = ?', [agentId], (error, result) => {
            if (error) {
              return db.rollback(() => {
                console.error("Erreur lors de la suppression des postes de l'agent :", error);
                callback(error);
              });
            }
    
            
            db.query('DELETE FROM agent WHERE IdA = ?', [agentId], (error, result) => {
              if (error) {
                return db.rollback(() => {
                  console.error("Erreur lors de la suppression de l'agent :", error);
                  callback(error);
                });
              }
    
              db.commit((error) => {
                if (error) {
                  console.error("Erreur lors de la validation de la transaction :", error);
                  return db.rollback(() => {
                    callback(error);
                  });
                }
    
                callback(null);
              });
            });
          });
        });
      }
}
export default AgentModule ;