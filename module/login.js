import db from "../baseDonne/connection.js";
import crypto from "crypto";
import bcrypt from 'bcrypt';
import argon2 from 'argon2'

class logModele {
  static async ajouterProfil(DataProfil) {
    try {
      const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(DataProfil.Password, salt); // Générer le hachage du mot de passe
        console.log("Hachage du mot de passe :", hashedPassword); // Journal de débogage

        const result = await new Promise((resolve, reject) => {
            db.query('INSERT INTO profil (IdE, Nom, Prenom, Password,Poste) VALUES (?, ?, ?, ?,?)', 
            [DataProfil.IdE, DataProfil.Nom, DataProfil.Prenom, hashedPassword,DataProfil.Poste], (error, result) => {
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
          "SELECT * FROM profil WHERE IdE = ?",
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
// static ajouterProfil(DataProfil) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const hashedPassword = await argon2.hash(DataProfil.Password);
//       db.query(
//         "INSERT INTO profil (IdE, Nom, Prenom, Password) VALUES (?, ?, ?, ?)",
//         [DataProfil.IdE, DataProfil.Nom, DataProfil.Prenom, hashedPassword],
//         (error, result) => {
//           if (error) {
//             console.error("Erreur lors de l'insertion du profil :", error);
//             reject(error);
//           } else {
//             resolve({ affectedRows: result.affectedRows, insertId: result.insertId });
//           }
//         }
//       );
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// static verifie(login) {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "SELECT * FROM profil WHERE IdE = ?",
//       [login.IdE],
//       async (error, result) => {
//         if (error) {
//           console.error("Erreur lors de la vérification du login :", error);
//           reject(error);
//           return;
//         }

//         if (result && result.length > 0) {
//           const hashedPassword = result[0].Password;
//           try {
           
//             const match = await argon2.verify(hashedPassword, login.Password);
//             if (match) {
//               const token = crypto.randomUUID();
//               const expiration = new Date(Date.now() + 8 * 60 * 60 * 1000); // 8 heures
//               db.query(
//                 "INSERT INTO `section`(`Token`, `IdE`, `Exp`) VALUES (?, ?, ?)",
//                 [token, result[0].IdE, expiration],
//                 (err, resu) => {
//                   if (err) {
//                     console.error("Erreur lors de l'insertion du token dans la table 'section' :", err);
//                     reject(err);
//                   } else {
//                     resolve({ token, expiration, IdE: result[0].IdE });
//                   }
//                 }
//               );
//             } else {
//               reject("Mot de passe incorrect.");
//             }
//           } catch (err) {
//             console.error("Erreur lors de la vérification du mot de passe :", err);
//             reject(err);
//           }
//         } else {
//           reject("Aucun utilisateur trouvé avec ces informations de connexion.");
//         }
//       }
//     );
//   });
// }
}
export default logModele;
