const connection = require("../connexion.js");
const Categorie = require("../models/categorieModel.js");

async function getAllCategorie() {
  try {
    await connection.connectToDatabase();
    const query = "SELECT * FROM categorie";
    const results = await connection.executeQuery(query);

    const categorie = results.map(
      (result) => new Categorie(result.nom_categorie, result.type_categorie)
    );

    return categorie;
  } catch (error) {
    throw error;
  }
}

async function insertCategorie(nom_categorie, type_categorie) {
  try {
    await connection.connectToDatabase();

    const query = `
        INSERT INTO categorie (nom_categorie, type_categorie)
        VALUES ('${nom_categorie}', '${type_categorie}')
      `;

    const result = await connection.executeQuery(query);
    console.log(result);

    const newCategorietId = result.insertId;

    return newCategorietId;
  } catch (error) {
    throw error;
  }
}

async function getCategorieById(id) {
  try {
    await connection.connectToDatabase();
    const query = `SELECT * FROM categorie WHERE id_categorie = ${id}`;
    const result = await connection.executeQuery(query);

    if (result.length === 0) {
      throw new Error("Ingrédient non trouvé");
    }

    return result[0];
  } catch (error) {
    throw error;
  }
}

async function deleteCategorie(id) {
  try {
    await connection.connectToDatabase();
    const query = `DELETE FROM categorie WHERE id_categorie = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

async function modificationCategorie(
  id,
  nouveauxNomCategorie,
  nouveauxTypeCategorie
) {
  try {
    await connection.connectToDatabase();
    const query = `UPDATE categorie SET nom_categorie = '${nouveauxNomCategorie}', type_categorie = '${nouveauxTypeCategorie}' WHERE id_categorie = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCategorie,
  insertCategorie,
  getCategorieById,
  deleteCategorie,
  modificationCategorie,
};
