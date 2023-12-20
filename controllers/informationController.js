const connection = require("../connexion.js");
const Information = require("../models/informationModel.js");

async function getAllInformation() {
  try {
    await connection.connectToDatabase();
    const query = "SELECT * FROM informations";
    const results = await connection.executeQuery(query);

    const information = results.map(
      (result) =>
        new Information(
          result.nom_information,
          result.type_information,
          result.autre_information,
          result.id_recette
        )
    );

    return information;
  } catch (error) {
    throw error;
  }
}

async function insertInformation(
  nom_information,
  type_information,
  autre_information,
  id_recette
) {
  try {
    await connection.connectToDatabase();

    const query = `
        INSERT INTO informations ( 
            nom_information,
            type_information,
            autre_information,
            id_recette
            )
        VALUES ('${nom_information}', '${type_information}', '${autre_information}', '${id_recette}')
      `;

    const result = await connection.executeQuery(query);
    console.log(result);

    const newInformationId = result.insertId;

    return newInformationId;
  } catch (error) {
    throw error;
  }
}

async function getInformationById(id) {
  try {
    await connection.connectToDatabase();
    const query = `SELECT * FROM informations WHERE id_information = ${id}`;
    const result = await connection.executeQuery(query);

    if (result.length === 0) {
      throw new Error("Information non trouvé");
    }

    return result[0];
  } catch (error) {
    throw error;
  }
}

async function deleteInformation(id) {
  try {
    await connection.connectToDatabase();
    const query = `DELETE FROM informations WHERE id_information = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

async function modificationInformation(
  id,
  nouveauxNomInformation,
  nouveauxTypeInformation,
  nouveauxAutreInformation,
  nouveauxIdRecette
) {
  try {
    await connection.connectToDatabase();
    const query = `UPDATE informations SET nom_information = '${nouveauxNomInformation}', type_information = '${nouveauxTypeInformation}', autre_information = '${nouveauxAutreInformation}', id_recette = '${nouveauxIdRecette}' WHERE id_information = ${id}`;
    await connection.executeQuery(query);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllInformation,
  insertInformation,
  getInformationById,
  deleteInformation,
  modificationInformation,
};
