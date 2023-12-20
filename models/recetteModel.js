// moduls/recette.js
class Recette {
  constructor(nom, description, etapes, url_image, id) {
    this.nom = nom;
    this.description = description;
    this.etapes = etapes;
    this.url_image = url_image;
    this.id = id;
  }
}

module.exports = Recette;
