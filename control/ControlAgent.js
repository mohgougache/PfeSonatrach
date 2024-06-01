import  agent from "../module/agent.js";
import email from "../module/email.js";

class AgentControl{
    
       static async selctALLagent(req,res){
        let results = await agent.getagentall();
        if(results){
            res.json(results);
           console.log(results);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit" });
          
        }
       }

       static async selectAgent(req, res) {
        const IdA = req.body?.IdA;
        try {
            let result = await agent.getagent(IdA);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ error: "Agent non trouvé" });
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'agent et des postes :", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    }
       static async selctAgent2(req,res){
        
        let results = await agent.getAgent();
        if(results){
            res.status(200).json(results);
            console.log(results);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit" });
          
        }
       }
    
    static async InsertAgentAndPoste(req, res) {

        const agente ={...req.body.agent};
        const postes ={...req.body.poste};
        console.log(req.body);
        if (!agente || !postes) {
            return res.status(400).json({ error: "Les données de l'agent et du poste sont requises." });
        }
    
        try { 
            const result = await agent.ajouterAgentAndPoste(agente, postes);
            if (result) {
                res.status(200).json({ message: 'Insertion réussie de l\'agent et du poste', result });
            } else { 
               
                res.status(401).json({ error: "Erreur d'insertion" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de l\'insertion de l\'agent et du poste', message: error.message });
        }
    }
    
    static async updateAgentAndPoste(req, res) {
        const agente ={...req.body.agent};
        const postes =[...req.body.postes];
        try { 
            
            const result = await agent.ModifieAgentAndPoste(agente, postes); 
            if(result){
                res.status(200).json({ message: 'Updit réussie de l\'agent et du poste', result });
            } else{
                res.status(401).json({ error: "erreur de updit " });
            }
        } catch (error) {
            console.log( error);
            res.status(500).json({ error: 'Erreur lors updit de l\'agent et du poste', message: error.message });
        }
    }
    
    static async deleteAgent(req, res) {
        const IdA = req.params.IdA; // Supposons que l'ID de l'agent à supprimer est passé en paramètre d'URL

        try {
          const result = await agent.suppAgent(IdA);
          console.log("Résultat de suppAgent :", result); // Ajouté pour le débogage
          if (result) {
            const data = await agent.getagentall();
            res.status(200).json({ message: 'Agent supprimé avec succès', data }); 
          } else {
            res.status(401).json({ error: "Erreur de suppression" });
          }
        } catch (error) {
          console.error("Erreur lors de la suppression de l'agent :", error);
          res.status(500).json({ error: "Erreur lors de la suppression de l'agent" });
        }
      }
    
    
    
       
       static async envoyerEmailEtInsert(req, res) { 
        console.log(req.body);
        const Data  ={... req.body};
        try {
          const resultE = await agent.selectEmail(Data.IdA); // Appel de la méthode statique selectEmail
          const resultI = await agent.insertRDV(Data); // Appel de la méthode statique insertRDV
          if (resultE && resultE.length > 0 && resultI) {
            res.status(200).json({ resultE, resultI }); // Correction de la réponse JSON
            console.log(resultE);
            email.email(resultE[0].Email, "visite periodice", "control/mail.html"); // Appel correct de la méthode pour envoyer l'e-mail
          } else if (!resultE) {
            res.status(401).json({ error: "Il n'existe pas d'agent avec cet identifiant" });
          } else if (!resultI) {
            res.status(401).json({ error: "Il n'est pas insert" }); 
          }
        } catch (error) {
          console.error("Erreur lors de l'envoi de l'e-mail :", error);
          res.status(500).json({ error: "Erreur interne lors de l'envoi de l'e-mail" });
        }
      }
      static async selcectRdv(req,res){
        const Date= req.body.Date
        let results = await agent.getRendevous(Date);
        if(results){
            res.json(results);
           console.log(results);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit" });
          
        }
       }
      static async deleteRdv(req,res){
        const IdR= req.params.IdR;
        let result = await agent.supRdv(IdR);
        if(result){
            res.json(result);
           console.log(result);
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit"})
        }
    
    } 
    static async updateRdv(req, res) {
        const Data = {...req.body};  
        let results = await agent.modifieRdv(Data); 
        if (results) {
            res.status(200).json({message:"bien modifie donne base de donne"});
        } else {
            res.status(401).json({ error: "Il y a un problème dans la requête" });
        }
    }
    static async InsertCertificat(req, res) {
        const { TypeC, certificatData } = req.body;
        try {
            const result = await agent.AjouterCertificat(TypeC,certificatData);
            if(result){
                res.status(200).json({ message: 'Insert réussie de certificat ', result });
            } else{
                res.status(401).json({ error: "erreur de Insert " });
            }
        } catch (error) {
            console.log( error);
            res.status(500).json({ error: 'Erreur lors Insert certificat', message: error.message });
        }
    }
    static async insererVisite(req, res) {
        const Vdata ={...req.body};
        try {
          const result = await agent.insererVisite(Vdata);
          res.status(200).json({ message: 'Données de visite insérées avec succès', result });
        } catch (error) {
          console.error('Erreur lors de l\'insertion des données de visite :', error);
          res.status(500).json({ error: 'Erreur lors de l\'insertion des données de visite' });
        }
      } 
      static async deleteVisite(req, res) {
        const IdV = req.params.id;

        try {
            await agent.supVisite(IdV);
            res.send({ message: 'Visite supprimée avec succès' });
        } catch (err) {
            console.error('Erreur lors de la suppression de la visite:', err);
            res.status(500).send('Erreur lors de la suppression de la visite');
        }
    }
    static async getVisitesDuJour(req, res) {
        try {
            const Date= req.body.Date;
          const visites = await agent.getVisitesDuJour(Date);
          res.status(200).json(visites);
        } catch (err) {
          res.status(500).json({ error: 'Erreur lors de la récupération des visites' });
        }
      }
}
  export default  AgentControl;