const ingredientsController = require("../controllers/ingredientsController");

function IngredientRoutes(app) {
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

  app.delete("/getIngredientById/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await ingredientsController.deleteIngredient(id);
      res.send("Ingrédient a été supprimé");
    } catch (error) {
      console.log("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la suppression de l ingredient");
    }
  });

  app.put("/getIngredientById/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nouveauxNom, nouveauxPrix } = req.body;
      await ingredientsController.modificationIngredient(
        id,
        nouveauxNom,
        nouveauxPrix
      );
      res.send("Prix de l ingredient mis à jour avec succès");
    } catch (error) {
      console.log("Ingedient a été modifié");
      res.status(500).send("Erreur lors de la modification de l ingredients");
    }
  });
}

module.exports = {
  IngredientRoutes,
};
