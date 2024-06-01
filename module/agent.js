// import { type } from "express/lib/response.js";
import db from "../baseDonne/connection.js";
import moment from 'moment';
class AgentModule{
    
    
    static async getagentall()
    {
     return new Promise(resolve =>{
        db.query("SELECT IdA ,Nom, Prenom, Sex, DateN, Nss FROM agent  " ,[],(error,result)=>{
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
    static async getagent(IdA) {
        return new Promise((resolve, reject) => {
            const agentQuery = `
                SELECT * FROM agent WHERE IdA = ?;
            `;
    
            const postesQuery = `
                SELECT * FROM postes WHERE IdA = ?;
            `;
    
            db.query(agentQuery, [IdA], (agentError, agentResult) => {
                if (agentError) {
                    console.log("Erreur lors de la récupération de l'agent :", agentError);
                    return reject(agentError);
                }
    
                if (agentResult.length === 0) {
                    return resolve(null);
                }
    
                const agent = agentResult[0];
    
                // Formater les dates de l'agent
                agent.DateN = agent.DateN ? moment(agent.DateN).format('YYYY-MM-DD') : "";
    
                db.query(postesQuery, [IdA], (postesError, postesResult) => {
                    if (postesError) {
                        console.log("Erreur lors de la récupération des postes :", postesError);
                        return reject(postesError);
                    }
    
                    // Formater les dates des postes
                    const postes = postesResult.map(poste => {
                        poste.DateD = poste.DateD ? moment(poste.DateD).format('YYYY-MM-DD') : "";
                        poste.DateF = poste.DateF ? moment(poste.DateF).format('YYYY-MM-DD') : "";
                        return poste;
                    });
    
                    resolve({ agent: agent, postes: postes });
                });
            });
        });
    }
    
    
    static async getAgent()
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
    
   
  
    static async ajouterAgentAndPoste(agentData, posteData) {
      return new Promise((resolve, reject) => {
          db.beginTransaction((err) => {
              if (err) {
                  return reject(err);
              }
  
              const agentInsertSql = `INSERT INTO agent 
                  (Division, Direction, Unite, Service, Atelier, Nom, Prenom, DateN, LieuN, Sex, Email, SitutionFamille, Adreese, GroupeSanguim, Allergie, Nss, Scolaire, Professionnelle, Qprofessionnelle, ActiProAntet, ServiceNational) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
              db.query(agentInsertSql, [
                  agentData.Division, agentData.Direction, agentData.Unite, agentData.Service, agentData.Atelier, agentData.Nom, agentData.Prenom, agentData.DateN, agentData.LieuN, agentData.Sex, agentData.Email, agentData.SitutionFamille, agentData.Adreese, agentData.GroupeSanguim, agentData.Allergie, agentData.Nss, agentData.Scolaire, agentData.Professionnelle, agentData.Qprofessionnelle, agentData.ActiProAntet, agentData.ServiceNational
              ], (error, agentResult) => {
                  if (error) {
                      return db.rollback(() => {
                          reject(error);
                      });
                  }
  
                  const postInsertSql = 'INSERT INTO postes (Poste, DateD, DateF, RisqueProfess, Motifs, IdA) VALUES (?, ?, ?, ?, ?, ?)';
  
                  db.query(postInsertSql, [
                      posteData.Poste, posteData.DateD, posteData.DateF, posteData.RisqueProfess, posteData.Motifs, agentResult.insertId
                  ], (error, postResult) => {
                      if (error) {
                          return db.rollback(() => {
                              reject(error);
                          });
                      }
  
                      db.commit((error) => {
                          if (error) {
                              return db.rollback(() => {
                                  reject(error);
                              });
                          }
                          resolve({ agent: agentResult, post: postResult });
                      });
                  });
              }); 
          });
      });
  }
  static async ModifieAgentAndPoste(agentData, postesData) { 
    return new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          return reject(err);
        }
  
        const agentUpdateSql = 'UPDATE agent SET ? WHERE IdA = ?';
        db.query(agentUpdateSql, [agentData, agentData.IdA], (error, agentResult) => {
          if (error) {
            return db.rollback(() => {
              reject(error);
            });
          }
  
          // Vérification que postesData est un tableau
          if (!Array.isArray(postesData)) {
            return db.rollback(() => {
              reject(new TypeError('postesData should be an array'));
            });
          }
  
          // Suppression de tous les anciens postes avant d'insérer les nouveaux
          const deletePostesSql = 'DELETE FROM postes WHERE IdA = ?';
          db.query(deletePostesSql, [agentData.IdA], (error, deleteResult) => {
            if (error) {
              return db.rollback(() => {
                reject(error);
              });
            }
  
            // Insertion des nouveaux postes
            const postInsertPromises = postesData.map(poste => {
              return new Promise((resolve, reject) => {
                const postInsertSql = 'INSERT INTO postes SET ?';
                const postData = { ...poste, IdA: agentData.IdA };
                db.query(postInsertSql, postData, (error, postResult) => {
                  if (error) {
                    console.log('Error inserting post:', error);
                    return reject(error);
                  }
                  resolve(postResult);
                });
              });
            });
  
            Promise.all(postInsertPromises)
              .then(results => {
                db.commit((commitError) => {
                  if (commitError) {
                    return db.rollback(() => {
                      reject(commitError);
                    });
                  }
                  resolve({ agent: agentResult, postes: results });
                });
              })
              .catch(error => {
                db.rollback(() => {
                  reject(error);
                });
              });
          });
        });
      });
    });
  }
  
    static getVisitesByAgentId(agentId) {
      return new Promise((resolve, reject) => {
          db.query('SELECT IdV FROM visite WHERE IdA = ?', [agentId], (err, results) => {
              if (err) {
                  return reject(err);
              }
              resolve(results);
          });
      });
  }
  
  static supVisite(id) {
      return new Promise((resolve, reject) => {
          db.beginTransaction((err) => {
              if (err) {
                  return reject(err);
              }
  
              const tables = [
                  'cadiovasculaire', 'respiratoire', 'neuropsychisme', 'opht', 'orl',
                  'peaumuqueuses', 'explorationsfonctionnelles', 'genitourinaire',
                  'hematogg', 'locomoteur', 'digestif', 'endocrino', 'exemenscomplementaires'
              ];
  
              let deleteFromTablePromises = tables.map((table) => {
                  return new Promise((resolve, reject) => {
                      db.query(`DELETE FROM ${table} WHERE IdV = ?`, [id], (err, result) => {
                          if (err) {
                              return reject(err);
                          }
                          resolve(result);
                      });
                  });
              });
  
              Promise.all(deleteFromTablePromises)
                  .then(() => {
                      db.query('DELETE FROM visite WHERE IdV = ?', [id], (err, result) => {
                          if (err) {
                              return db.rollback(() => {
                                  reject(err);
                              });
                          }
  
                          db.commit((err) => {
                              if (err) {
                                  return db.rollback(() => {
                                      reject(err);
                                  });
                              }
                              resolve(result);
                          });
                      });
                  })
                  .catch((err) => {
                      db.rollback(() => {
                          reject(err);
                      });
                  });
          });
      });
  }
  
  static async suppAgent(agentId) {
    return new Promise((resolve, reject) => {
        db.beginTransaction(async (err) => {
            if (err) {
                return reject(err);
            }

            try {
                // Récupérer les visites associées à l'agent
                const visites = await this.getVisitesByAgentId(agentId);

                // Supprimer chaque visite associée à l'agent
                for (let visite of visites) {
                    await this.supVisite(visite.IdV);
                }

                // Supprimer les entrées dans 'postes' associées à l'agent
                const postesResult = await new Promise((resolve, reject) => {
                    db.query('DELETE FROM postes WHERE IdA = ?', [agentId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    });
                });

                // Supprimer les entrées dans 'rdv' associées à l'agent
                const rdvResult = await new Promise((resolve, reject) => {
                    db.query('DELETE FROM rdv WHERE IdA = ?', [agentId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    });
                });

                // Supprimer l'agent
                const agentResult = await new Promise((resolve, reject) => {
                    db.query('DELETE FROM agent WHERE IdA = ?', [agentId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    });
                });

                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            reject(err);
                        });
                    }
                    // Vérifiez si des lignes ont été affectées par la suppression de l'agent
                    if (agentResult.affectedRows > 0) {
                        resolve(agentResult);
                    } else {
                        resolve(null);
                    }
                });
            } catch (error) {
                return db.rollback(() => {
                    reject(error);
                });
            }
        });
    });
}

  
  
  
  
  
     
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

      static insertRDV(Data) { 
        return new Promise((resolve, reject) => { 
            const query = 'INSERT INTO RDV (IdA, TypeRdv, Date, Heure) VALUES (?, ?, ?, ?)';
            db.query(query, [Data.IdA, Data.TypeRdv, Data.Date, Data.Heure], (error, result) => {
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
    static getRendevous(Date) {
      return new Promise(resolve => {
          db.query("SELECT rdv.IdR,rdv.IdA,agent.Nom, agent.Prenom, agent.Email, rdv.Heure, rdv.TypeRdv FROM agent JOIN rdv ON agent.IdA = rdv.IdA WHERE rdv.Date = ?", [Date], (error, result) => {
              if (!error) {
                  resolve(result);
              } else {
                  console.log(error);
                  resolve(error);
              }
          });
      });
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
    static modifieRdv(RdvData) {
      return new Promise((resolve, reject) => {
          db.query("UPDATE rdv SET ? WHERE IdR = ?", [RdvData, RdvData.IdR], (error, result) => {
              if (error) {
                  console.error("Erreur lors de la mise à jour du rendez-vous :", error);
                  reject(error);
              } else {
                  resolve(result);  
              }
          });
      });
  }
  static insererVisite(Vdata) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO visite (`DateV`, `TypeV`, `Poids`, `Taille`, `Pt`, `IdA`, `IdE`,Statut) VALUES (?, ?, ?, ?, ?, ?, ?,1)', 
        [Vdata.DateV, Vdata.TypeV, Vdata.Poids, Vdata.Taille, Vdata.Pt, Vdata.IdA, Vdata.IdE], 
        (error, result) => {
          if (error) {
            console.error("Erreur lors de l'insertion des données de visite :", error);
            reject(error);
          } else {
            console.log("Données de visite insérées avec succès :", result);
            resolve(result);
          }
        }
      );
    });
  } 
  static getVisitesDuJour() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT      IdV, 
        DATE_FORMAT(DateV, '%Y/%m/%d') as DateV, 
        TypeV, 
        Poids, 
        Taille, 
        Pt, 
        IdA, 
        IdE, 
        Statut  FROM visite
        WHERE Statut = 0 AND DateV = CURDATE()
      `;
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }
 
}


export default AgentModule ;