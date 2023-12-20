const connection = require("../connexion.js");
const Utilisateur = require("../models/utilisateurModel.js");

async function getAllUtilisateur() {
  try {
    await connection.connectToDatabase();
    const query = "SELECT * FROM utilisateur";
    const results = await connection.executeQuery(query);

    // Mapper les résultats pour créer des objets Recette
    const utilisateur = results.map(
      (result) =>
        new Utilisateur(
          result.MotDePasse,
          result.Prenom,
          result.Nom,
          result.Adresse,
          result.Role
        )
    );

    return utilisateur;
  } catch (error) {
    throw error;
  }
}

async function insertUtilisateur(MotDePasse, Prenom, Nom, Adresse, Role) {
  try {
    await connection.connectToDatabase();

    const query = `
      INSERT INTO utilisateur (mot_de_passe, Prenom, Nom, Adresse, role)
      VALUES ('${MotDePasse}', '${Prenom}', '${Nom}', '${Adresse}', '${Role}')
    `;

    const result = await connection.executeQuery(query);
    console.log(result);

    const newUtilisateurId = result.insertId;

    return newUtilisateurId;
  } catch (error) {
    throw error;
  }
}

async function deleteUtilisateur(id) {
  try {
    await connection.connectToDatabase();
    const query = `DELETE FROM utilisateur WHERE id_utilisateur = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

async function modificationUtilisateur(
  id,
  nouveauxMotDePasse,
  nouveauxNom,
  nouveauxPrenom,
  nouveauxAdresse,
  nouveauxRole
) {
  try {
    await connection.connectToDatabase();
    const query = `
    UPDATE utilisateur 
    SET 
      mot_de_passe = '${nouveauxMotDePasse}', 
      Prenom = '${nouveauxPrenom}', 
      Nom = '${nouveauxNom}', 
      Adresse = '${nouveauxAdresse}',
      role = '${nouveauxRole}'
    WHERE id_utilisateur = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

async function getUtilisateurById(id) {
  try {
    await connection.connectToDatabase();
    const query = `SELECT * FROM utilisateur WHERE id_utilisateur = ${id}`;
    const result = await connection.executeQuery(query);

    if (result.length === 0) {
      throw new Error("Utilisateur non trouvé");
    }

    return result[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUtilisateur,
  insertUtilisateur,
  deleteUtilisateur,
  modificationUtilisateur,
  getUtilisateurById,
};
