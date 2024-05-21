import express from 'express';
import controll from "../control/controlLogin.js";
import controlA from "../control/ControlAgent.js";
import controlC from "../control/controlCertafica.js";
import controlD from  "../control/controlDossie.js"

const router = express.Router();
router.post("/api/profil", controll.ajouterProfil);
router.post("/api/login", controll.verficontrol);
router.post("/api/ajouter", controlA.InsertAgentAndPoste);
router.get("/api/agentall", controlA.selctALLagent);
router.get("/api/agent1", controlA.selctagent);
router.get("/api/agent2", controlA.selctAgent2);
router.delete("/api/supagent/:IdA", controlA.deleteAgent);
router.put("/api/modifagent", controlA.updateAgentAndPoste);
router.post("/api/convocation", controlA.envoyerEmailEtInsert); 
router.get("/api/selctRdv",controlA.selcectRdv); 
router.delete("/api/suprdv/:IdR", controlA.deleteRdv);
router.put("/api/modifRdv", controlA.updateRdv);
router.post("/api/certificat", controlC.InsertCertificat);
router.post("/api/visite", controlA.insererVisite);
router.post("/api/Cardiovasculaire",controlD.insertCardiovasculaire) ;
router.post("/api/Digestif",controlD.insertDigestif) ;
router.post("/api/Endocrino",controlD.insertEndocrino) ;
export default router; 
 