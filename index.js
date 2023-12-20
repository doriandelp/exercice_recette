// index.js
const express = require("express");
const bodyParser = require("body-parser");

const { RecetteRoutes } = require("./root/recetteRoot");
const { IngredientRoutes } = require("./root/ingredientRoot");
const { CommentaireRoutes } = require("./root/commentaireRoot");
const { CategorieRoutes } = require("./root/categorieRoot");
const { UtilisateurRoutes } = require("./root/utilisateurRoot");
const { InformationRoutes } = require("./root/informationRoot");

const app = express();

// Utiliser body-parser comme middleware
app.use(bodyParser.urlencoded({ extended: true })); // pour les requêtes avec Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.json());

RecetteRoutes(app);
IngredientRoutes(app);
CommentaireRoutes(app);
CategorieRoutes(app);
InformationRoutes(app);
UtilisateurRoutes(app);

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
