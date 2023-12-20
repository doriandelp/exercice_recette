const utilisateurController = require("../controllers/utilisateurController");

function UtilisateurRoutes(app) {
  app.get("/listeUtilisateur", async (req, res) => {
    try {
      const results = await utilisateurController.getAllUtilisateur();
      res.json(results);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la récupération des données");
    }
  });

  app.post("/ajouterUtilisateur", async (req, res) => {
    try {
      const { MotDePasse, Prenom, Nom, Adresse, role } = req.body;

      console.log(req.body);
      const newUtilisateurId = await utilisateurController.insertUtilisateur(
        MotDePasse,
        Prenom,
        Nom,
        Adresse,
        role
      );

      // Récupérer les données de l'ingrédient ajouté
      const addUtilisateurId = await utilisateurController.getUtilisateurById(
        newUtilisateurId
      );

      res.json({ addUtilisateurId });
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de l'insertion de la recette");
    }
  });

  app.delete("/supprimerUtilisateur/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await utilisateurController.deleteUtilisateur(id);
      res.send("Utilisateur a été supprimé");
    } catch (error) {
      console.log("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la suppression de l utilisateur");
    }
  });

  app.put("/modificationUtilisateur/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nouveauxMotDePasse,
        nouveauxPrenom,
        nouveauxNom,
        nouveauxAdresse,
        nouveauxRole,
      } = req.body;
      await utilisateurController.modificationUtilisateur(
        id,
        nouveauxMotDePasse,
        nouveauxPrenom,
        nouveauxNom,
        nouveauxAdresse,
        nouveauxRole
      );
      res.send("Utilisateur mis à jour avec succès");
    } catch (error) {
      console.log("Utilisateur a été modifié");
      res.status(500).send("Erreur lors de la modification de l utilisateur");
    }
  });

  app.get("/getUtilisateurById/:id_utilisateur", async (req, res) => {
    try {
      const { id_utilisateur } = req.params;
      const utilisateur = await utilisateurController.getUtilisateurById(
        id_utilisateur
      );
      res.json(utilisateur);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res
        .status(500)
        .send("Erreur lors de la récupération des données de l utilisateur");
    }
  });
}

module.exports = {
  UtilisateurRoutes,
};
