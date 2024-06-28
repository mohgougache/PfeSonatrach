import statisticModel from '../module/stsicM.js';
class statictiController {
  static async getMonthlyStatistics(req, res) {
    try {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();

        const agentCount = await statisticModel.getAgentsWithVisitsCount(month, year);
        const rdvCount = await statisticModel.getRendezVousCount(month, year);
        const visiteCount = await statisticModel.getVisiteCount(month, year);
        const maladie = await statisticModel.getDiseaseCountsM(month, year);
        const examenradio = await statisticModel.getDiseaseCountsR(month, year);
        const typeRdv = await statisticModel.getTypeRdvCounts(month, year);

        res.status(200).json({
            agentCount,
            rdvCount,
            visiteCount,
            maladie,
            examenradio,
            typeRdv
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques mensuelles :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
}
export default statictiController;