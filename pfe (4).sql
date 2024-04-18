-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 18 avr. 2024 à 14:03
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfe`
--

-- --------------------------------------------------------

--
-- Structure de la table `agent`
--

CREATE TABLE `agent` (
  `IdA` int(11) NOT NULL,
  `Division` varchar(255) DEFAULT NULL,
  `Direction` varchar(255) DEFAULT NULL,
  `Unite` varchar(255) DEFAULT NULL,
  `Service` varchar(255) DEFAULT NULL,
  `Atelier` varchar(255) DEFAULT NULL,
  `Nom` varchar(255) DEFAULT NULL,
  `Prenom` varchar(255) DEFAULT NULL,
  `DateN` date DEFAULT NULL,
  `LieuN` varchar(255) DEFAULT NULL,
  `Sex` varchar(255) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `SitutionFamille` varchar(255) DEFAULT NULL,
  `Adreese` varchar(255) DEFAULT NULL,
  `GroupeSanguim` varchar(255) DEFAULT NULL,
  `Allergie` varchar(255) DEFAULT NULL,
  `Nss` varchar(255) DEFAULT NULL,
  `Scolaire` varchar(255) DEFAULT NULL,
  `Professionnelle` varchar(255) DEFAULT NULL,
  `Qprofessionnelle` varchar(255) DEFAULT NULL,
  `ActiProAntet` varchar(255) DEFAULT NULL,
  `ServiceNational` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `agent`
--

INSERT INTO `agent` (`IdA`, `Division`, `Direction`, `Unite`, `Service`, `Atelier`, `Nom`, `Prenom`, `DateN`, `LieuN`, `Sex`, `Email`, `SitutionFamille`, `Adreese`, `GroupeSanguim`, `Allergie`, `Nss`, `Scolaire`, `Professionnelle`, `Qprofessionnelle`, `ActiProAntet`, `ServiceNational`) VALUES
(4, 'Nouvelle division', 'Nouvelle direction', 'Nouvelle unité', 'Nouveau service', 'Nouvel atelier', 'Nouveau nom', 'Nouveau prénom', '1990-01-01', 'Nouveau lieu de naissance', 'M', '', 'Célibataire', 'Nouvelle adresse', 'A+', 'Aucune allergie', '123456789', 'Nouveau cursus scolaire', 'Nouveau parcours professionnel', 'Qualification professionnelle', 'Activités professionnelles antérieures', 'Service national'),
(7, 'Nouvelle division', 'Nouvelle direction', 'Nouvelle unité', 'Nouveau service', 'Nouvel atelier', 'Nouveau nom', 'Nouveau prénom', '1990-01-01', 'Nouveau lieu de naissance', 'M', '', 'Célibataire', 'Nouvelle adresse', 'A+', 'Aucune allergie', '123456789', 'Nouveau cursus scolaire', 'Nouveau parcours professionnel', 'Qualification professionnelle', 'Activités professionnelles antérieures', 'Service national'),
(8, 'Nouvelle division', 'Nouvelle direction', 'Nouvelle unité', 'Nouveau service', 'Nouvel atelier', 'Nouveau nom', 'Nouveau prénom', '1990-01-01', 'Nouveau lieu de naissance', 'M', 'deboubmerzak@gmail.com', 'Célibataire', 'Nouvelle adresse', 'A+', 'Aucune allergie', '123456789', 'Nouveau cursus scolaire', 'Nouveau parcours professionnel', 'Qualification professionnelle', 'Activités professionnelles antérieures', 'Service national'),
(9, 'Division Example', 'Direction Example', 'Unite Example', 'Service Example', 'Atelier Example', 'Nom Example', 'Prenom Example', '1990-01-01', 'LieuN Example', 'Sex Example', 'deboubmerzak@gmail.com', 'SitutionFamille Example', 'Adreese Example', 'GroupeSanguim Example', 'Allergie Example', 'Nss Example', 'Scolaire Example', 'Professionnelle Example', 'Qprofessionnelle Example', 'ActiProAntet Example', 'ServiceNational Example');

-- --------------------------------------------------------

--
-- Structure de la table `postes`
--

CREATE TABLE `postes` (
  `IdP` int(11) NOT NULL,
  `Poste` varchar(255) DEFAULT NULL,
  `DateD` date DEFAULT NULL,
  `DateF` date DEFAULT NULL,
  `RisqueProfess` varchar(255) DEFAULT NULL,
  `Motifs` varchar(255) DEFAULT NULL,
  `IdA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `postes`
--

INSERT INTO `postes` (`IdP`, `Poste`, `DateD`, `DateF`, `RisqueProfess`, `Motifs`, `IdA`) VALUES
(3, 'Poste1 Example', '2023-01-01', '2023-12-31', 'RisqueProfess1 Example', NULL, 7),
(4, 'Poste1 Example', '2023-01-01', '2023-12-31', 'RisqueProfess1 Example', NULL, 8),
(5, 'Poste2 Example', '2023-01-01', '2023-12-31', 'RisqueProfess1 Example', NULL, 8),
(6, 'Nouveau poste', '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', NULL),
(8, 'Nouveau poste', '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 7),
(9, 'Poste1 Example', '2023-01-01', '2023-12-31', 'RisqueProfess1 Example', NULL, 9),
(10, 'Nouveau poste', '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8),
(11, NULL, '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8),
(12, NULL, '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8),
(13, NULL, '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8);

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `IdE` int(11) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Poste` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`IdE`, `mail`, `Password`, `Poste`) VALUES
(66, '', '99', 'midcien');

-- --------------------------------------------------------

--
-- Structure de la table `rdv`
--

CREATE TABLE `rdv` (
  `IdR` int(11) NOT NULL,
  `IdA` int(11) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Heure` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rdv`
--

INSERT INTO `rdv` (`IdR`, `IdA`, `Type`, `Date`, `Heure`) VALUES
(4, 9, '2', '2024-04-01', '16:00:00'),
(5, 9, '1', '2024-04-01', '16:00:00'),
(6, 9, '1', '2024-04-01', '16:00:00'),
(7, 9, '1', '2024-04-01', '16:00:00'),
(8, 9, '1', '2024-04-01', '16:00:00'),
(9, 9, '1', '2024-04-02', '16:00:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`IdA`);

--
-- Index pour la table `postes`
--
ALTER TABLE `postes`
  ADD PRIMARY KEY (`IdP`),
  ADD KEY `IdA` (`IdA`);

--
-- Index pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD PRIMARY KEY (`IdR`),
  ADD KEY `IdA` (`IdA`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agent`
--
ALTER TABLE `agent`
  MODIFY `IdA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `IdP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `rdv`
--
ALTER TABLE `rdv`
  MODIFY `IdR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `postes`
--
ALTER TABLE `postes`
  ADD CONSTRAINT `postes_ibfk_1` FOREIGN KEY (`IdA`) REFERENCES `agent` (`IdA`);

--
-- Contraintes pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD CONSTRAINT `rdv_ibfk_1` FOREIGN KEY (`IdA`) REFERENCES `agent` (`IdA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
