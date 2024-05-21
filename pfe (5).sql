-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 21 mai 2024 à 18:30
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
(7, 'Informatique', 'Développement', 'Web', 'Backend', 'API', 'Dupont', 'Jean', '1990-01-01', 'Paris', 'M', 'jean.dupont@example.com', 'Célibataire', '123 rue de Paris', 'A+', 'Aucune', '1234567890123', 'Bac+5', 'Développeur senior', '10 ans d\'expérience', 'Actif', 'Effectué'),
(8, 'Nouvelle division', 'Nouvelle direction', 'Nouvelle unité', 'Nouveau service', 'Nouvel atelier', 'Nouveau nom', 'Nouveau prénom', '1990-01-01', 'Nouveau lieu de naissance', 'M', 'deboubmerzak@gmail.com', 'Célibataire', 'Nouvelle adresse', 'A+', 'Aucune allergie', '123456789', 'Nouveau cursus scolaire', 'Nouveau parcours professionnel', 'Qualification professionnelle', 'Activités professionnelles antérieures', 'Service national'),
(11, NULL, NULL, NULL, NULL, NULL, 'Nouveau nom', 'Nouveau prénom', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, NULL, NULL, NULL, NULL, 'Nouveau nom', 'Nouveau prénom', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, NULL, NULL, NULL, NULL, 'Nouveau nom', 'Nouveau prénom', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 'Informatique', 'Développement', 'Web', 'Backend', 'API', 'Dupont', 'Jean', '1990-01-01', 'Paris', 'M', 'jean.dupont@example.com', 'Célibataire', '123 rue de Paris', 'A+', 'Aucune', '1234567890123', 'Bac+5', 'Développeur senior', '10 ans d\'expérience', 'Actif', 'Effectué'),
(20, 'Informatique', 'Développement', 'Web', 'Backend', 'API', 'Dupont', 'Jean', '1990-01-01', 'Paris', 'M', 'jean.dupont@example.com', 'Célibataire', '123 rue de Paris', 'A+', 'Aucune', '1234567890123', 'Bac+5', 'Développeur senior', '10 ans d\'expérience', 'Actif', 'Effectué');

-- --------------------------------------------------------

--
-- Structure de la table `cadiovasculaire`
--

CREATE TABLE `cadiovasculaire` (
  `IdS` int(20) NOT NULL,
  `Palpitations` varchar(20) NOT NULL,
  `Oedemes` varchar(20) NOT NULL,
  `DoulureMarche` varchar(20) NOT NULL,
  `DoulureThoraciques` varchar(20) NOT NULL,
  `Deffort` varchar(20) NOT NULL,
  `Parmanente` varchar(20) NOT NULL,
  `Autre` varchar(20) NOT NULL,
  `Pouls` varchar(20) NOT NULL,
  `Ta` varchar(20) NOT NULL,
  `Varices` varchar(20) NOT NULL,
  `Cyanose` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cadiovasculaire`
--

INSERT INTO `cadiovasculaire` (`IdS`, `Palpitations`, `Oedemes`, `DoulureMarche`, `DoulureThoraciques`, `Deffort`, `Parmanente`, `Autre`, `Pouls`, `Ta`, `Varices`, `Cyanose`, `IdV`) VALUES
(2, 'Oui', 'Non', 'Parfois', 'Non', 'Non', 'Oui', 'Rien', 'Normal', '120/80', 'Non', 'Non', 2),
(3, '', 'Non', 'Parfois', 'Non', 'Non', 'Oui', 'Rien', 'Normal', '120/80', 'Non', 'Non', 2),
(4, '', 'Non', 'Parfois', 'Non', 'Non', 'Oui', 'Rien', 'Normal', '120/80', 'Non', 'Non', 2);

-- --------------------------------------------------------

--
-- Structure de la table `certificatat`
--

CREATE TABLE `certificatat` (
  `IdC` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `NomM` varchar(30) DEFAULT NULL,
  `Nom` varchar(15) DEFAULT NULL,
  `Prenom` varchar(15) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `ArretTravail` int(11) DEFAULT NULL,
  `DateR` date DEFAULT NULL,
  `PrArret` int(11) DEFAULT NULL,
  `DatePA` date DEFAULT NULL,
  `DatePR` date DEFAULT NULL,
  `IdA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `certificatat`
--

INSERT INTO `certificatat` (`IdC`, `Date`, `NomM`, `Nom`, `Prenom`, `age`, `ArretTravail`, `DateR`, `PrArret`, `DatePA`, `DatePR`, `IdA`) VALUES
(2, '2023-05-20', 'Docteur Smith', 'Doe', 'John', 30, 0, '2023-05-25', 0, '2023-05-21', '2023-05-22', 4);

-- --------------------------------------------------------

--
-- Structure de la table `certificatbs`
--

CREATE TABLE `certificatbs` (
  `IdC` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `NomM` varchar(30) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `IdA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `certificatm`
--

CREATE TABLE `certificatm` (
  `IdC` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `NomM` varchar(30) DEFAULT NULL,
  `Nom` varchar(15) DEFAULT NULL,
  `Prenom` varchar(15) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `Necessite` varchar(15) DEFAULT NULL,
  `IdA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `certificatma`
--

CREATE TABLE `certificatma` (
  `IdC` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Nom` varchar(15) DEFAULT NULL,
  `Prenom` varchar(15) DEFAULT NULL,
  `DateN` date DEFAULT NULL,
  `Unite` varchar(50) DEFAULT NULL,
  `Poste` varchar(50) DEFAULT NULL,
  `ModdeT` varchar(20) DEFAULT NULL,
  `Juge` varchar(250) DEFAULT NULL,
  `Observation` varchar(250) DEFAULT NULL,
  `IdA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `digestif`
--

CREATE TABLE `digestif` (
  `IdS` int(20) NOT NULL,
  `Appetit` varchar(20) NOT NULL,
  `Transit` varchar(20) NOT NULL,
  `selles` varchar(20) NOT NULL,
  `Alcool` varchar(20) NOT NULL,
  `Irritants` varchar(20) NOT NULL,
  `Pyrosis` varchar(20) NOT NULL,
  `Vomissements` varchar(20) NOT NULL,
  `Rectorragies` varchar(20) NOT NULL,
  `DouleursAbdominales` varchar(20) NOT NULL,
  `Autre` varchar(20) NOT NULL,
  `Denture` varchar(20) NOT NULL,
  `Hernie` varchar(20) NOT NULL,
  `Foie` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `digestif`
--

INSERT INTO `digestif` (`IdS`, `Appetit`, `Transit`, `selles`, `Alcool`, `Irritants`, `Pyrosis`, `Vomissements`, `Rectorragies`, `DouleursAbdominales`, `Autre`, `Denture`, `Hernie`, `Foie`, `IdV`) VALUES
(1, 'Bon', 'Normal', 'Normales', 'Non', 'Non', 'Non', 'Non', 'Non', 'Parfois', 'Rien', 'Bonne', 'Non', 'Normal', 2),
(2, 'Bon', 'Normal', 'Normales', 'Non', 'Non', 'Non', 'Non', 'Non', 'Parfois', 'Rien', 'Bonne', 'Non', 'Normal', 2);

-- --------------------------------------------------------

--
-- Structure de la table `endocrino`
--

CREATE TABLE `endocrino` (
  `IdS` int(20) NOT NULL,
  `ObesiteFamiliale` varchar(20) NOT NULL,
  `MaigreurFamiliale` varchar(20) NOT NULL,
  `Thyroide` varchar(100) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `endocrino`
--

INSERT INTO `endocrino` (`IdS`, `ObesiteFamiliale`, `MaigreurFamiliale`, `Thyroide`, `IdV`) VALUES
(2, 'Oui', 'Non', 'Normale', 2);

-- --------------------------------------------------------

--
-- Structure de la table `exemenscomplementaires`
--

CREATE TABLE `exemenscomplementaires` (
  `IdM` int(20) NOT NULL,
  `Radiologiques` varchar(20) NOT NULL,
  `RRadiologiques` varchar(60) NOT NULL,
  `Biologiques` varchar(20) NOT NULL,
  `RBiologiques` varchar(60) NOT NULL,
  `Toxicologiques` varchar(20) NOT NULL,
  `RToxicologiques` varchar(60) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `explorationsfonctionnelles`
--

CREATE TABLE `explorationsfonctionnelles` (
  `IdS` int(20) NOT NULL,
  `FonctionRespiratoire` varchar(20) NOT NULL,
  `FonctionCirculatoire` varchar(20) NOT NULL,
  `FonctionMotrice` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `genitourinaire`
--

CREATE TABLE `genitourinaire` (
  `IdS` int(20) NOT NULL,
  `MictionsNoctumes` varchar(20) NOT NULL,
  `Pallakiurie` varchar(20) NOT NULL,
  `Hematurie` varchar(20) NOT NULL,
  `Dysurie` varchar(20) NOT NULL,
  `BruluresMictionnelles` varchar(20) NOT NULL,
  `ColiquesNephretiques` varchar(20) NOT NULL,
  `Pertes` varchar(20) NOT NULL,
  `Menstruations` varchar(20) NOT NULL,
  `Autre` varchar(20) NOT NULL,
  `Bourses` varchar(50) NOT NULL,
  `Seins` varchar(50) NOT NULL,
  `Tr` varchar(50) NOT NULL,
  `Tv` varchar(50) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hematogg`
--

CREATE TABLE `hematogg` (
  `IdS` int(20) NOT NULL,
  `Ecchymoses` varchar(20) NOT NULL,
  `TendancesHemorragies` varchar(20) NOT NULL,
  `Rate` varchar(20) NOT NULL,
  `Petechies` varchar(20) NOT NULL,
  `Purupura` varchar(11) NOT NULL,
  `Carvicaux` varchar(20) NOT NULL,
  `SusClaviculaires` varchar(20) NOT NULL,
  `Axillarires` varchar(20) NOT NULL,
  `Inguinaux` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `locomoteur`
--

CREATE TABLE `locomoteur` (
  `IdS` int(20) NOT NULL,
  `Musculaires` varchar(20) NOT NULL,
  `Articulaires` varchar(20) NOT NULL,
  `Vertebrales` varchar(20) NOT NULL,
  `Nevralgiques` varchar(20) NOT NULL,
  `GeneMouvements` varchar(20) NOT NULL,
  `Fatigabilite` varchar(20) NOT NULL,
  `Autre` varchar(20) NOT NULL,
  `Exemen` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `neuropsychisme`
--

CREATE TABLE `neuropsychisme` (
  `IdS` int(20) NOT NULL,
  `Sommeil` varchar(20) NOT NULL,
  `Cephatees` varchar(20) NOT NULL,
  `Vertige` varchar(20) NOT NULL,
  `PeurVide` varchar(20) NOT NULL,
  `PerteConaissance` varchar(20) NOT NULL,
  `Paresies` varchar(20) NOT NULL,
  `Paresthesies` varchar(20) NOT NULL,
  `Autre` varchar(20) NOT NULL,
  `Tremblement` varchar(20) NOT NULL,
  `Remberg` varchar(50) NOT NULL,
  `Coordination` varchar(20) NOT NULL,
  `Sensibilite` varchar(20) NOT NULL,
  `Motricite` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `opht`
--

CREATE TABLE `opht` (
  `IdS` int(20) NOT NULL,
  `Larmoiement` varchar(20) NOT NULL,
  `OeilRouge` varchar(20) NOT NULL,
  `Douleure` varchar(20) NOT NULL,
  `Fatique` varchar(20) NOT NULL,
  `TachesDeventYeux` varchar(20) NOT NULL,
  `AutreOpht` varchar(20) NOT NULL,
  `Exemen` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

CREATE TABLE `ordonnance` (
  `IdC` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Nom` varchar(15) DEFAULT NULL,
  `Prenom` varchar(15) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Descr` varchar(15) DEFAULT NULL,
  `IdA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oreintation`
--

CREATE TABLE `oreintation` (
  `IdO` int(20) NOT NULL,
  `Specialite` varchar(20) NOT NULL,
  `Hospitalisation` varchar(20) NOT NULL,
  `pAvis` varchar(20) NOT NULL,
  `PTraitement` varchar(20) NOT NULL,
  `ServiceScosial` int(20) NOT NULL,
  `Repomse` int(60) NOT NULL,
  `ServiceEmploi` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orl`
--

CREATE TABLE `orl` (
  `IdS` int(20) NOT NULL,
  `Siffiements` varchar(20) NOT NULL,
  `EntendMal` varchar(20) NOT NULL,
  `AnginesRepetees` varchar(20) NOT NULL,
  `Otorrhees` varchar(20) NOT NULL,
  `Epistaxis` varchar(20) NOT NULL,
  `Eternuement` varchar(20) NOT NULL,
  `Rhinorrhee` varchar(20) NOT NULL,
  `Autre` varchar(20) NOT NULL,
  `Exemen` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `peaumuqueuses`
--

CREATE TABLE `peaumuqueuses` (
  `IdS` int(20) NOT NULL,
  `Allergie` varchar(20) NOT NULL,
  `Exemen` varchar(20) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(3, 'Nouveau poste', '2024-04-01', '2024-12-31', 'Faible', 'Nouveaux motifs', 7),
(4, 'Poste1 Example', '2023-01-01', '2023-12-31', 'RisqueProfess1 Example', NULL, 8),
(5, 'Poste2 Example', '2023-01-01', '2023-12-31', 'RisqueProfess1 Example', NULL, 8),
(8, 'Nouveau poste', '2024-04-01', '2024-12-31', 'Faible', 'Nouveaux motifs', 7),
(10, 'Nouveau poste', '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8),
(11, NULL, '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8),
(12, NULL, '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8),
(13, NULL, '2024-04-15', '2024-12-31', 'Faible', 'Nouveaux motifs', 8),
(14, 'Nouveau poste', '2024-04-11', NULL, NULL, NULL, NULL),
(15, 'Nouveau poste', '2024-04-11', NULL, NULL, NULL, NULL),
(16, 'Nouveau poste', '2024-04-11', NULL, NULL, NULL, NULL),
(17, 'Nouveau poste', '2024-04-01', '2024-12-31', 'Faible', 'Nouveaux motifs', NULL),
(18, 'Nouveau poste', '2024-04-01', '2024-12-31', 'Faible', 'Nouveaux motifs', 20);

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `IdE` int(11) NOT NULL,
  `Nom` varchar(15) NOT NULL,
  `Prenom` varchar(15) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Poste` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`IdE`, `Nom`, `Prenom`, `Password`, `Poste`) VALUES
(11, 'De', 'Jo', '$2b$10$ZXM9z4IBjLQsf5IhkpCd3OoyHaJs2FYh1aGMg6sv/AsbqaUbOLAd.', 'medcien');

-- --------------------------------------------------------

--
-- Structure de la table `rdv`
--

CREATE TABLE `rdv` (
  `IdR` int(11) NOT NULL,
  `IdA` int(11) DEFAULT NULL,
  `TypeRdv` varchar(50) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Heure` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rdv`
--

INSERT INTO `rdv` (`IdR`, `IdA`, `TypeRdv`, `Date`, `Heure`) VALUES
(10, 4, '2', '2024-04-24', '10:00:00'),
(11, 4, '1', '2024-04-24', '10:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `respiratoire`
--

CREATE TABLE `respiratoire` (
  `IdS` int(11) NOT NULL,
  `Toux` int(11) NOT NULL,
  `Noctume` int(11) NOT NULL,
  `Diurne` int(11) NOT NULL,
  `Expectorations` int(11) NOT NULL,
  `DouleursThoraciq` int(11) NOT NULL,
  `Tabac` int(11) NOT NULL,
  `Autre` int(11) NOT NULL,
  `Exemen` int(11) NOT NULL,
  `IdV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `section`
--

CREATE TABLE `section` (
  `Token` int(11) NOT NULL,
  `IdE` int(11) NOT NULL,
  `Exp` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `section`
--

INSERT INTO `section` (`Token`, `IdE`, `Exp`) VALUES
(0, 11, '02:09:34'),
(54, 11, '02:21:56'),
(72, 11, '02:11:01');

-- --------------------------------------------------------

--
-- Structure de la table `visite`
--

CREATE TABLE `visite` (
  `IdV` int(11) NOT NULL,
  `DateV` date NOT NULL,
  `TypeV` varchar(30) NOT NULL,
  `idA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `visite`
--

INSERT INTO `visite` (`IdV`, `DateV`, `TypeV`, `idA`) VALUES
(2, '2024-05-22', 'Consultation', 4),
(3, '2024-05-22', 'Consultation', 4);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`IdA`);

--
-- Index pour la table `cadiovasculaire`
--
ALTER TABLE `cadiovasculaire`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `f_cle_etreng` (`IdV`);

--
-- Index pour la table `certificatat`
--
ALTER TABLE `certificatat`
  ADD PRIMARY KEY (`IdC`),
  ADD KEY `IdA` (`IdA`);

--
-- Index pour la table `certificatbs`
--
ALTER TABLE `certificatbs`
  ADD PRIMARY KEY (`IdC`),
  ADD KEY `fk_IdA` (`IdA`);

--
-- Index pour la table `certificatm`
--
ALTER TABLE `certificatm`
  ADD PRIMARY KEY (`IdC`),
  ADD KEY `f_Id` (`IdA`);

--
-- Index pour la table `certificatma`
--
ALTER TABLE `certificatma`
  ADD PRIMARY KEY (`IdC`),
  ADD KEY `Id` (`IdA`);

--
-- Index pour la table `digestif`
--
ALTER TABLE `digestif`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_cle_etrenge` (`IdV`);

--
-- Index pour la table `endocrino`
--
ALTER TABLE `endocrino`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_cle_etreng` (`IdV`);

--
-- Index pour la table `exemenscomplementaires`
--
ALTER TABLE `exemenscomplementaires`
  ADD PRIMARY KEY (`IdM`),
  ADD KEY `fk_cle_etren` (`IdV`);

--
-- Index pour la table `explorationsfonctionnelles`
--
ALTER TABLE `explorationsfonctionnelles`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_cle_etre` (`IdV`);

--
-- Index pour la table `genitourinaire`
--
ALTER TABLE `genitourinaire`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_cl_etreng` (`IdV`);

--
-- Index pour la table `hematogg`
--
ALTER TABLE `hematogg`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_cle_etr` (`IdV`);

--
-- Index pour la table `locomoteur`
--
ALTER TABLE `locomoteur`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_c_etreng` (`IdV`);

--
-- Index pour la table `neuropsychisme`
--
ALTER TABLE `neuropsychisme`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_etreng` (`IdV`);

--
-- Index pour la table `opht`
--
ALTER TABLE `opht`
  ADD KEY `fk_cl_etrenger` (`IdV`);

--
-- Index pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  ADD PRIMARY KEY (`IdC`),
  ADD KEY `IdO` (`IdA`);

--
-- Index pour la table `oreintation`
--
ALTER TABLE `oreintation`
  ADD PRIMARY KEY (`IdO`);

--
-- Index pour la table `orl`
--
ALTER TABLE `orl`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `f_cle_etrenger` (`IdV`);

--
-- Index pour la table `peaumuqueuses`
--
ALTER TABLE `peaumuqueuses`
  ADD PRIMARY KEY (`IdS`),
  ADD KEY `fk_c_etrenger` (`IdV`);

--
-- Index pour la table `postes`
--
ALTER TABLE `postes`
  ADD PRIMARY KEY (`IdP`),
  ADD KEY `IdA` (`IdA`);

--
-- Index pour la table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`IdE`);

--
-- Index pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD PRIMARY KEY (`IdR`),
  ADD KEY `IdA` (`IdA`);

--
-- Index pour la table `respiratoire`
--
ALTER TABLE `respiratoire`
  ADD KEY `cle_etrenger` (`IdV`);

--
-- Index pour la table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`Token`),
  ADD KEY `fk_id` (`IdE`);

--
-- Index pour la table `visite`
--
ALTER TABLE `visite`
  ADD PRIMARY KEY (`IdV`),
  ADD KEY `fk_cle_etrenger` (`idA`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agent`
--
ALTER TABLE `agent`
  MODIFY `IdA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `cadiovasculaire`
--
ALTER TABLE `cadiovasculaire`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `certificatat`
--
ALTER TABLE `certificatat`
  MODIFY `IdC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `certificatbs`
--
ALTER TABLE `certificatbs`
  MODIFY `IdC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `certificatm`
--
ALTER TABLE `certificatm`
  MODIFY `IdC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `certificatma`
--
ALTER TABLE `certificatma`
  MODIFY `IdC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `digestif`
--
ALTER TABLE `digestif`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `endocrino`
--
ALTER TABLE `endocrino`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `exemenscomplementaires`
--
ALTER TABLE `exemenscomplementaires`
  MODIFY `IdM` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `explorationsfonctionnelles`
--
ALTER TABLE `explorationsfonctionnelles`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `genitourinaire`
--
ALTER TABLE `genitourinaire`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `hematogg`
--
ALTER TABLE `hematogg`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `locomoteur`
--
ALTER TABLE `locomoteur`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `neuropsychisme`
--
ALTER TABLE `neuropsychisme`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  MODIFY `IdC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `oreintation`
--
ALTER TABLE `oreintation`
  MODIFY `IdO` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orl`
--
ALTER TABLE `orl`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `peaumuqueuses`
--
ALTER TABLE `peaumuqueuses`
  MODIFY `IdS` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `postes`
--
ALTER TABLE `postes`
  MODIFY `IdP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `rdv`
--
ALTER TABLE `rdv`
  MODIFY `IdR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `visite`
--
ALTER TABLE `visite`
  MODIFY `IdV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cadiovasculaire`
--
ALTER TABLE `cadiovasculaire`
  ADD CONSTRAINT `f_cle_etreng` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `certificatat`
--
ALTER TABLE `certificatat`
  ADD CONSTRAINT `IdA` FOREIGN KEY (`IdA`) REFERENCES `agent` (`IdA`);

--
-- Contraintes pour la table `certificatbs`
--
ALTER TABLE `certificatbs`
  ADD CONSTRAINT `fk_IdA` FOREIGN KEY (`IdA`) REFERENCES `agent` (`IdA`);

--
-- Contraintes pour la table `certificatm`
--
ALTER TABLE `certificatm`
  ADD CONSTRAINT `f_Id` FOREIGN KEY (`IdA`) REFERENCES `agent` (`IdA`);

--
-- Contraintes pour la table `certificatma`
--
ALTER TABLE `certificatma`
  ADD CONSTRAINT `Id` FOREIGN KEY (`IdA`) REFERENCES `agent` (`IdA`);

--
-- Contraintes pour la table `digestif`
--
ALTER TABLE `digestif`
  ADD CONSTRAINT `fk_cle_etrenge` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `endocrino`
--
ALTER TABLE `endocrino`
  ADD CONSTRAINT `fk_cle_etreng` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `exemenscomplementaires`
--
ALTER TABLE `exemenscomplementaires`
  ADD CONSTRAINT `fk_cle_etren` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `explorationsfonctionnelles`
--
ALTER TABLE `explorationsfonctionnelles`
  ADD CONSTRAINT `fk_cle_etre` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `genitourinaire`
--
ALTER TABLE `genitourinaire`
  ADD CONSTRAINT `fk_cl_etreng` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `hematogg`
--
ALTER TABLE `hematogg`
  ADD CONSTRAINT `fk_cle_etr` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `locomoteur`
--
ALTER TABLE `locomoteur`
  ADD CONSTRAINT `fk_c_etreng` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `neuropsychisme`
--
ALTER TABLE `neuropsychisme`
  ADD CONSTRAINT `fk_etreng` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `opht`
--
ALTER TABLE `opht`
  ADD CONSTRAINT `fk_cl_etrenger` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  ADD CONSTRAINT `IdO` FOREIGN KEY (`IdA`) REFERENCES `agent` (`IdA`);

--
-- Contraintes pour la table `orl`
--
ALTER TABLE `orl`
  ADD CONSTRAINT `f_cle_etrenger` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `peaumuqueuses`
--
ALTER TABLE `peaumuqueuses`
  ADD CONSTRAINT `fk_c_etrenger` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

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

--
-- Contraintes pour la table `respiratoire`
--
ALTER TABLE `respiratoire`
  ADD CONSTRAINT `cle_etrenger` FOREIGN KEY (`IdV`) REFERENCES `visite` (`IdV`);

--
-- Contraintes pour la table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `fk_id` FOREIGN KEY (`IdE`) REFERENCES `profil` (`IdE`);

--
-- Contraintes pour la table `visite`
--
ALTER TABLE `visite`
  ADD CONSTRAINT `fk_cle_etrenger` FOREIGN KEY (`idA`) REFERENCES `agent` (`IdA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
