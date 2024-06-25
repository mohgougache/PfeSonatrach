// planifing.js (ou planingeModel.js si c'est le bon fichier)
import db from '../baseDonne/connection.js'; // Assurez-vous du chemin correct vers votre connexion DB

class planifingModel {
    static getAgentCount() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(*) AS agentCount FROM agent';
            db.query(query, (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    if (!rows || !Array.isArray(rows) || rows.length === 0) {
                        reject(new Error('Aucun résultat trouvé pour getAgentCount'));
                    } else {
                        resolve(rows[0].agentCount);
                    }
                }
            });
        });
    }

    static getVisitePreparedCount(today) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(*) AS visitePreparedCount FROM visite WHERE created_at = ?';
            db.query(query, [today], (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    if (!rows || !Array.isArray(rows) || rows.length === 0) {
                        reject(new Error('Aucun résultat trouvé pour getVisitePreparedCount'));
                    } else {
                        resolve(rows[0].visitePreparedCount);
                    }
                }
            });
        });
    }

    static getDocumentCount(today) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT COUNT(*) AS documentCount 
                FROM document d
                INNER JOIN visite v ON d.IdV = v.IdV
                WHERE v.created_at = ?`;
            
            db.query(query, [today], (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    if (!rows || !Array.isArray(rows) || rows.length === 0) {
                        reject(new Error('Aucun résultat trouvé pour getDocumentCount'));
                    } else {
                        resolve(rows[0].documentCount);
                    }
                }
            });
        });
    }
    static getRDVCount(today) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(*) AS rdvCount FROM rdv WHERE date = ?';
            db.query(query, [today], (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                   
                    if (!rows || !Array.isArray(rows) || rows.length === 0) {
                        reject(new Error('Aucun résultat trouvé pour getRDVCount'));
                    } else {
                        resolve(rows[0].rdvCount);
                    }
                }
            });
        });
    }
    static getRDVCountByType(today) {
        return new Promise((resolve, reject) => {
            // Première requête pour obtenir le nombre total de rendez-vous pour aujourd'hui
            const queryTotal = `SELECT COUNT(*) AS totalRDVCount FROM rdv WHERE date = ?`;
    
            db.query(queryTotal, [today], (error, totalRows) => {
                if (error) {
                    reject(error);
                } else {
                    const totalRDVCount = totalRows[0].totalRDVCount;
                    
                    // Si aucun rendez-vous n'est trouvé, retourner 0 pour chaque type
                    if (totalRDVCount === 0) {
                        const rdvCounts = [
                            {
                                type: 'emporche',
                                valeu: 0,
                                Calcul: 0
                            },
                            {
                                type: 'periodice',
                                valeu: 0,
                                Calcul: 0
                            },
                            {
                                type: 'consultation',
                                valeu: 0,
                                Calcul: 0
                            },
                            {
                                type: 'reprize',
                                valeu: 0,
                                Calcul: 0
                            }
                        ];
                        resolve(rdvCounts);
                    } else {
                        // Deuxième requête pour obtenir le nombre de rendez-vous par type
                        const query = `
                            SELECT 
                                (SELECT COUNT(*) FROM rdv WHERE Typerdv = 'emporche' AND date = ?) AS emporcheCount,
                                (SELECT COUNT(*) FROM rdv WHERE Typerdv = 'periodice' AND date = ?) AS periodiceCount,
                                (SELECT COUNT(*) FROM rdv WHERE Typerdv = 'consultation' AND date = ?) AS consultationCount,
                                (SELECT COUNT(*) FROM rdv WHERE Typerdv = 'reprize' AND date = ?) AS reprizeCount`;
    
                        db.query(query, [today, today, today, today], (error, rows) => {
                            if (error) {
                                reject(error);
                            } else {
                                if (!rows || !Array.isArray(rows) || rows.length === 0) {
                                    reject(new Error('Aucun résultat trouvé pour getRDVCountByType'));
                                } else {
                                    const rdvCounts = [
                                        {
                                            type: 'emporche',
                                            valeu: rows[0].emporcheCount,
                                            Calcul: ((rows[0].emporcheCount / totalRDVCount) * 100).toFixed(2)
                                        },
                                        {
                                            type: 'periodice',
                                            valeu: rows[0].periodiceCount,
                                            Calcul: ((rows[0].periodiceCount / totalRDVCount) * 100).toFixed(2)
                                        },
                                        {
                                            type: 'consultation',
                                            valeu: rows[0].consultationCount,
                                            Calcul: ((rows[0].consultationCount / totalRDVCount) * 100).toFixed(2)
                                        },
                                        {
                                            type: 'reprize',
                                            valeu: rows[0].reprizeCount,
                                            Calcul: ((rows[0].reprizeCount / totalRDVCount) * 100).toFixed(2)
                                        }
                                    ];
                                    resolve(rdvCounts);
                                }
                            }
                        });
                    }
                }
            });
        });
    }
    
    static getAgentRDVDetails(today) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    a.Nom, 
                    a.Prenom, 
                    r.Typerdv, 
                    r.Heure,
                    v.Statut
                FROM 
                    agent a
                    JOIN rdv r ON a.IdA = r.IdA
                    JOIN visite v ON r.IdR = v.IdR
                WHERE 
                    v.created_at = ? 
                    AND v.Statut = 1`;
    
            db.query(query, [today], (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    static getAgentPeriodicVisits() {
        return new Promise((resolve, reject) => {
            const currentDate = new Date(); // Date actuelle
        const threeMonthsAgo = new Date(currentDate);
        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    
            const query = `
                SELECT 
                    a.IdA,
                    a.Nom,
                    a.Prenom,
                    a.Email,
                    r.Typerdv
                FROM 
                    agent a
                    JOIN rdv r ON a.IdA = r.IdA
                    JOIN visite v ON r.IdR = v.IdR
                WHERE 
                    r.Typerdv = 'periodice'
                    AND r.date = ?  
                    AND v.Statut = 1`;
    
            db.query(query, [threeMonthsAgo], (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    
    
}

export default planifingModel;
