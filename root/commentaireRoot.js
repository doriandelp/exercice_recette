const commentaireController = require("../controllers/commentaireController");

function CommentaireRoutes(app) {
  app.get("/listeCommentaire", async (req, res) => {
    try {
      const results = await commentaireController.getAllCommentaire();
      res.json(results);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la récupération des données");
    }
  });

  app.post("/ajouterCommentaire", async (req, res) => {
    try {
      const { texte, notation, id_utilisateur } = req.body;

      console.log(req.body);
      const newCommentaireId = await commentaireController.insertCommentaire(
        texte,
        notation,
        id_utilisateur
      );

      // Récupérer les données de l'ingrédient ajouté
      const addCommentaireId = await commentaireController.getCommentaireById(
        newCommentaireId
      );

      res.json({ addCommentaireId });
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de l'insertion de la commentaire");
    }
  });

  app.get("/getCommentaireById/:id_commentaire", async (req, res) => {
    try {
      const { id_commentaire } = req.params;
      const commentaire = await commentaireController.getCommentaireById(
        id_commentaire
      );
      res.json(commentaire);
    } catch (error) {
      console.error("Erreur : " + error.stack);
      res
        .status(500)
        .send("Erreur lors de la récupération des données de commentaire");
    }
  });

  app.delete("/supprimerCommentaire/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await commentaireController.deleteCommentaire(id);
      res.send("Commentaire a été supprimé");
    } catch (error) {
      console.log("Erreur : " + error.stack);
      res.status(500).send("Erreur lors de la suppression du commentaire");
    }
  });

  app.put("/modificationCommentaire/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nouveauxTexte, nouveauxNotation, nouveauxIdUtilisateur } =
        req.body;

      console.log("Nouveaux Texte:", nouveauxTexte);
      console.log("Nouvelle Notation:", nouveauxNotation);
      console.log("Nouvel ID Utilisateur:", nouveauxIdUtilisateur);

      await commentaireController.modificationCommentaire(
        id,
        nouveauxTexte,
        nouveauxNotation,
        nouveauxIdUtilisateur
      );

      res.send("La mis à jour avec succès");
    } catch (error) {
      console.log("Commentaire a été modifié");
      res.status(500).send("Erreur lors du commentaire");
    }
  });
}

module.exports = {
  CommentaireRoutes,
};
