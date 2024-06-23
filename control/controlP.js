// planingController.js

import planingeModel from '../module/planifing.js'; // Assurez-vous du chemin correct vers votre modèle planingeModel

class planingController {
   
        static async getPlaning(req, res) {
            try {
                const today = new Date().toISOString().split('T')[0]; // Format de la date : YYYY-MM-DD
                
                // Récupérer le nombre d'agents
                const  Agents = await planingeModel.getAgentCount();
                
                // Récupérer le nombre de visites préparées pour aujourd'hui
                const  PreparerVisite = await planingeModel.getVisitePreparedCount(today);
    
                // Récupérer le nombre de documents sortis pour aujourd'hui
                const Visite  = await planingeModel.getDocumentCount(today);

                  // Récupérer le nombre de rendez-vous pour aujourd'hui
                const  Rdv = await planingeModel.getRDVCount(today);
    
                // Récupérer le nombre de rendez-vous par type pour aujourd'hui avec le pourcentage
                const VisteType = await planingeModel.getRDVCountByType(today);

                const agentRDVDetails = await planingeModel.getAgentRDVDetails(today);
    
                res.status(200).json({
                    Agents,
                    PreparerVisite,
                    Visite ,
                    Rdv,
                    VisteType,
                    agentRDVDetails
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques :', error);
                res.status(500).json({ error: 'Erreur interne du serveur' });
            }
        }
    }


export default planingController;
