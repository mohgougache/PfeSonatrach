import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pfe",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données : " + err.message);
    return;
  }
  console.log("Connexion réussie à la base de données");
});

connection.on("error", function (err) {
  console.error("Erreur de base de données : " + err.message);
});

export default connection;
