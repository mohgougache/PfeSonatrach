import db from "../baseDonne/connection.js";

class logModele {
  static async verfie(email, password, poste) {
    return new Promise((resolve) => {
      db.query(
        "SELECT * FROM profil WHERE mail = ? AND Password = ? AND Poste = ? ",
        [email, password ,poste],
        (error, result) => {
          if (!error) {
            resolve(result);
          }
          if (error) {
            console.log(error);
          }
        }
      );
    });
  }
}
export default logModele;
