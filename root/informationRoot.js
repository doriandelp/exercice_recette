const informationController = require("../controllers/informationController");

function InformationRoutes(app) {
  app.get("/listeInformation", async (req, res) => {
    try {
      const results = await informationController.getAllInformation();
      res.json(results);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la récupération des données");
    }
  });

  app.post("/ajouterInformation", async (req, res) => {
    try {
      const {
        nom_information,
        type_information,
        autre_information,
        id_recette,
      } = req.body;

      console.log(req.body);
      const newInformationId = await informationController.insertInformation(
        nom_information,
        type_information,
        autre_information,
        id_recette
      );

      // Récupérer les données de l'ingrédient ajouté
      const addInformationId = await informationController.getInformationById(
        newInformationId
      );

      res.json({ addInformationId });
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de l'insertion de la commentaire");
    }
  });

  app.get("/getInformationById/:id_information", async (req, res) => {
    try {
      const { id_information } = req.params;
      const information = await informationController.getInformationById(
        id_information
      );
      res.json(information);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res
        .status(500)
        .send("Erreur lors de la récupération des données de commentaire");
    }
  });

  app.delete("/supprimerInformation/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await informationController.deleteInformation(id);
      res.send("Information a été supprimé");
    } catch (error) {
      console.log("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la suppression de l information");
    }
  });

  app.put("/modificationInformation/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nouveauxNomInformation,
        nouveauxTypeInformation,
        nouveauxAutreInformation,
        nouveauxIdRecette,
      } = req.body;

      console.log("Nouveaux Nom Information:", nouveauxNomInformation);
      console.log("Nouvelle Type Information:", nouveauxTypeInformation);
      console.log("Nouvel Autre Information:", nouveauxAutreInformation);
      console.log("Nouvel ID Recette:", nouveauxIdRecette);

      await informationController.modificationInformation(
        id,
        nouveauxNomInformation,
        nouveauxTypeInformation,
        nouveauxAutreInformation,
        nouveauxIdRecette
      );

      res.send("La mis à jour avec succès");
    } catch (error) {
      console.log("Information a été modifié");
      res.status(500).send("Erreur lors de l information");
    }
  });
}

module.exports = {
  InformationRoutes,
};
