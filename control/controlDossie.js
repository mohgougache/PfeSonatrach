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
    static async insertExemensComplementaires(req, res) {
        const {data}= req.body;
        console.log(req.body);
        try {
            const result = await dossie.ajouterExemensComplementaires(data);
            res.status(200).json({ message: 'Données ExemensComplementaires insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données ExemensComplementaires :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données ExemensComplementaires' });
        }
    }
    static async insertExplorationsfonctionnelles(req, res) {
        const {data}= req.body;
        console.log(req.body);
        try {
            const result = await dossie.ajouterExplorationsfonctionnelles(data);
            res.status(200).json({ message: 'Données Explorationsfonctionnelles insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données Explorationsfonctionnelles :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données Explorationsfonctionnelles' });
        }
    }
    static async insertgenitourinair(req, res) {
        const {data}= req.body;
        console.log(req.body);
        try {
            const result = await dossie.ajoutergenitourinaire(data);
            res.status(200).json({ message: 'Données genitourinair insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données genitourinair :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données genitourinair' });
        }
    }
    static async inserthematogg(req, res) {
        const {data}= req.body;
        console.log(req.body);
        try {
            const result = await dossie.ajouterhematogg(data);
            res.status(200).json({ message: 'Données hematogg insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données hematogg :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données hematogg' });
        }
    }
    static async insertlocomoteur(req, res) {
        const {data}= req.body; 
        console.log(req.body);
        try {
            const result = await dossie.ajouterlocomoteur(data);
            res.status(200).json({ message: 'Données locomoteur insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données locomoteur :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données locomoteur' });
        }
    }
    static async insertneuropsychisme(req, res) {
        const {data}= req.body; 
        console.log(req.body);
        try {
            const result = await dossie.ajouterneuropsychisme(data);
            res.status(200).json({ message: 'Données neuropsychisme insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données neuropsychisme :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données neuropsychisme' });
        }
    }
    static async insertopht(req, res) {
        const {data}= req.body; 
        console.log(req.body);
        try {
            const result = await dossie.ajouteropht(data);
            res.status(200).json({ message: 'Données opht insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données opht :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données opht' });
        }
    }
    static async insertorl(req, res) {
        const {data}= req.body; 
        console.log(req.body);
        try {
            const result = await dossie.ajouterorl(data);
            res.status(200).json({ message: 'Données orl insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données orl :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données orl' });
        }
    }
    static async insertpeaumuqueuses(req, res) {
        const {data}= req.body; 
        console.log(req.body);
        try {
            const result = await dossie.ajouterpeaumuqueuses(data);
            res.status(200).json({ message: 'Données peaumuqueuses insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données peaumuqueuses :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données peaumuqueuses' });
        }
    }
    static async insertrespiratoire(req, res) {
        const {data}= req.body; 
        console.log(req.body);
        try {
            const result = await dossie.ajouterrespiratoire(data);
            res.status(200).json({ message: 'Données respiratoire insérées avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'insertion des données respiratoire :', error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion des données respiratoire' });
        }
    }
}
export default  DossieControl;  