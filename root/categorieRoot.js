const categorieController = require("../controllers/categorieController");

function CategorieRoutes(app) {
  app.get("/listeCategorie", async (req, res) => {
    try {
      const results = await categorieController.getAllCategorie();
      res.json(results);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la récupération des données");
    }
  });

  app.post("/ajouterCategorie", async (req, res) => {
    try {
      const { nom_categorie, type_categorie } = req.body;

      console.log(req.body);
      const newCategorieId = await categorieController.insertCategorie(
        nom_categorie,
        type_categorie
      );

      // Récupérer les données de l'ingrédient ajouté
      const addCategorieId = await categorieController.getCategorieById(
        newCategorieId
      );

      res.json({ addCategorieId });
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de l'insertion de la categorie");
    }
  });

  app.get("/getCategorieById/:id_categorie", async (req, res) => {
    try {
      const { id_categorie } = req.params;
      const categorie = await categorieController.getCategorieById(
        id_categorie
      );
      res.json(categorie);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res
        .status(500)
        .send("Erreur lors de la récupération des données de la recette");
    }
  });

  app.delete("/supprimerCategorie/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await categorieController.deleteCategorie(id);
      res.send("Categorie a été supprimé");
    } catch (error) {
      console.log("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la suppression de categorie");
    }
  });

  app.put("/modificationCategorie/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nouveauxNomCategorie, nouveauxTypeCategorie } = req.body;

      console.log("Nouveaux catégorie:", nouveauxNomCategorie);
      console.log("Nouvelle type categorie:", nouveauxTypeCategorie);

      await categorieController.modificationCategorie(
        id,
        nouveauxNomCategorie,
        nouveauxTypeCategorie
      );

      res.send("La mis à jour avec succès");
    } catch (error) {
      console.log("Catégorie a été modifié");
      res.status(500).send("Erreur lors de la categorie");
    }
  });
}

module.exports = {
  CategorieRoutes,
};
