import db from "../baseDonne/connection.js";

class pdfModel {
   static async getAgentData(agentId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM agent WHERE IdA = ?', [agentId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.length === 0) {
                   
                    return reject(new Error('Agent not found'));
                }
                console.log(results[0]);
                resolve(results[0]);
            });
        });
    }

   static async getMedicamentData(IdV) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM medicament WHERE IdV = ?', [IdV], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

static async getExamenRadioData(IdV) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM examen_radio WHERE IdV = ?', [IdV], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

  static  async getExamenBiologieData(IdV) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM examen_biologie WHERE IdV = ?', [IdV], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}
export default pdfModel;
