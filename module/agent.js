// import { type } from "express/lib/response.js";
import db from "../baseDonne/connection.js";
class AgentModule{
    static insertAgent(agentData, callback) {
        db.query("INSERT INTO `agent`(Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, Email,SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [agentData.Division, agentData.Direction, agentData.Unite, agentData.Service, agentData.Atelier, agentData.Nom, agentData.Prenom, agentData.DateN, agentData.LieuN, agentData.Sex, agentData.Email,agentData.SitutionFamille, agentData.Adreese, agentData.GroupeSanguim, agentData.Allergie, agentData.Nss, agentData.Scolaire, agentData.Professionnelle, agentData.Qprofessionnelle, agentData.ActiProAntet, agentData.ServiceNational], (error, agentResult) => {
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
        db.query("SELECT IdA Nom, Prenom, Sex, DateN, Nss FROM agent  " ,[],(error,result)=>{
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
    static async getAgent(IdA)
    {
     return new Promise(resolve =>{
        db.query("SELECT IdA,Nom, Prenom,Email FROM agent  " ,[],(error,result)=>{
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
    
    static updateAgentAndPoste(agentId, agentData, posteData, callback) {
      // Mettre à jour l'agent
      db.query('UPDATE agent SET ? WHERE IdA = ?', [agentData, agentId], (error) => {
          if (error) {
              callback(error);
              return;
          }
  
          
          db.query('INSERT INTO postes (IdA, Poste, DateD, DateF, RisqueProfess, Motifs) VALUES (?, ?, ?, ?, ?, ?)', [agentId, posteData.Poste, posteData.DateD, posteData.DateF, posteData.RisqueProfess, posteData.Motifs], (error) => {
              if (error) {
                  callback(error);
                  return;
              }
  
              callback(null);
          });
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
      // static EnvouyEmailSelcte(IdV,Date,heure,typeV){
      //   if(type==1){
      //     const sql = "SELECT * FROM destinataires WHERE DATE_ADD(dernier_envoi, INTERVAL 6 MONTH) = DATE_ADD(NOW(), INTERVAL 3 DAY)";
      
      // db.query(sql, (err, results) => {
      //     if (err) {
      //         console.error('Erreur lors de la récupération des destinataires :', err);
      //         return;
      //     }
      //   });
      // }
      //   else if(type==2){
          
      //       const sql = "SELECT * FROM destinataires WHERE DATE_ADD(dernier_envoi, INTERVAL 3 MONTH) = DATE_ADD(NOW(), INTERVAL 3 DAY)";
        
      //   db.query(sql, (err, results) => {
      //       if (err) {
      //           console.error('Erreur lors de la récupération des destinataires :', err);
      //           return;
      //       }
      //     });
      //   }
      //   else if(type==3){
      //       const sql = "SELECT * FROM destinataires WHERE DATE_ADD(dernier_envoi, INTERVAL 1 ANNES) = DATE_ADD(NOW(), INTERVAL 3 DAY)";
        
      //   db.query(sql, (err, results) => {
      //       if (err) {
      //           console.error('Erreur lors de la récupération des destinataires :', err);
      //           return;
      //       }
      //     });
      //   }

      // }
      static selectEmail(IdA) {
        return new Promise((resolve, reject) => {
          db.query('SELECT Email FROM agent WHERE IdA = ?', [IdA], (error, result) => {
            if (error) { 
              console.error(error);
              reject(error); // Rejeter la promesse en cas d'erreur
            } else {
              resolve(result); // Résoudre la promesse avec le résultat
            }
          });
        });
      }

      static insertRDV(IdA, DataRdv) { 
        return new Promise((resolve, reject) => { 
            const query = 'INSERT INTO RDV (IdA, Type, Date, Heure) VALUES (?, ?, ?, ?)';
            db.query(query, [IdA, DataRdv.Type, DataRdv.Date, DataRdv.Heure], (error, result) => {
                if (error) {
                    console.error("Erreur lors de l'insertion du RDV :", error);
                    reject(error);
                } else {
                    console.log("Rendez-vous inséré avec succès :", result);
                    resolve(result);
                }
            });
        });
    }
    static getRendevous(Date){
    return new Promise(resolve =>{
      db.query("SELECT agent.Nom, agent.Prenom, agent.Email, rdv.Heure, rdv.Type FROM agent JOIN rdv ON agent.IdA = rdv.IdA WHERE rdv.Date = ?" ,[Date],(error,result)=>{
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
    static  supRdv(IdR){
      return new Promise(resolve =>{
        db.query("DELETE FROM rdv WHERE IdR = ? " ,[IdR],(error,result)=>{
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
    static modifieRdv(IdR, RdvData) {
      return new Promise(resolve => {
          db.query("UPDATE rdv SET ? WHERE IdR = ?", [RdvData, IdR], (error, result) => {
              if (!error) {
                  resolve(result);
              } else {
                  console.log(error);
                  resolve(error);
              }
          });
      });
  }
  
}


export default AgentModule ;