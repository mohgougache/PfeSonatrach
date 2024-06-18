// import { type } from "express/lib/response.js";
import db from "../baseDonne/connection.js";
import moment from 'moment';
class AgentModule{
    
    
    
        static getAgentAll() {
          return new Promise((resolve, reject) => {
            const query = `
              SELECT 
                IdA, 
                Nom, 
                Prenom, 
                Sex, 
                DATE_FORMAT(DateN, '%Y/%m/%d') AS DateN, 
                Nss 
              FROM agent
            `;
            db.query(query, [], (error, result) => {
              if (error) {
                console.error("Erreur lors de la récupération des agents : ", error);
                reject(error); // Rejeter la promesse en cas d'erreur
              } else {
                resolve(result); // Résoudre la promesse avec le résultat
              }
            });
          });
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
    
    static async ajouterAgentAndPoste(agentData, postesData) {
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
    
                    // Insertion des nouveaux postes
                    const insertionPromises = postesData.map((posteData) => {
                        return new Promise((resolve, reject) => {
                            const postInsertSql = 'INSERT INTO postes (Poste, RisqueProfess, IdA) VALUES (?, ?, ?)';
                            db.query(postInsertSql, [posteData.Poste, posteData.RisqueProfess, agentResult.insertId], (error, postResult) => {
                                if (error) {
                                    console.log('Error inserting post:', error);
                                    return reject(error);
                                }
    
                                const IdP = postResult.insertId;
                                const mutationInsertSql = 'INSERT INTO mutitionposte (Motifs, DateD, DateF, IdA, IdP) VALUES (?, ?, ?, ?, ?)';
                                db.query(mutationInsertSql, [posteData.Motifs, posteData.DateD, posteData.DateF, agentResult.insertId, IdP], (error, mutationResult) => {
                                    if (error) {
                                        console.log('Error inserting mutation:', error);
                                        return reject(error);
                                    }
                                    resolve({ IdP, posteData });
                                });
                            });
                        });
                    });
    
                    // Exécution de toutes les promesses d'insertion
                    Promise.all(insertionPromises)
                        .then((results) => {
                            // Valider la transaction
                            db.commit((commitError) => {
                                if (commitError) {
                                    return db.rollback(() => {
                                        reject(commitError);
                                    });
                                }
                                resolve({ agent: agentResult, insertions: results });
                            });
                        })
                        .catch((error) => {
                            db.rollback(() => {
                                reject(error);
                            });
                        });
                });
            });
        });
    }
    
    
    static ModifieAgentAndPoste(agentData, postesData) {
        return new Promise((resolve, reject) => {
            db.beginTransaction(async (err) => {
                if (err) {
                    return reject(err);
                }
    
                try {
                    // Mettre à jour l'agent
                    const agentUpdateSql = 'UPDATE agent SET ? WHERE IdA = ?';
                    db.query(agentUpdateSql, [agentData, agentData.IdA], async (error, agentResult) => {
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
    
                        // Suppression de toutes les anciennes mutations
                        const deleteMutationsSql = 'DELETE FROM mutitionposte WHERE IdA = ?';
                        db.query(deleteMutationsSql, [agentData.IdA], async (error, deleteMutationResult) => {
                            if (error) {
                                return db.rollback(() => {
                                    reject(error);
                                });
                            }
    
                            // Suppression de tous les anciens postes
                            const deletePostesSql = 'DELETE FROM postes WHERE IdA = ?';
                            db.query(deletePostesSql, [agentData.IdA], async (error, deletePostesResult) => {
                                if (error) {
                                    return db.rollback(() => {
                                        reject(error);
                                    });
                                }
    
                                // Insertion des nouveaux postes
                                const insertionPromises = postesData.map((posteData) => {
                                    return new Promise((resolve, reject) => {
                                        const postInsertSql = 'INSERT INTO postes (Poste, RisqueProfess, IdA) VALUES (?, ?, ?)';
                                        db.query(postInsertSql, [posteData.Poste, posteData.RisqueProfess, agentData.IdA], (error, postResult) => {
                                            if (error) {
                                                console.log('Error inserting post:', error);
                                                return reject(error);
                                            }
                                            const IdP = postResult.insertId;
    
                                            const mutationInsertSql = 'INSERT INTO mutitionposte (Motifs, DateD, DateF, IdA, IdP) VALUES (?, ?, ?, ?, ?)';
                                            db.query(mutationInsertSql, [posteData.Motifs, posteData.DateD, posteData.DateF, agentData.IdA, IdP], (error, mutationResult) => {
                                                if (error) {
                                                    console.log('Error inserting mutation:', error);
                                                    return reject(error);
                                                }
                                                resolve({ IdP, posteData });
                                            });
                                        });
                                    });
                                });
    
                                // Exécution de toutes les promesses d'insertion
                                Promise.all(insertionPromises)
                                    .then((results) => {
                                        // Valider la transaction
                                        db.commit((commitError) => {
                                            if (commitError) {
                                                return db.rollback(() => {
                                                    reject(commitError);
                                                });
                                            }
                                            resolve({ agent: agentResult, insertions: results });
                                        });
                                    })
                                    .catch((error) => {
                                        db.rollback(() => {
                                            reject(error);
                                        });
                                    });
                            });
                        });
                    });
                } catch (error) {
                    db.rollback(() => {
                        reject(error);
                    });
                }
            });
        });
    }
    
    
    
  
//   static supVisite(id) {
//       return new Promise((resolve, reject) => {
//           db.beginTransaction((err) => {
//               if (err) {
//                   return reject(err);
//               }
  
//               const tables = [
//                   'cadiovasculaire', 'respiratoire', 'neuropsychisme', 'opht', 'orl',
//                   'peaumuqueuses', 'explorationsfonctionnelles', 'genitourinaire',
//                   'hematogg', 'locomoteur', 'digestif', 'endocrino', 'exemenscomplementaires'
//               ];
  
//               let deleteFromTablePromises = tables.map((table) => {
//                   return new Promise((resolve, reject) => {
//                       db.query(`DELETE FROM ${table} WHERE IdV = ?`, [id], (err, result) => {
//                           if (err) {
//                               return reject(err);
//                           }
//                           resolve(result);
//                       });
//                   });
//               });
  
//               Promise.all(deleteFromTablePromises)
//                   .then(() => {
//                       db.query('DELETE FROM visite WHERE IdV = ?', [id], (err, result) => {
//                           if (err) {
//                               return db.rollback(() => {
//                                   reject(err);
//                               });
//                           }
  
//                           db.commit((err) => {
//                               if (err) {
//                                   return db.rollback(() => {
//                                       reject(err);
//                                   });
//                               }
//                               resolve(result);
//                           });
//                       });
//                   })
//                   .catch((err) => {
//                       db.rollback(() => {
//                           reject(err);
//                       });
//                   });
//           });
//       });
//   }
  
  static async suppAgent(agentId) {
    return new Promise((resolve, reject) => {
        db.beginTransaction(async (err) => {
            if (err) {
                return reject(err);
            }

            try {
                const mutitionposteResult = await new Promise((resolve, reject) => {
                    db.query('DELETE FROM mutitionposte WHERE IdA = ?', [agentId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    });
                });

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

  
  
  
  
  
     
static async selectEmail(IdA) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT Email FROM agent WHERE IdA = ?', [IdA], (error, result) => {
                if (error) {
                    console.error(error);
                    reject(error); // Rejeter la promesse en cas d'erreur
                } else {
                    resolve(result); // Résoudre la promesse avec le résultat
                }
            });
        });
        return result;
    } catch (error) {
        console.error("Erreur lors de la sélection de l'email :", error);
        throw error; // Relancer l'erreur pour la gestion ultérieure
    }
}

static async insertRDV(Data) {
    try {
        const result = await new Promise((resolve, reject) => {
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
        return result;
    } catch (error) {
        console.error("Erreur lors de l'insertion du RDV :", error);
        throw error; // Relancer l'erreur pour la gestion ultérieure
    }
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
  static getRendevousDate(IdR) {
    return new Promise(resolve => {
        db.query("SELECT Date FROM rdv  WHERE IdR= ?", [IdR], (error, result) => {
            if (!error) {
                resolve(result[0].Date);
            } else {
                console.log(error);
                resolve(error);
            }
        });
    });
}
  
static supRdv(IdR) {
    return new Promise((resolve, reject) => {
      // Début de la transaction
      db.beginTransaction(err => {
        if (err) {
          console.error("Erreur lors du démarrage de la transaction : ", err);
          return reject(err);
        }

        // Suppression des visites associées
        db.query("DELETE FROM visite WHERE IdR = ?", [IdR], (error, result) => {
          if (error) {
            console.error("Erreur lors de la suppression des visites : ", error);
            return db.rollback(() => {
              reject(error);
            });
          }

          // Suppression du rendez-vous
          db.query("DELETE FROM rdv WHERE IdR = ?", [IdR], (error, result) => {
            if (error) {
              console.error("Erreur lors de la suppression du RDV : ", error);
              return db.rollback(() => {
                reject(error);
              });
            }

            // Validation de la transaction
            db.commit(err => {
              if (err) {
                console.error("Erreur lors de la validation de la transaction : ", err);
                return db.rollback(() => {
                  reject(err);
                });
              }
              resolve(result);
            });
          });
        });
      });
    });
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
  static insererVisiteP(Vdata) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO visite ( `Poids`,`Taille`, `Pt`,  `IdE`,`IdR`,Statut) VALUES (?,  ?, ?, ?, ?,1)', 
        [Vdata.Poids, Vdata.Taille, Vdata.Pt, Vdata.IdE, Vdata.IdR], 
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
  static getVisitesPDuJour(date) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                visite.IdV,
                agent.Nom,
                agent.Prenom,
                agent.Email,
                DATE_FORMAT(rdv.Date, '%Y/%m/%d') AS Date,
                rdv.TypeRdv,
                rdv.Heure,
                visite.Poids,
                visite.Taille,
                visite.Pt,
                visite.IdR,
                visite.IdE,
                visite.Statut
            FROM visite
            JOIN rdv ON visite.IdR = rdv.IdR
            JOIN agent ON rdv.IdA = agent.IdA
            WHERE rdv.Date = ? 
        `;
        db.query(query, [date], (err, results) => {
            if (err) {
                console.error("Erreur lors de l'exécution de la requête :", err);
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}
static modifierVisiteP(visiteData) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE visite SET 
                Poids = ?, 
                Taille = ?, 
                Pt = ?,  
                IdR = ?, 
                IdE = ?
            WHERE IdV = ?
        `;
        const values = [
            visiteData.Poids, 
            visiteData.Taille, 
            visiteData.Pt, 
            visiteData.IdR, 
            visiteData.IdE, 
            visiteData.IdP
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

static getDateVP(IdV) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                DATE_FORMAT(rdv.Date, '%Y/%m/%d') AS Date
            FROM visite
            JOIN rdv ON visite.IdR = rdv.IdR
            WHERE visite.IdV = ?
        `;
        db.query(query, [IdV], (err, results) => {
            if (err) {
                console.error("Erreur lors de l'exécution de la requête :", err);
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}
static supprimerPrepareVisite(IdV) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM visite WHERE IdV = ?';
        db.query(query, [IdV], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

static async insertMaladies(IdV, maladiesSelection) {
    return new Promise((resolve, reject) => {
        try {
            // Construire la requête d'insertion
            const query = `
                INSERT INTO maladie
                (\`Covid-19\`, Denque, Grippe, IdV)
                VALUES (?, ?, ?, ?)
            `;

            // Exécuter la requête avec les valeurs de maladies sélectionnées
            db.query(query, [
                maladiesSelection.includes('Covid-19') ? 1 : 0,
                maladiesSelection.includes('Denque') ? 1 : 0,
                maladiesSelection.includes('Grippe') ? 1 : 0,
                IdV
            ], (error, result) => {
                if (error) {
                    console.error("Erreur ajouter des sélections de maladies :", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        } catch (error) {
            console.error("Erreur ajouter des sélections de maladies :", error);
            reject(error);
        }
    });
}
static getAllColumnsExceptIds() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'maladie'
            AND COLUMN_NAME NOT IN ('IdM', 'IdV')
        `;
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                const columnNames = result.map(row => row.COLUMN_NAME);
                resolve(columnNames);
            }
        });
    });
}
}


export default AgentModule ; 