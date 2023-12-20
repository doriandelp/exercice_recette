const connection = require("../connexion.js");
const Commentaire = require("../models/commentaireModel.js");

async function getAllCommentaire() {
  try {
    await connection.connectToDatabase();
    const query = "SELECT * FROM commentaire";
    const results = await connection.executeQuery(query);

    const commentaire = results.map(
      (result) =>
        new Commentaire(result.texte, result.notation, result.id_utilisateur)
    );

    return commentaire;
  } catch (error) {
    throw error;
  }
}

async function insertCommentaire(texte, notation, id_utilisateur) {
  try {
    await connection.connectToDatabase();

    const query = `
        INSERT INTO commentaire (texte, notation, id_utilisateur)
        VALUES ('${texte}', '${notation}', '${id_utilisateur}')
      `;

    const result = await connection.executeQuery(query);
    console.log(result);

    const newCommentaireId = result.insertId;

    return newCommentaireId;
  } catch (error) {
    throw error;
  }
}

async function getCommentaireById(id) {
  try {
    await connection.connectToDatabase();
    const query = `SELECT * FROM commentaire WHERE id_commentaire = ${id}`;
    const result = await connection.executeQuery(query);

    if (result.length === 0) {
      throw new Error("Commentaire non trouvé");
    }

    return result[0];
  } catch (error) {
    throw error;
  }
}

async function deleteCommentaire(id) {
  try {
    await connection.connectToDatabase();
    const query = `DELETE FROM commentaire WHERE id_commentaire = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

async function modificationCommentaire(
  id,
  nouveauxTexte,
  nouveauxNotation,
  nouveauIdUtilisateur
) {
  try {
    await connection.connectToDatabase();
    const query = `UPDATE commentaire SET texte = '${nouveauxTexte}', notation = '${nouveauxNotation}', id_utilisateur = '${nouveauIdUtilisateur}' WHERE id_commentaire = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCommentaire,
  insertCommentaire,
  getCommentaireById,
  deleteCommentaire,
  modificationCommentaire,
};
