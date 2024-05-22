import login from "../module/login.js";
import email from "../module/email.js";
import crypto from "crypto";
class loginController {
    static async ajouterProfil(req, res) {
        console.log(req.body);
        const DataProfil = { ...req.body };

        try {
            const Password = crypto.randomBytes(3).toString('hex');
            const IdE = DataProfil.Nom + DataProfil.Prenom + Math.floor(Math.random() * 100);
            const result = await login.ajouterProfil(DataProfil, Password, IdE);
            await email.email(DataProfil.Email, "visite periodice", "control/mail.html");
            res.status(201).json({ success: true, message: 'Profil ajouté avec succès.', data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: "Erreur lors de l'ajout du profil.", error: error.message });
            console.log(error);
        }
    }


static async verficontrol(req, res) {
  console.log(req.body);
  const  logine  = {...req.body};

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
  static async DeletProfil(req,res){
    const IdE= req.params.IdE;
        let result = await login.supProfil(IdE);
        if(result){
          res.status(200).json({ result: "bien supprime Profil"});
        }
        else {
            res.status(401).json({ error: "il ya problame dans la requit"})
        }
  }
  static async getProfils(req, res) {
    try {
        const profils = await login.getAllProfils();
        res.status(200).json({ success: true, data: profils });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erreur lors de la récupération des profils.', error: error.message });
    }
}

static async updatePassword(req, res) {
  const IdE= req.body.IdE;

  try {
    const newPassword= crypto.randomBytes(3).toString('hex');
    if (!IdE || !newPassword) {
      return res.status(400).json({ success: false, message: 'IdE et newPassword sont requis.' });
  }
      const result = await login.updatePassword(IdE,newPassword);
      if (result.affectedRows === 0) {
          res.status(404).json({ success: false, message: 'Profil non trouvé.' });
      } else {
          res.status(200).json({ success: true, message: 'Mot de passe mis à jour avec succès.' });
      }
  } catch (error) {
    console.log(error);
      res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du mot de passe.', error: error.message });
  }
}
static async chengeStatut(req, res) {
  const IdE  = req.body.IdE;

  if (!IdE) {
      return res.status(400).json({ success: false, message: 'IdE est requis.' });
  }

  try {
      const profil = await login.getAllProfils(IdE);
      if (!profil) {
          return res.status(404).json({ success: false, message: 'Profil non trouvé.' });
      }

      let newStatut;
      if (profil.Statut === 0) {
          newStatut = 1;
      } else {
          newStatut = 0;
      }

      const result = await login.updateStatut(IdE, newStatut);

      if (result.affectedRows === 0) {
          res.status(404).json({ success: false, message: 'Profil non trouvé.' });
      } else {
          res.status(200).json({ success: true, message: 'Statut mis à jour avec succès.' });
      }
  } catch (error) {
      res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du statut.', error: error.message });
  }
}
static async updateProfil(req, res) {
  const newData = { ...req.body };

  try {
      const result = await login.updateProfil(newData);

      if (result.affectedRows === 0) {
          res.status(404).json({ success: false, message: 'Profil non trouvé.' });
      } else {
          res.status(200).json({ success: true, message: 'Profil mis à jour avec succès.' });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour du profil.', error: error.message });
  }
}
}
 
export default loginController; 
