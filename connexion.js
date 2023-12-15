// connexion.js

// Importe le module MySQL

const mysql = require("mysql");

// Crée une connexion MySQL avec les informations de connexion
const con = mysql.createConnection({
  host: "localhost", // Hôte de la base de données
  user: "root", // Nom d'utilisateur de la base de données
  password: "", // Mot de passe de la base de données
  database: "recettes", // Nom de la base de données
});

// Fonction pour se connecter à la base de données
function connectToDatabase() {
  // Retourne une promesse pour gérer la connexion de manière asynchrone
  return new Promise((resolve, reject) => {
    // Vérifie si la connexion est déconnectée
    if (con.state === "disconnected") {
      // Tente de se connecter à la base de données
      con.connect((err) => {
        if (err) {
          // En cas d'erreur, rejette la promesse avec l'erreur
          reject(err);
        } else {
          // Si la connexion est établie avec succès, résout la promesse
          resolve();
        }
      });
    } else {
      // Si la connexion est déjà établie, résout la promesse
      resolve();
    }
  });
}

// Fonction pour exécuter une requête SQL sur la base de données
function executeQuery(query) {
  // Retourne une promesse pour gérer l'exécution de la requête de manière asynchrone
  return new Promise((resolve, reject) => {
    // Utilise la méthode query pour exécuter la requête sur la base de données
    con.query(query, (err, result, fields) => {
      if (err) {
        // En cas d'erreur, rejette la promesse avec l'erreur
        reject(err);
      } else {
        // Si la requête est exécutée avec succès, résout la promesse avec les résultats
        resolve(result);
      }
    });
  });
}

// Fonction pour fermer la connexion à la base de données
function closeConnection() {
  // Retourne une promesse pour gérer la fermeture de la connexion de manière asynchrone
  return new Promise((resolve, reject) => {
    // Utilise la méthode end pour fermer la connexion à la base de données
    con.end((err) => {
      if (err) {
        // En cas d'erreur lors de la fermeture, rejette la promesse avec l'erreur
        reject(err);
      } else {
        // Si la fermeture est effectuée avec succès, résout la promesse
        resolve();
      }
    });
  });
}

// Exporte les fonctions pour les rendre disponibles à d'autres modules
module.exports = {
  connectToDatabase,
  executeQuery,
  closeConnection,
};
