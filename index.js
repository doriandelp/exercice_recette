// index.js
const express = require("express");
const bodyParser = require("body-parser");

const recettesController = require("./controllers/recette");
const utilisateurController = require("./controllers/utilisateur");
const ingredientsController = require("./controllers/ingredients");

const app = express();

// Utiliser body-parser comme middleware
app.use(bodyParser.urlencoded({ extended: true })); // pour les requêtes avec Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.json());

app.get("/menu/recette", (req, res) => {
  res.end("rrr");
});

app.get("/listeRecette", async (req, res) => {
  try {
    const results = await recettesController.getAllRecettes();
    res.json(results);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

app.post("/ajouterRecette", async (req, res) => {
  try {
    const { nom, description, etapes, url_image, id } = req.body;

    console.log(req.body);
    const newRecetteId = await recettesController.insertRecette(
      nom,
      description,
      etapes,
      url_image,
      id
    );

    // Récupérer les données de l'ingrédient ajouté
    const addRecetteId = await recettesController.getRecetteById(newRecetteId);

    res.json({ addRecetteId });
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de l'insertion de la recette");
  }
});

app.delete("/supprimerRecette/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await recettesController.deleteRecette(id);
    res.send("Recette a été supprimé");
  } catch (error) {
    console.log("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la suppression de la recette");
  }
});

app.get("/getRecetteById/:id_recette", async (req, res) => {
  try {
    const { id_recette } = req.params;
    const recette = await recettesController.getRecetteById(id_recette);
    res.json(recette);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de la recette");
  }
});

app.get("/getRecetteByNom/:nom", async (req, res) => {
  try {
    const { nom } = req.params;
    const recette = await recettesController.getRecetteByNom(nom); // Utiliser getRecetteByNom au lieu de getRecetteById
    res.json(recette);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de la recette");
  }
});

app.get("/listeUtilisateur", async (req, res) => {
  try {
    const results = await utilisateurController.getAllUtilisateur();
    res.json(results);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

app.get("/listeIngredient", async (req, res) => {
  try {
    const results = await ingredientsController.getAllIngredient();
    res.json(results);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la récupération des données");
  }
});

app.post("/ajouterIngredient", async (req, res) => {
  try {
    const { nom, prix_kilo } = req.body;

    console.log(req.body);
    const newIngredientId = await ingredientsController.insertIngredient(
      nom,
      prix_kilo
    );

    // Récupérer les données de l'ingrédient ajouté
    const addIngredientId = await ingredientsController.getIngredientById(
      newIngredientId
    );

    res.json({ addIngredientId });
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de l'insertion de la recette");
  }
});

app.get("/getIngredientById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await ingredientsController.getIngredientById(id);
    res.json(ingredient);
  } catch (error) {
    console.error("Erreur : " + error.stack);
    res
      .status(500)
      .send("Erreur lors de la récupération des données de l'ingrédient");
  }
});

app.delete("/supprimerIngredient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ingredientsController.deleteIngredient(id);
    res.send("Ingrédient a été supprimé");
  } catch (error) {
    console.log("Erreur : " + error.stack);
    res.status(500).send("Erreur lors de la suppression de l ingredient");
  }
});

app.put("/modificationIngredient/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nouveauxPrix } = req.body;
    await ingredientsController.modificationIngredient(id, nouveauxPrix);
    res.send("Prix de l ingredient mis à jour avec succès");
  } catch (error) {
    console.log("Ingedient a été modifié");
    res.status(500).send("Erreur lors de la modification de l ingredients");
  }
});

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
