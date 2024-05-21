import db from "../baseDonne/connection.js";
class DossieModule{
    static ajouterCardiovasculaire(data) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO cadiovasculaire( `Palpitations`, `Oedemes`, `DoulureMarche`, `DoulureThoraciques`, `Deffort`, `Parmanente`, `Autre`, `Pouls`, `Ta`, `Varices`, `Cyanose`, `IdV`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.Palpitations, data.Oedemes, data.DoulureMarche, data.DoulureThoraciques, data.Deffort, data.Parmanente, data.Autre, data.Pouls, data.Ta, data.Varices, data.Cyanose, data.IdV]
            , (error, result) => {
                if (error) {
                    console.error("Erreur lors de l'insertion des données cardiovasculaires :", error);
                    reject(error);
                } else {
                    console.log("Données cardiovasculaires insérées avec succès :", result);
                    resolve(result);
                }
            });
        });
    }
    static ajouterDigestif(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO digestif (Appetit, Transit, selles, Alcool, Irritants, Pyrosis, Vomissements, Rectorragies, DouleursAbdominales, Autre, Denture, Hernie, Foie, IdV)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [data.Appetit, data.Transit, data.selles, data.Alcool, data.Irritants, data.Pyrosis, data.Vomissements, data.Rectorragies, data.DouleursAbdominales, data.Autre, data.Denture, data.Hernie, data.Foie, data.IdV];
            
            db.query(query, values, (error, result) => {
                if (error) {
                    console.error("Erreur lors de l'insertion des données digestives :", error);
                    reject(error);
                } else {
                    console.log("Données digestives insérées avec succès :", result);
                    resolve(result);
                }
            });
        });
    }

    static ajouterEndocrino(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO endocrino (ObesiteFamiliale, MaigreurFamiliale, Thyroide, IdV)
                           VALUES (?, ?, ?, ?)`;
            const values = [data.ObesiteFamiliale, data.MaigreurFamiliale, data.Thyroide, data.IdV];
            
            db.query(query, values, (error, result) => {
                if (error) {
                    console.error("Erreur lors de l'insertion des données endocrino :", error);
                    reject(error);
                } else {
                    console.log("Données endocrino insérées avec succès :", result);
                    resolve(result);
                }
            });
        });
    }

}
export default DossieModule  ;
