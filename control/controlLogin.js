import login from "../module/login.js";

class loginController {
  static async ajouterProfil(req, res) {
    console.log(req.body);
    const { DataProfil } = req.body;

    try {
        const result = await login.ajouterProfil(DataProfil);
        res.status(201).json({ success: true, message: 'Profil ajouté avec succès.', data: result });
    } catch (error) {
      
            res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout du profil.', error: error.message });
        
        console.log(error);
    }

}

static async verficontrol(req, res) {
  console.log(req.body);
  const { logine } = req.body;

  if (!logine.IdE || !logine.Password) {
    return res.status(400).json({ error: "Erreur IdE ou mot de passe manquant." });
  }

  try {
    const data = await login.verifie(logine);
    res.status(200).json({
      message: "Connexion réussie",
    user:
    {
      Token: data.token,
      Exp: data.expiration,
      IdE: data.IdE,
      Nom: data.Nom,
      Prenom: data.Prenom,
      Poste:  data.Poste,
    }
    });
  } catch (error) {
    console.error("Erreur lors de la vérification du login :", error);
    if (error === "Aucun utilisateur trouvé avec ces informations de connexion." || error === "Mot de passe incorrect.") {
      res.status(401).json({ error });
    } else {
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  }
}

}
 
export default loginController;
