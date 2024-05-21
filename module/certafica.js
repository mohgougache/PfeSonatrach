
import db from "../baseDonne/connection.js";
class CartaficaModule{

static AjouterCertificat(certificatData) {
    if (certificatData.TypeC == "certificatat") { 
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO `certificatat`(`Date`, `NomM`, `Nom`, `Prenom`, `age`, `ArretTravail`, `DateR`, `PrArret`, `DatePA`, `DatePR`, `IdA`) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [certificatData.Date, certificatData.NomM, certificatData.Nom, certificatData.Prenom, certificatData.age, certificatData.ArretTravail, certificatData.DateR, certificatData.PrArret, certificatData.DatePA, certificatData.DatePR, certificatData.IdA], (err, result) => {
                if (err) {
                    console.error("Erreur lors de l'insertion du certificat :", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
      }
     else if(certificatData.TypeC==certificatbs){
      return new Promise((resolve, reject) => {
        db.query("NSERT INTO `certificatbs`(`Date`, `NomM`, `nom`, `prenom`, `age`, `IdA`) VALUES(?,?,?,?,?,?)", [certificatData.Date,certificatData.NomM ,certificatData.Nom, certificatData.Prenom, certificatData.age, certificatData.IdA], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion du certificat :", err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
     }
     else if(certificatData.TypeC==certificatm){
      return new Promise((resolve, reject) => {
        db.query("INSERT INTO `certificatm`(`Date`, `NomM`, `Nom`, `Prenom`, `age`, `Necessite`, `IdA`) VALUES (?,?,?,?,?,?,?)", [certificatData.Date,certificatData.NomM, certificatData.Nom, certificatData.Prenom, certificatData.age, certificatData.Necessite,certificatData.IdA], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion du certificat :", err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
     }
     else if(certificatData.TypeC==ordonnance){
      return new Promise((resolve, reject) => {
        db.query("INSERT INTO `ordonnance`(`Date`, `Nom`, `Prenom`, `Age`, `Descr`, `IdA`) VALUES (?,?,?,?,?,?)", [certificatData.Date, certificatData.Nom, certificatData.Prenom, certificatData.age, certificatData.Descr,certificatData.IdA], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion du certificat :", err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
     }
     else if(certificatData.TypeC==ordonnance){
      return new Promise((resolve, reject) => {
        db.query("NSERT INTO `certificatma`(`Date`, `Nom`, `Prenom`, `DateN`, `Unite`, `Poste`, `ModdeT`, `Juge`, `Observation`, `IdA`) VALUES (?,?,?,?,?,?,?,?,?,?)", [certificatData.Date, certificatData.Nom, certificatData.Prenom, certificatData.DateN, certificatData.Unite,certificatData.Poste, certificatData.ModdeT,certificatData.Juge, certificatData.Observation,certificatData.IdA], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion du certificat :", err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
     }
     

    }
}
export default CartaficaModule ;