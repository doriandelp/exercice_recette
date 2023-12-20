-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 20 déc. 2023 à 11:23
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `recettes`
--

-- --------------------------------------------------------

--
-- Structure de la table `a`
--

DROP TABLE IF EXISTS `a`;
CREATE TABLE IF NOT EXISTS `a` (
  `id_recette` int NOT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id_recette`,`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `a`
--

INSERT INTO `a` (`id_recette`, `id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

DROP TABLE IF EXISTS `administrateur`;
CREATE TABLE IF NOT EXISTS `administrateur` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`id_admin`, `id_utilisateur`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `auteur_recette`
--

DROP TABLE IF EXISTS `auteur_recette`;
CREATE TABLE IF NOT EXISTS `auteur_recette` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auteur_recette`
--

INSERT INTO `auteur_recette` (`id`, `id_utilisateur`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
CREATE TABLE IF NOT EXISTS `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom_categorie` varchar(50) DEFAULT NULL,
  `type_categorie` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom_categorie`, `type_categorie`) VALUES
(1, 'Takoyaki', 'Tako'),
(5, 'Patate eee', 'patate farineuse'),
(3, 'Patate eee', 'patate farineuse'),
(6, 'Patate eee', 'patate farineuse'),
(7, 'Patate eee', 'patate farineuse');

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `id_commentaire` int NOT NULL AUTO_INCREMENT,
  `texte` text,
  `notation` int DEFAULT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  KEY `id_utilisateur` (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`id_commentaire`, `texte`, `notation`, `id_utilisateur`) VALUES
(1, 'Takoyaki', 0, 0),
(3, 'Takoyaki', 18, 1),
(6, 'Pain Melon', 20, 1),
(5, 'Pain Melon', 20, 1),
(7, 'Pain Melon', 20, 1),
(8, 'Pain Melon', 20, 1);

-- --------------------------------------------------------

--
-- Structure de la table `contient`
--

DROP TABLE IF EXISTS `contient`;
CREATE TABLE IF NOT EXISTS `contient` (
  `id_recette` int NOT NULL,
  `id_categorie` int NOT NULL,
  PRIMARY KEY (`id_recette`,`id_categorie`),
  KEY `id_categorie` (`id_categorie`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contient`
--

INSERT INTO `contient` (`id_recette`, `id_categorie`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `informations`
--

DROP TABLE IF EXISTS `informations`;
CREATE TABLE IF NOT EXISTS `informations` (
  `id_information` int NOT NULL AUTO_INCREMENT,
  `nom_information` varchar(50) DEFAULT NULL,
  `type_information` varchar(50) DEFAULT NULL,
  `autre_information` varchar(50) DEFAULT NULL,
  `id_recette` int NOT NULL,
  PRIMARY KEY (`id_information`),
  KEY `id_recette` (`id_recette`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `informations`
--

INSERT INTO `informations` (`id_information`, `nom_information`, `type_information`, `autre_information`, `id_recette`) VALUES
(1, 'Pain', '12', '21', 1),
(2, 'Pain Melon', '20', '20', 1);

-- --------------------------------------------------------

--
-- Structure de la table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) DEFAULT NULL,
  `prix_kilo` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `ingredients`
--

INSERT INTO `ingredients` (`id`, `nom`, `prix_kilo`) VALUES
(1, 'Farine', '2.50'),
(36, 'Takoyaki', '3.00'),
(3, 'undefined', '3.00'),
(5, 'undefined', '0.00'),
(6, 'undefined', '0.00'),
(7, 'undefined', '0.00'),
(8, 'undefined', '0.00'),
(9, 'undefined', '0.00'),
(10, 'undefined', '0.00'),
(11, 'undefined', '0.00'),
(12, 'undefined', '0.00'),
(13, 'undefined', '0.00'),
(14, 'undefined', '0.00'),
(15, 'undefined', '0.00'),
(16, 'undefined', '0.00'),
(17, 'undefined', '0.00'),
(18, 'undefined', '0.00'),
(19, 'undefined', '0.00'),
(23, 'jambon', '2.55'),
(24, 'jambon', '2.55'),
(25, 'undefined', '0.00'),
(26, 'undefined', '0.00'),
(27, 'undefined', '0.00'),
(28, 'undefined', '0.00'),
(29, 'undefined', '0.00'),
(30, 'pomme', '2.30'),
(31, 'Coquillette', '2.50'),
(32, 'Patate Nomo', '0.00'),
(33, 'Coquillette', '2.50'),
(34, 'Coquillette', '2.50'),
(35, 'Coquillette', '2.50'),
(37, 'Takoyaki', '3.00'),
(38, 'Takoyaki', '3.00'),
(39, 'undefined', '0.00');

-- --------------------------------------------------------

--
-- Structure de la table `possede`
--

DROP TABLE IF EXISTS `possede`;
CREATE TABLE IF NOT EXISTS `possede` (
  `id_recette` int NOT NULL,
  `id_commentaire` int NOT NULL,
  PRIMARY KEY (`id_recette`,`id_commentaire`),
  KEY `id_commentaire` (`id_commentaire`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `possede`
--

INSERT INTO `possede` (`id_recette`, `id_commentaire`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `recette`
--

DROP TABLE IF EXISTS `recette`;
CREATE TABLE IF NOT EXISTS `recette` (
  `id_recette` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `etapes` varchar(50) DEFAULT NULL,
  `url_image` varchar(256) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id_recette`),
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `recette`
--

INSERT INTO `recette` (`id_recette`, `nom`, `description`, `etapes`, `url_image`, `id`) VALUES
(1, 'Gâteau au chocolat', 'Recette de gâteau délicieux', 'Étapes détaillées', 'image.jpg', 1),
(20, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(3, 'PainMelon', 'undefined', 'undefined', 'undefined', 0),
(4, 'PainMelon', 'e', 'e', 'e', 2),
(5, 'undefined', 'undefined', 'undefined', 'undefined', 0),
(6, 'undefined', 'undefined', 'undefined', 'undefined', 0),
(7, 'undefined', 'undefined', 'undefined', 'undefined', 0),
(8, 'undefined', 'undefined', 'undefined', 'undefined', 0),
(9, 'undefined', 'undefined', 'undefined', 'undefined', 0),
(10, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(11, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(12, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(13, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(14, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(15, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(16, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(17, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(18, 'PainMelon', 'patate farineuse', 'etape 3', 'undefined', 3),
(19, 'pates', NULL, NULL, NULL, 0),
(21, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(22, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(23, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(24, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(25, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(26, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(27, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3),
(28, 'Patate eee', 'patate farineuse', 'etape 3', 'undefined', 3);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(250) DEFAULT NULL,
  `Prenom` varchar(250) DEFAULT NULL,
  `Adresse` varchar(250) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id_utilisateur`, `Nom`, `Prenom`, `Adresse`, `mot_de_passe`, `role`) VALUES
(1, 'Louise', 'De La Valliere', 'te', 'ezaatt', 'te'),
(3, 'Yeux de braise', 'Shana', 'url.com', 'eerer', NULL),
(4, 'Yeux de braise', 'Shana', 'url.com', 'eerer', 'undefined');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
