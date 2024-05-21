import  agent from "../module/certafica.js"; 
class certaficaControl{
static async InsertCertificat(req, res) {
    const { certificatData } = req.body;
    try {
        const result = await agent.AjouterCertificat(certificatData);
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
}

export default  certaficaControl;