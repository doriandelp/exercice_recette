const connection = require("../connexion.js");
const Recette = require("../models/ingredientsModel.js");

async function getAllIngredient() {
  try {
    await connection.connectToDatabase();
    const query = "SELECT * FROM ingredients";
    const results = await connection.executeQuery(query);

    // Mapper les résultats pour créer des objets Recette
    const ingredients = results.map(
      (result) => new Recette(result.nom, result.prix_kilo)
    );

    return ingredients;
  } catch (error) {
    throw error;
  }
}

async function insertIngredient(nom, prix_kilo) {
  try {
    await connection.connectToDatabase();

    const query = `
      INSERT INTO ingredients (nom, prix_kilo)
      VALUES ('${nom}', '${prix_kilo}')
    `;

    const result = await connection.executeQuery(query);
    console.log(result);

    const newIngredientId = result.insertId;

    return newIngredientId;
  } catch (error) {
    throw error;
  }
}

async function getIngredientById(id) {
  try {
    await connection.connectToDatabase();
    const query = `SELECT * FROM ingredients WHERE id = ${id}`;
    const result = await connection.executeQuery(query);

    if (result.length === 0) {
      throw new Error("Ingrédient non trouvé");
    }

    return result[0];
  } catch (error) {
    throw error;
  }
}

async function deleteIngredient(id) {
  try {
    await connection.connectToDatabase();
    const query = `DELETE FROM ingredients WHERE id = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

async function modificationIngredient(id, nouveauxNom, nouveauxPrix) {
  try {
    await connection.connectToDatabase();
    const query = `UPDATE ingredients SET prix_kilo = ${nouveauxPrix}, nom = '${nouveauxNom}' WHERE id = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllIngredient,
  insertIngredient,
  getIngredientById,
  deleteIngredient,
  modificationIngredient,
};

// Dans controllers/ingredients.js
