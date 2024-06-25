import db from '../baseDonne/connection.js';
class statisticModel {
    static getAgentsWithVisitsCount(month, year) {
        return new Promise((resolve, reject) => {
            const query = `SELECT COUNT(DISTINCT rdv.IdA) AS agentCount
                FROM visite
                JOIN rdv ON visite.IdR = rdv.IdR
                WHERE MONTH(visite.created_at) = ? AND YEAR(visite.created_at) = ?
            `;
            db.query(query, [month, year], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0].agentCount);
            });
        });
    }

    // Récupérer le nombre total de rendez-vous pour ce mois
    static getRendezVousCount(month, year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT COUNT(*) AS rdvCount
                FROM rdv
                WHERE MONTH(Date) = ? AND YEAR(Date) = ?
            `;
            db.query(query, [month, year], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0].rdvCount);
            });
        });
    }

    // Récupérer le nombre total de visites pour ce mois
    static getVisiteCount(month, year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT COUNT(*) AS visiteCount
                FROM visite
                WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?
            `;
            db.query(query, [month, year], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0].visiteCount);
            });
        });
    }
    static getDiseaseCountsM(month, year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT maladie.LiberM AS LiberM , COUNT(*) AS numbre
                FROM visite
                JOIN maladie ON visite.IdV = maladie.IdV
                WHERE MONTH(visite.created_at) = ? AND YEAR(visite.created_at) = ?
                GROUP BY maladie.IdV, maladie.LiberM
                ORDER BY numbre DESC
            LIMIT 4
            `;
            db.query(query, [month, year], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    


    static getDiseaseCountsR(month, year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT examenradio.LiberX AS LiberR , COUNT(*) AS numbre
                FROM visite
                JOIN examenradio ON visite.IdV = examenradio.IdV
                WHERE MONTH(visite.created_at) = ? AND YEAR(visite.created_at) = ?
                GROUP BY examenradio.IdV, examenradio.LiberX
                ORDER BY numbre DESC
            LIMIT 4
            `;
            db.query(query, [month, year], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static getTypeRdvCounts(month, year) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT rdv.TypeRdv AS typeRdv, COUNT(*) AS rdvCount
                FROM visite
                JOIN rdv ON visite.IdR = rdv.IdR
                WHERE MONTH(visite.created_at) = ? AND YEAR(visite.created_at) = ?
                GROUP BY rdv.TypeRdv
            `;
            db.query(query, [month, year], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}

export default statisticModel;
