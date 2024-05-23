import db from "../baseDonne/connection.js";
import crypto from "crypto";
import bcrypt from 'bcrypt';


class logModele {
  static async ajouterProfil(DataProfil,Password,IdE) {
    try { 
      const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(Password, salt); // Générer le hachage du mot de passe
        console.log("Hachage du mot de passe :", hashedPassword); // Journal de débogage

        const result = await new Promise((resolve, reject) => {
            db.query('INSERT INTO profil (IdE, Nom, Prenom, Password,Email,Poste,statut) VALUES (?,?, ?, ?, ?,?,?)', 
            [IdE, DataProfil.Nom, DataProfil.Prenom, hashedPassword,DataProfil.Email,DataProfil.Poste,1], (error, result) => {
                if (error) {
                    console.error("Erreur lors de l'insertion du profil :", error);
                    reject(error); 
                } else {
                    console.log("2eme",hashedPassword);
                    console.log("Profil inséré avec succès :", result);
                    resolve({ affectedRows: result.affectedRows, insertId: result.insertId });
                }
            });
        });
        return result; // Retourner le résultat de l'insertion
    } catch (error) {
        throw error;
    }
}


static async verifie(login) {
  return new Promise(async (resolve, reject) => {
      db.query(
          "SELECT * FROM profil WHERE IdE = ? AND Statut = 1",
          [login.IdE],
          async (error, result) => {
              if (error) {
                  console.error("Erreur lors de la vérification du login :", error);
                  reject(error);
                  return;
              }

              if (result && result.length > 0) {
                  console.log("Mot de passe haché dans la base de données :", result[0].Password); // Journal de débogage
                  console.log("Mot de passe fourni par l'utilisateur :", login.Password); // Journal de débogage

                  try {
                      const match = await bcrypt.compare(login.Password, result[0].Password); // Comparer les mots de passe
                      console.log("Résultat de la comparaison des mots de passe :", match); // Journal de débogage
                      if (match) {
                          const token = crypto.randomUUID();
                          const expiration = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 heures
                          db.query(
                              "INSERT INTO `section`(`Token`, `IdE`, `Exp`) VALUES (?, ?, ?)",
                              [token, result[0].IdE, expiration],
                              (err, resu) => {
                                  if (err) {
                                      console.error("Erreur lors de l'insertion du token dans la table 'section' :", err);
                                      reject(err);
                                  } else {
                                      resolve({ 
                                        token, 
                                        expiration, 
                                        IdE: result[0].IdE,
                                        Nom: result[0].Nom,
                                        Prenom: result[0].Prenom,
                                        Poste: result[0].Poste 
                                      });
                                  }
                              }
                          );
                      } else {
                          console.error("Mot de passe incorrect."); // Journal de débogage
                          reject("Mot de passe incorrect.");
                      }
                  } catch (err) {
                      console.error("Erreur lors de la vérification du mot de passe :", err);
                      reject(err);
                  }
              } else {
                  console.error("Aucun utilisateur trouvé avec ces informations de connexion."); // Journal de débogage
                  reject("Aucun utilisateur trouvé avec ces informations de connexion.");
              }
          }
      );
  });
}
static supProfil(IdE){
    return new Promise(async (resolve, reject) => {
        db.query(
            "DELETE FROM profil WHERE IdE = ? ",
            [IdE],
            async (error, result) => {
                if (error) {
                    console.error("Erreur lors de la vérification du login :", error);
                    reject(error);
                    return;
                } 
                else {
                    resolve(result)
                }
});
    });}

    static getAllProfils() {
        return new Promise((resolve, reject) => {
            db.query('SELECT IdE,Nom, Prenom, Email,Poste, Statut FROM profil', (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des profils :", error);
                    reject(error);
                } else {
                    resolve(results); 
                }
            });
        });
    }
    
    static getProfil(IdE) {
        return new Promise((resolve, reject) => {
            db.query('SELECT Nom,Prenom,Email FROM profil WHERE IdE = ?',[IdE], (error, results) => {
                if (error) {
                    console.error("Erreur lors de la récupération des profils :", error);
                    reject(error);
                } else {
                    resolve(results); 
                }
            });
        });
    }
    static updatePassword(IdE, newPassword) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                db.query('UPDATE profil SET Password = ? WHERE IdE = ?', [hashedPassword, IdE], (error, results) => {
                    if (error) {
                        console.error("Erreur lors de la mise à jour du mot de passe :", error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    static updateStatut(IdE, newStatut) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE profil SET Statut = ? WHERE IdE = ?', [newStatut,IdE], (error, results) => {
                if (error) {
                    console.error("Erreur lors de la mise à jour du statut :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    static async updateProfil(newData) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE profil SET Nom = ?, Prenom = ?, Poste = ?, Email = ? WHERE IdE = ?';
            db.query(sql, [newData.Nom, newData.Prenom, newData.Poste, newData.Email, newData.IdE], (error, results) => {
                if (error) {
                    console.error("Erreur lors de la mise à jour du profil :", error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

export default logModele;
