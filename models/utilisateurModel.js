// moduls/recette.js
class Utilisateur {
  constructor(MotDePasse, Prenom, Nom, Adresse, Role) {
    this.MotDePasse = MotDePasse;
    this.Prenom = Prenom;
    this.Nom = Nom;
    this.Adresse = Adresse;
    this.Role = Role;
  }
}

module.exports = Utilisateur;
