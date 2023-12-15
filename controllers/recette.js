// controllers/recette.js
const connection = require("../connexion.js");
const Recette = require("../models/recette.js");

async function getAllRecettes() {
  try {
    await connection.connectToDatabase();
    const query = "SELECT * FROM recette";
    const results = await connection.executeQuery(query);

    // Mapper les résultats pour créer des objets Recette
    const recettes = results.map(
      (result) =>
        new Recette(
          result.id_recette,
          result.nom,
          result.description,
          result.etapes,
          result.url_image,
          result.id
        )
    );

    return recettes;
  } catch (error) {
    throw error;
  }
}

// async function insertRecette(nom, description, etapes, url_image, id) {
//   try {
//     await connection.connectToDatabase();

//     const query = `
//     INSERT INTO recette (nom, description, etapes, url_image, id)
//     VALUES ('${nom}', '${description}', '${etapes}', '${url_image}', '${id}')
//   `;
//     const result = await connection.executeQuery(query);

//     const newRecetteId = result.insertId;

//     return newRecetteId;
//   } catch (error) {
//     throw error;
//   }
// }
async function insertRecette(nom, description, etapes, url_image, id) {
  try {
    await connection.connectToDatabase();

    const query = `
      INSERT INTO recette (nom, description, etapes, url_image, id)
      VALUES ('${nom}', '${description}', '${etapes}', '${url_image}', '${id}')
    `;

    const result = await connection.executeQuery(query);
    console.log(result);

    const newIngredientId = result.insertId;

    return newIngredientId;
  } catch (error) {
    throw error;
  }
}

async function getRecetteById(id) {
  try {
    await connection.connectToDatabase();
    const query = `SELECT * FROM recette WHERE id_recette = ${id}`;
    const result = await connection.executeQuery(query);

    if (result.length === 0) {
      throw new Error("Recette non trouvé");
    }

    return result[0];
  } catch (error) {
    throw error;
  }
}

async function getRecetteByNom(nom) {
  try {
    await connection.connectToDatabase();
    const query = `SELECT * FROM recette WHERE nom = ${nom}`;
    const result = await connection.executeQuery(query);

    if (result.length === 0) {
      throw new Error("Recette non trouvé");
    }

    return result[0];
  } catch (error) {
    throw error;
  }
}

async function deleteRecette(id) {
  try {
    await connection.connectToDatabase();
    const query = `DELETE FROM recette WHERE id_recette = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllRecettes,
  insertRecette,
  getRecetteById,
  getRecetteByNom,
  deleteRecette,
  // insertRecette,
};
