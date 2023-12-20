// routes/recetteRoutes.js
const recettesController = require("../controllers/recetteController");

function RecetteRoutes(app) {
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
      const addRecetteId = await recettesController.getRecetteById(
        newRecetteId
      );

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

  app.put("/modificationRecette/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nouveauxNom,
        nouveauxDescription,
        nouveauxEtapes,
        nouveauxUrlImage,
        nouveauxId,
      } = req.body;
      await recettesController.modificationRecette(
        id,
        nouveauxNom,
        nouveauxDescription,
        nouveauxEtapes,
        nouveauxUrlImage,
        nouveauxId
      );
      res.send("Prix de la recette mis à jour avec succès");
    } catch (error) {
      console.log("Recette a été modifié");
      res.status(500).send("Erreur lors de la modification de la recette");
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

  app.get("/getRecetteByNom/:nom_recette", async (req, res) => {
    try {
      const { nom_recette } = req.params;
      const recette = await recettesController.getRecetteByNom(nom_recette);

      console.log(nom_recette);
      if (!recette) {
        res.status(404).send("Recette non trouvée");
        return;
      }

      res.json(recette);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res
        .status(500)
        .send("Erreur lors de la récupération des données de la recette");
    }
  });
}

module.exports = {
  RecetteRoutes,
};

// // index.js
// const express = require("express");
// const bodyParser = require("body-parser");

// const recettesController = require("../controllers/recetteController");

// const app = express();

// // Utiliser body-parser comme middleware
// app.use(bodyParser.urlencoded({ extended: true })); // pour les requêtes avec Content-Type: application/x-www-form-urlencoded
// app.use(bodyParser.json());

// async function Recette() {
//   app.get("/listeRecette", async (req, res) => {
//     try {
//       const results = await recettesController.getAllRecettes();
//       res.json(results);
//     } catch (error) {
//       console.error("Erreur : " + error.stack);
//       res.status(500).send("Erreur lors de la récupération des données");
//     }
//   });
// }

// module.exports = {
//   Recette,
// };
