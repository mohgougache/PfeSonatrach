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
    static async ajouterExemensComplementaires(data) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO exemenscomplementaires 
                          (Radiologiques, RRadiologiques, Biologiques, RBiologiques, Toxicologiques, RToxicologiques, IdV) 
                          VALUES (?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                data.Radiologiques, 
                data.RRadiologiques, 
                data.Biologiques, 
                data.RBiologiques, 
                data.Toxicologiques, 
                data.RToxicologiques, 
                data.IdV
            ];

            db.query(query, values, (error, result) => {
                if (error) {
                    console.error("Erreur lors de l'insertion des données d'examens complémentaires :", error);
                    reject(error);
                } else {
                    console.log("Données d'examens complémentaires insérées avec succès :", result);
                    resolve(result);
                }
            });
        });
    }
   
        static async ajouterExplorationsfonctionnelles(data) {
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO `explorationsfonctionnelles`(`FonctionRespiratoire`, `FonctionCirculatoire`, `FonctionMotrice`, `IdV`) VALUES (?, ?, ?, ?)',
                    [data.FonctionRespiratoire, data.FonctionCirculatoire, data.FonctionMotrice, data.IdV],
                    (error, result) => {
                        if (error) {
                            console.error("Erreur lors de l'insertion des données d'explorations fonctionnelles :", error);
                            reject(error);
                        } else {
                            console.log("Données d'explorations fonctionnelles insérées avec succès :", result);
                            resolve(result);
                        }
                    }
                );
            });
        }
        static async ajoutergenitourinaire(data) {
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO `genitourinaire`(`MictionsNoctumes`, `Pallakiurie`, `Hematurie`, `Dysurie`, `BruluresMictionnelles`, `ColiquesNephretiques`, `Pertes`, `Menstruations`, `Autre`, `Bourses`, `Seins`, `Tr`, `Tv`, `IdV`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        data.MictionsNoctumes,
                        data.Pallakiurie,
                        data.Hematurie,
                        data.Dysurie,
                        data.BruluresMictionnelles,
                        data.ColiquesNephretiques,
                        data.Pertes,
                        data.Menstruations,
                        data.Autre,
                        data.Bourses,
                        data.Seins,
                        data.Tr,
                        data.Tv,
                        data.IdV
                    ],
                    (error, result) => {
                        if (error) {
                            console.error("Erreur lors de l'insertion des données génitourinaires :", error);
                            reject(error);
                        } else {
                            console.log("Données génitourinaires insérées avec succès :", result);
                            resolve(result);
                        }
                    }
                );
            });
        }
        static async ajouterhematogg(data) {
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO `hematogg`(`Ecchymoses`, `TendancesHemorragies`, `Rate`, `Petechies`, `Purupura`, `Carvicaux`, `SusClaviculaires`, `Axillarires`, `Inguinaux`, `IdV`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        data.Ecchymoses,
                        data.TendancesHemorragies,
                        data.Rate,
                        data.Petechies,
                        data.Purupura,
                        data.Carvicaux,
                        data.SusClaviculaires,
                        data.Axillarires,
                        data.Inguinaux,
                        data.IdV
                    ],
                    (error, result) => {
                        if (error) {
                            console.error("Erreur lors de l'insertion des données hématologiques :", error);
                            reject(error);
                        } else {
                            console.log("Données hématologiques insérées avec succès :", result);
                            resolve(result);
                        }
                    }
                );
            });
        }
        static async ajouterlocomoteur(data) {
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO `locomoteur`(`Musculaires`, `Articulaires`, `Vertebrales`, `Nevralgiques`, `GeneMouvements`, `Fatigabilite`, `Autre`, `Exemen`, `IdV`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        data.Musculaires,
                        data.Articulaires,
                        data.Vertebrales,
                        data.Nevralgiques,
                        data.GeneMouvements,
                        data.Fatigabilite,
                        data.Autre,
                        data.Exemen,
                        data.IdV
                    ],
                    (error, result) => {
                        if (error) {
                            console.error("Erreur lors de l'insertion des données locomoteur :", error);
                            reject(error);
                        } else {
                            console.log("Données locomoteur insérées avec succès :", result);
                            resolve(result);
                        }
                    }
                );
            });
        }

        static async ajouterneuropsychisme(data) {
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO neuropsychisme (
                        Sommeil, Cephatees, Vertige, PeurVide, PerteConaissance, Paresies, Paresthesies, Autre,
                        Tremblement, Remberg, Coordination, Sensibilite, Motricite, IdV
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    data.Sommeil, data.Cephatees, data.Vertige, data.PeurVide, data.PerteConaissance, data.Paresies,
                    data.Paresthesies, data.Autre, data.Tremblement, data.Remberg, data.Coordination,
                    data.Sensibilite, data.Motricite, data.IdV
                ];
                db.query(query, values, (error, result) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion des données de neuropsychisme :", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        static async ajouteropht(data) {
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO opht (
                        Larmoiement, OeilRouge, Douleure, Fatique, TachesDeventYeux, AutreOpht, Exemen, IdV
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    data.Larmoiement, data.OeilRouge, data.Douleure, data.Fatique, data.TachesDeventYeux, 
                    data.AutreOpht, data.Exemen, data.IdV
                ];
                db.query(query, values, (error, result) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion des données d'ophtalmologie :", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
        static async ajouterorl(data) {
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO orl (
                        Siffiements, EntendMal, AnginesRepetees, Otorrhees, Epistaxis, Eternuement, 
                        Rhinorrhee, Autre, Exemen, IdV
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    data.Siffiements, data.EntendMal, data.AnginesRepetees, data.Otorrhees, 
                    data.Epistaxis, data.Eternuement, data.Rhinorrhee, data.Autre, 
                    data.Exemen, data.IdV 
                ];
                db.query(query, values, (error, result) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion des données ORL :", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
        static async ajouterpeaumuqueuses(data) {
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO peaumuqueuses (Allergie, Exemen, IdV)
                    VALUES (?, ?, ?)
                `;
                const values = [data.Allergie, data.Exemen, data.IdV];
                db.query(query, values, (error, result) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion des données peaumuqueuses :", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
        static async ajouterrespiratoire(data) {
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO respiratoire (Toux, Noctume, Diurne, Expectorations, DouleursThoraciq, Tabac, Autre, Exemen, IdV)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    data.Toux,
                    data.Noctume,
                    data.Diurne,
                    data.Expectorations,
                    data.DouleursThoraciq,
                    data.Tabac,
                    data.Autre,
                    data.Exemen,
                    data.IdV
                ];
                db.query(query, values, (error, result) => {
                    if (error) {
                        console.error("Erreur lors de l'insertion des données respiratoires :", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
}
export default DossieModule  ;
