const connection = require("../connexion.js");
const Utilisateur = require("../models/utilisateur.js");

async function getAllUtilisateur() {
  try {
    await connection.connectToDatabase();
    const query = "SELECT * FROM utilisateur";
    const results = await connection.executeQuery(query);

    // Mapper les résultats pour créer des objets Recette
    const utilisateur = results.map(
      (result) =>
        new Utilisateur(
          result.id_utilisateur,
          result.Prenom,
          result.Nom,
          result.Adresse
        )
    );

    return utilisateur;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUtilisateur,
};
