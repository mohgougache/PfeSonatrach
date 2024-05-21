import  dossie from "../module/dossie.js";
import logModele from "../module/login.js";
class DossieControl{
    
    static async insertCardiovasculaire(req, res) {
        const {data}= req.body;
        console.log(req.body);
        try {
            const result = await dossie.ajouterCardiovasculaire(data);
            res.status(200).json({ message: 'Données cardiovasculaires insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données cardiovasculaires :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données cardiovasculaires' });
        }
    }
    static async insertDigestif(req, res) {
        const {data}= req.body;
        console.log(req.body);
        try {
            const result = await dossie.ajouterDigestif(data);
            res.status(200).json({ message: 'Données Digestif insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données Digestif :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données Digestif' });
        }
    }

    static async insertEndocrino(req, res) {
        const {data}= req.body;
        console.log(req.body);
        try {
            const result = await dossie.ajouterEndocrino(data);
            res.status(200).json({ message: 'Données Endocrino insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données Endocrino :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données Endocrino' });
        }
    }
}
export default  DossieControl;  