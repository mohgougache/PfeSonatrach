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
}

export default statisticModel;
