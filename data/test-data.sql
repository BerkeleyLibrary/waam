# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.6.4-MariaDB)
# Database: waam_sample
# Generation Time: 2023-07-15 18:03:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table authorNisbas
# ------------------------------------------------------------

DROP TABLE IF EXISTS `authorNisbas`;

CREATE TABLE `authorNisbas` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `authorId` int(11) unsigned NOT NULL,
  `nisbaId` int(11) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nisba_id` (`nisbaId`),
  KEY `fk_author2_id` (`authorId`),
  CONSTRAINT `authorNisbas_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_nisba_id` FOREIGN KEY (`nisbaId`) REFERENCES `nisba` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `authorNisbas` WRITE;
/*!40000 ALTER TABLE `authorNisbas` DISABLE KEYS */;

INSERT INTO `authorNisbas` (`id`, `authorId`, `nisbaId`, `createdAt`, `updatedAt`, `status`)
VALUES
	(4106,5,17,'2018-01-01 20:45:08','2018-01-01 20:45:08','primary'),
	(4108,7,1269,'2018-01-01 20:45:08','2018-01-01 20:45:08','primary'),
	(4109,8,696,'2018-01-01 20:45:08','2018-01-01 20:45:08','primary'),
	(15478,1,268,'2019-05-18 19:39:43','2019-05-18 19:39:43','primary'),
	(15479,6,176,'2019-05-18 19:39:43','2019-05-18 19:39:43','primary'),
	(16501,1,1924,'2019-05-18 19:40:57','2019-05-18 19:40:57',NULL),
	(16502,6,1929,'2019-05-18 19:40:57','2019-05-18 19:40:57',NULL);

/*!40000 ALTER TABLE `authorNisbas` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table authors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `authors`;

CREATE TABLE `authors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `altName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aAltName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `LCName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ALCName` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aka` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aAka` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `documentation` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aDocumentation` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `nisbaId` int(11) DEFAULT NULL,
  `secNisbaId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dateDied` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aDateDied` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `dateBorn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aDateBorn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `search_nisba` text DEFAULT NULL,
  `ref_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `hidden` varchar(1) DEFAULT NULL,
  `search_nisba_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `aka` (`aka`,`aAka`),
  FULLTEXT KEY `name` (`name`,`aName`,`altName`,`aAltName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;

INSERT INTO `authors` (`id`, `name`, `aName`, `altName`, `aAltName`, `LCName`, `ALCName`, `aka`, `aAka`, `documentation`, `aDocumentation`, `nisbaId`, `secNisbaId`, `createdAt`, `updatedAt`, `dateDied`, `aDateDied`, `dateBorn`, `aDateBorn`, `groupId`, `deletedAt`, `search_nisba`, `ref_number`, `hidden`, `search_nisba_id`)
VALUES
	(1,'`Abbās b. Abī Bakr','عباس بن أبي بكر',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1160,NULL,'2017-03-08 09:00:36','2019-05-18 19:48:30',NULL,NULL,NULL,NULL,NULL,NULL,'Kanawī\nكنوي\nBidawī\nبدوي\n',NULL,NULL,'[268][1924]'),
	(2,'`Abbās b. Muḥammad Aknan','عباس بن محمد اكنن',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-03-08 09:00:36','2019-04-16 13:24:08',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,''),
	(3,'`Abbās b. Muḥammad b. al-Sīdi','عباس بن محمد بن السيد',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-03-08 09:00:36','2019-04-16 13:24:08',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,''),
	(4,'`Abd `Allāh b. Muḥammad Qadārada','عبد الله بن محمد قداردة',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2017-03-08 09:00:36','2019-04-16 13:24:08',NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,''),
	(5,'`Abd ... b. `Alī Yūsuf al-Fāsī','عبد ... بن علي يوسف الفاسي',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,17,NULL,'2017-03-08 09:00:36','2019-04-16 13:24:08',NULL,NULL,NULL,NULL,NULL,NULL,'Fāsī\nفاسي\n',NULL,NULL,'[17]'),
	(6,'`Abd al-`Alī b. `Abd al-Mālik b. `Umar al-Qurashī al-Butiji','عبد العالي بن عبد الملك بن عمر القرشي البوتيجي',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1053,NULL,'2017-03-08 09:00:36','2019-05-18 19:48:30',NULL,NULL,NULL,NULL,NULL,NULL,'Qurashī \nقرشي\nBūtījī\nبوتيجي\n',NULL,NULL,'[176][1929]'),
	(7,'`Abd al-`Azīz al-Dīrīnī','عبد العزيز الديريني‏ ‬',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1269,NULL,'2017-03-08 09:00:36','2019-04-16 13:24:08','697/1297-8',NULL,NULL,NULL,NULL,NULL,'Dīrīnī\nديريني\n',NULL,NULL,'[1269]'),
	(8,'`Abd al-`Azīz b. `Abd al-Salām al-Salamī','عبد العزيز بن عبد السلام السلمي',NULL,NULL,NULL,NULL,'`Izz al-Dīn','عز الدين',NULL,NULL,696,NULL,'2017-03-08 09:00:36','2019-04-16 13:21:14',NULL,NULL,NULL,NULL,NULL,NULL,'Sullamī\nسلمي\n',NULL,NULL,'[696]');

/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table crossReferences
# ------------------------------------------------------------

DROP TABLE IF EXISTS `crossReferences`;

CREATE TABLE `crossReferences` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) NOT NULL DEFAULT '',
  `target` varchar(255) NOT NULL DEFAULT '',
  `type` varchar(10) NOT NULL DEFAULT 'see',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `keyword_2` (`keyword`,`type`),
  FULLTEXT KEY `keyword` (`keyword`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `crossReferences` WRITE;
/*!40000 ALTER TABLE `crossReferences` DISABLE KEYS */;

INSERT INTO `crossReferences` (`id`, `keyword`, `target`, `type`, `createdAt`, `updatedAt`)
VALUES
	(1,'sharia','jurisprudence','see','2017-04-22 09:43:22','2017-04-22 09:43:22'),
	(2,'law','jurisprudence','see','2017-04-22 09:43:45','2017-04-22 09:43:45'),
	(3,'legal','jurisprudence','see','2017-04-22 09:44:12','2017-04-22 09:44:12'),
	(4,'Mohamed','Muhammad','see','2017-04-23 21:44:23','2017-04-23 21:44:23'),
	(7,'Mohammed','Muhammad','see','2017-04-28 15:43:08','2017-04-28 15:43:08'),
	(8,'Ahmed','Ahmad','see','2017-04-28 15:43:30','2017-04-28 15:43:30'),
	(9,'Mokhtar','Mukhtar','see','2017-04-28 15:43:58','2017-04-28 15:43:58'),
	(10,'Koran','Qur\'an','see','2017-04-28 15:45:16','2017-04-28 15:45:16');

/*!40000 ALTER TABLE `crossReferences` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `aName` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aDesc` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `lat` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `lng` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `path` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `hidden` varchar(1) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  KEY `id` (`id`),
  FULLTEXT KEY `name` (`name`,`aName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;

INSERT INTO `groups` (`id`, `parentId`, `name`, `aName`, `logo`, `desc`, `aDesc`, `lat`, `lng`, `path`, `updatedAt`, `createdAt`, `hidden`)
VALUES
	(1,NULL,'Boutilimit','بوتيلمت',NULL,' Ahl Sidiyya Library, from the 1992 catalogue of 2051 manuscripts','فهارس المخطوطات لدى أهل الشيخ سبديا: بوتيلمت','17.516667','-14.766667','boutilimit','2018-07-21 11:01:27','2017-01-29 16:41:38',NULL),
	(2,NULL,'Ghana','غانا',NULL,'Northwestern University, from the 2007 catalogue of 485 mss photocopies','فهارس المخطوطات في Northwestern University Library','5.55','-0.25','accra','2018-07-21 11:01:53','2017-01-29 16:41:38',NULL),
	(3,NULL,'Ibadan','إيبادان','furqan','al-Furqan Foundation catalogue # 37, 2001, of 423 mss copies and films','سلسلة فهارس المخطوطات الاسلامية لمؤسسة الفرقان رقم : 37','7.396389','3.916667','ibadan','2018-09-28 15:58:15','2017-01-29 16:41:38','y'),
	(4,NULL,'Kano ','كانو',NULL,'Northwestern University, from the 1991 catalogue of 4511 mss','فهارس المخطوطات في Northwestern University Library','12','8.516667','kano','2018-07-21 11:02:25','2017-01-29 16:41:38',NULL),
	(5,NULL,'Niamey','نيامي',NULL,'IRSH, from the 1979 mimeographed handlist catalogue of 1870 manuscripts','فهارس المخطوطات في العلوم الانسانية, نيلمي النيجر','13.521389','2.105278','niamey','2018-07-21 11:02:40','2017-01-29 16:41:38',NULL),
	(6,NULL,'Nouakchott','نواكشوط',NULL,'IMRS, from the 1992 catalogue of 3134 manuscripts','فهارس المخطوطات في المعهد الموريتاني للبحث العلمي','18.09194444','-15.95194444','nouakchott','2018-07-21 11:02:53','2017-01-29 16:41:38',NULL),
	(7,NULL,'Segou','سيغو',NULL,'BNF, from the 1985 CNRS catalogue of 4138 manuscripts','فهارس المخطوطات من المكتبة الحاج عمر, سيغو','13.45','-6.266667','segou','2018-07-21 11:03:07','2017-01-29 16:41:38',NULL),
	(8,NULL,'Shinqit','شنقيط','furqan','al-Furqan catalogue # 7, 1997, of 963 manuscripts','سلسلة فهارس المخطوطات الاسلامية لمؤسسة الفرقان رقم : 7','20.45','-12.35','shinqitwadan','2018-09-28 15:58:15','2017-01-29 16:41:38','y'),
	(9,NULL,'Timbuktu IHERIAB',' تنبكتو',NULL,'from the 1991 CEDRAB handlist of 5638 manuscripts','فهارس المخطوطات في مركز أحمد بابا, تنبكتو','16.7759','-3.0094','timbuktu','2018-07-21 11:04:03','2017-01-29 16:41:38',NULL),
	(10,NULL,'Wadan','وادان','furqan','al-Furqan catalogue # 7, 1997, of 143 manuscripts','سلسلة فهارس المخطوطات الاسلامية لمؤسسة الفرقان رقم : 7','20.931514','-11.621439','shinqitwadan','2018-09-28 15:58:15','2017-01-29 16:41:38','y');

/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table logins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `logins`;

CREATE TABLE `logins` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `loginType` tinyint(1) NOT NULL DEFAULT 0,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;

INSERT INTO `logins` (`id`, `userId`, `ip`, `loginType`, `updatedAt`, `createdAt`)
VALUES
	(1,4,NULL,1,'2017-02-25 14:42:44','2017-02-25 14:42:44'),
	(2,4,NULL,1,'2017-02-25 14:49:26','2017-02-25 14:49:26'),
	(3,4,NULL,0,'2017-02-25 15:15:40','2017-02-25 15:15:40'),
	(4,4,NULL,1,'2017-02-26 03:32:35','2017-02-26 03:32:35'),
	(5,4,NULL,1,'2017-02-26 04:03:55','2017-02-26 04:03:55'),
	(6,4,NULL,1,'2017-02-26 04:45:38','2017-02-26 04:45:38'),
	(7,4,NULL,0,'2017-02-27 02:34:11','2017-02-27 02:34:11'),
	(8,4,NULL,1,'2017-02-27 08:43:22','2017-02-27 08:43:22'),
	(9,4,NULL,1,'2017-02-27 08:48:53','2017-02-27 08:48:53'),
	(10,4,NULL,1,'2017-02-27 08:54:31','2017-02-27 08:54:31');

/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table manuscriptAuthors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `manuscriptAuthors`;

CREATE TABLE `manuscriptAuthors` (
  `manuscriptId` int(11) unsigned NOT NULL,
  `authorId` int(11) unsigned NOT NULL,
  `status` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`authorId`,`manuscriptId`),
  UNIQUE KEY `authorId` (`authorId`,`manuscriptId`),
  KEY `fk_manscript_id` (`manuscriptId`),
  CONSTRAINT `fk_manscript_id` FOREIGN KEY (`manuscriptId`) REFERENCES `manuscripts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `manuscriptAuthors_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

LOCK TABLES `manuscriptAuthors` WRITE;
/*!40000 ALTER TABLE `manuscriptAuthors` DISABLE KEYS */;

INSERT INTO `manuscriptAuthors` (`manuscriptId`, `authorId`, `status`, `createdAt`, `updatedAt`)
VALUES
	(21047,1,'primary','2018-01-01 20:34:59','2018-01-01 20:34:59'),
	(18496,2,'primary','2018-01-01 20:34:59','2018-01-01 20:34:59'),
	(16973,3,'primary','2018-01-01 20:34:59','2018-01-01 20:34:59'),
	(5648,4,'primary','2021-03-07 16:19:01','2021-03-07 16:19:01'),
	(12429,5,'primary','2018-01-01 20:34:59','2018-01-01 20:34:59'),
	(22420,7,'primary','2018-01-01 20:34:59','2018-01-01 20:34:59'),
	(11344,8,'primary','2018-01-01 20:34:59','2018-05-11 13:23:43');

/*!40000 ALTER TABLE `manuscriptAuthors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table manuscripts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `manuscripts`;

CREATE TABLE `manuscripts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `collection` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '',
  `aTitle` varchar(1023) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `title` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `altTitle` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aAltTitle` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `attrTitle` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aAttrTitle` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `documentation` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aDocumentation` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `form` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aForm` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `recp` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aRecp` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `recpGrp` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aRecpGrp` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `req` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aReq` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `copyist` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aCopyist` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `copiedAt` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aCopiedAt` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `copiedDate` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aCopiedDate` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `composed` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `owner` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aOwner` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `pages` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `dims` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `lang` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `condition` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `aCondition` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `misc` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aMisc` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aFirstLine` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aLastLine` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sponsorLogo` varchar(128) COLLATE utf8mb3_unicode_ci DEFAULT '',
  `login` int(11) NOT NULL DEFAULT 0,
  `added_by` int(11) DEFAULT NULL,
  `approved` int(11) NOT NULL DEFAULT 0,
  `onlineCopy` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT 'amms',
  `search_author` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_author_aka` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_author_date_died` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_author_nisba` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_author_nisba_id` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_subject` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `ref_number` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `onlineLabel` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `hidden` varchar(1) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_author_id` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `search_title` text COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `aTitle` (`aTitle`,`title`),
  FULLTEXT KEY `aMisc` (`aMisc`,`misc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `manuscripts` WRITE;
/*!40000 ALTER TABLE `manuscripts` DISABLE KEYS */;

INSERT INTO `manuscripts` (`id`, `collection`, `aTitle`, `title`, `altTitle`, `aAltTitle`, `attrTitle`, `aAttrTitle`, `documentation`, `aDocumentation`, `form`, `aForm`, `recp`, `aRecp`, `recpGrp`, `aRecpGrp`, `req`, `aReq`, `copyist`, `aCopyist`, `copiedAt`, `aCopiedAt`, `copiedDate`, `aCopiedDate`, `composed`, `owner`, `aOwner`, `pages`, `dims`, `lang`, `condition`, `aCondition`, `misc`, `aMisc`, `aFirstLine`, `aLastLine`, `sponsorLogo`, `login`, `added_by`, `approved`, `onlineCopy`, `groupId`, `subjectId`, `updatedAt`, `createdAt`, `deletedAt`, `source`, `search_author`, `search_author_aka`, `search_author_date_died`, `search_author_nisba`, `search_author_nisba_id`, `search_subject`, `ref_number`, `onlineLabel`, `hidden`, `search_author_id`, `search_title`)
VALUES
	(5648,'Falke/2740/MS','تخميس العشرينيات',NULL,NULL,'الوسائل المتقبلة',NULL,NULL,NULL,NULL,'verse: quintrains','نظم: تخميس','','','','','','','','','','','','','','',NULL,'2 ff','17x20 cm','','Rubricated. Partially vocalized. Exercise book paper. Incomplete.',NULL,'','','','','',0,NULL,1,NULL,4,94,'2022-10-29 21:19:47','2017-01-29 07:10:04',NULL,'amms','`Abd `Allāh b. Muḥammad Qadārada\nعبد الله بن محمد قداردة\n`Abd al-Rahman b. Yakhluftān b. Aḥmad al-Fāzāzī\nعبد الرحمان بن يكلفتان بن أحمد الفازازي','Abū Zayd, Ibn Yakhluftan\nأبو زيد','627/1230','Fāzāzī\nفازازي\n','[274]','devotional: praise of the Prophet\nتحنث: مدح النبي',NULL,NULL,NULL,'[4][219]','تخميس العشرينيات\nوسائل المتقبلة'),
	(11344,'\"5291, 270 -275\"','التفضيل',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'prose','نثر','','','','','','','','','','','','','','',NULL,'6','','','',NULL,'','','','','',0,NULL,1,NULL,7,56,'2021-10-09 21:45:15','2017-01-29 07:10:04',NULL,'amms','`Abd al-`Azīz b. `Abd al-Salām al-Salamī\nعبد العزيز بن عبد السلام السلمي','`Izz al-Dīn\nعز الدين','','Sullamī\nسلمي\n','[696]','Prophet Muhammad\nسيرة نبوية',NULL,NULL,NULL,'[8]','تفضيل'),
	(12429,'\"5506, 1a-154a\"','نوازل',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'prose','نثر','','','','','','','','','','','','','','',NULL,'154','','','',NULL,'','','','','',0,NULL,1,NULL,7,16,'2021-10-09 21:45:20','2017-01-29 07:10:04',NULL,'amms','`Abd ... b. `Alī Yūsuf al-Fāsī\nعبد ... بن علي يوسف الفاسي','','','Fāsī\nفاسي\n','[17]','jurisprudence\nفقه',NULL,NULL,NULL,'[5]','نوازل'),
	(16973,'1577','ارشاد الأحباب الي أسرار كفاية الطلاب في الفرائض',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'prose: opuscule','نثر: تأليف','','','','','','','','','','','','','','',NULL,'3','','Suqi','',NULL,'','','','','',0,NULL,1,NULL,9,16,'2021-10-09 21:45:49','2017-01-29 07:10:04',NULL,'amms','`Abbās b. Muḥammad b. al-Sīdi\nعباس بن محمد بن السيد','','','','','jurisprudence\nفقه',NULL,NULL,NULL,'[3]','ارشاد الأحباب الي أسرار كفاية الطلاب في الفرائض'),
	(18496,'3098','أرجوزة في قوانين الشعر',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'verse: urjuza','نظم: أرجوزة','','','','','','','','','','','','','','',NULL,'3','','Suqi','',NULL,'','','','','',0,NULL,1,NULL,9,164,'2021-10-09 21:45:58','2017-01-29 07:10:04',NULL,'amms','`Abbās b. Muḥammad Aknan\nعباس بن محمد اكنن','','','','','literature: prosody\nأدب: عروض',NULL,NULL,NULL,'[2]','أرجوزة في قوانين الشعر'),
	(21047,'Hunwick/296/PE','كتاب الصلاة على خير الأنام',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'verse','نظم','','','','','','','\"Printed by Visible Print Industry, sponsored by Youth Movement of Nigeria.\"','','','','','','','',NULL,'9','','Arabic','v. good',NULL,'\"Author born in Bida (Nigeria), resident in Kano. The book is a simple prayer on the Prophet based on Allah`s ninetynine names. The title of the book is mentioned in the first page as \"\"Kitab al-salat `ala al-nabi al-mukhtar\"\".\"','اصل المؤلف مدينة بدا في نيجيريا. >كر المؤلف في الصفحة الأولى ان اسم الكتاب هو كتاب الصلاة على النبي المختار','','','',58,NULL,1,NULL,4,100,'2021-10-09 21:46:14','2017-01-29 07:10:04',NULL,'amms','`Abbās b. Abī Bakr\nعباس بن أبي بكر','','','Kanawī\nكنوي\nBidawī\nبدوي\n','[268][1924]','devotional: prayer to the Prophet\nتحنث: صلاة علي النبي',NULL,NULL,NULL,'[1]','كتاب الصلاة على خير الأنام'),
	(22420,'Ahl Habat 150','طهارة القلوب والخضوع لعلام الغيوب',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','','','','','','','','','','','','','','','Ahl Habat',NULL,'\"‬269‏ ‬،‏ ‬مقياس الورق‏ ‬19x28‏ ‬س‏ ‬،‏ ‬مقياس النص‏ ‬14x21‏ ‬س‏ ‬،‏ ‬عدد الاسطر‏ ‬14‏ ‬،‏ ‬الخط ثلث\"','','','‬نسخة جيدة وكاملة',NULL,'\"‬GAL I 451f‎., ‬S I 810f\"','','','','',0,NULL,1,NULL,8,85,'2023-07-15 12:53:23','2017-01-29 07:10:04',NULL,'amms','`Abd al-`Azīz al-Dīrīnī\nعبد العزيز الديريني‏ ‬','','697/1297-8','Dīrīnī\nديريني\n','[1269]','belief: theology\nعقيدة: توحيد',NULL,NULL,'y','[7]','طهارة القلوب والخضوع لعلام الغيوب');

/*!40000 ALTER TABLE `manuscripts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table nisba
# ------------------------------------------------------------

DROP TABLE IF EXISTS `nisba`;

CREATE TABLE `nisba` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nisba` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `aNisba` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `nisba` (`nisba`,`aNisba`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `nisba` WRITE;
/*!40000 ALTER TABLE `nisba` DISABLE KEYS */;

INSERT INTO `nisba` (`id`, `nisba`, `aNisba`, `createdAt`, `updatedAt`, `deletedAt`)
VALUES
	(17,'Fāsī','فاسي','2017-01-29 07:04:47','2017-01-29 07:04:47',NULL),
	(176,'Qurashī ','قرشي','2017-01-29 07:04:47','2017-01-29 07:04:47',NULL),
	(268,'Kanawī','كنوي','2017-01-29 07:04:47','2017-01-29 07:04:47',NULL),
	(696,'Sullamī','سلمي','2017-01-29 07:04:47','2018-01-20 16:53:51',NULL),
	(1269,'Dīrīnī','ديريني','2017-01-29 07:04:47','2017-01-29 07:04:47',NULL),
	(1924,'Bidawī','بدوي','2019-05-18 18:52:54','2019-05-18 18:52:54',NULL),
	(1929,'Būtījī','بوتيجي','2019-05-18 18:52:54','2019-05-18 18:52:54',NULL);

/*!40000 ALTER TABLE `nisba` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table normalizedSubjects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `normalizedSubjects`;

CREATE TABLE `normalizedSubjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `english` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '',
  `arabic` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `seeAlso` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `see` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `parent` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `includes` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `count` int(10) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `normalizedSubjects` WRITE;
/*!40000 ALTER TABLE `normalizedSubjects` DISABLE KEYS */;

INSERT INTO `normalizedSubjects` (`id`, `english`, `arabic`, `seeAlso`, `see`, `parent`, `includes`, `count`, `createdAt`, `updatedAt`)
VALUES
	(1,'Administration',NULL,NULL,'Politics',NULL,NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(2,'Allegiance',NULL,NULL,'Politics',NULL,NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(3,'Arithmetic',NULL,NULL,'Science',NULL,NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(4,'Arabic language','لغة عربية',NULL,NULL,NULL,NULL,1603,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(5,'calligraphy','فن الخط',NULL,NULL,'Arabic language',NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(6,'grammar','نحو',NULL,NULL,'Arabic language',NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(7,'lexicon','معجم',NULL,NULL,'Arabic language',NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(8,'morphology','صرف',NULL,NULL,'Arabic language',NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(9,'foreign languages','لغة اجنبية',NULL,NULL,'Arabic language',NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41'),
	(10,'orthography','إملاء',NULL,NULL,'Arabic language',NULL,NULL,'2017-06-10 18:19:41','2017-06-10 18:19:41');

/*!40000 ALTER TABLE `normalizedSubjects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subjects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subjects`;

CREATE TABLE `subjects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `subject` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '',
  `aSubject` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `subject` (`subject`,`aSubject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;

INSERT INTO `subjects` (`id`, `parentId`, `subject`, `aSubject`, `createdAt`, `updatedAt`, `deletedAt`)
VALUES
	(16,NULL,'jurisprudence','فقه','2017-01-29 07:02:32','2017-01-29 07:02:32',NULL),
	(56,NULL,'Prophet Muhammad','سيرة نبوية','2017-01-29 07:02:32','2017-01-29 07:02:32',NULL),
	(85,NULL,'belief: theology','عقيدة: توحيد','2017-01-29 07:02:32','2017-01-29 07:02:32',NULL),
	(94,NULL,'devotional: praise of the Prophet','تحنث: مدح النبي','2017-01-29 07:02:32','2017-01-29 07:02:32',NULL),
	(100,NULL,'devotional: prayer to the Prophet','تحنث: صلاة علي النبي','2017-01-29 07:02:32','2017-01-29 07:02:32',NULL),
	(164,NULL,'literature: prosody','أدب: عروض','2017-01-29 07:02:32','2017-01-29 07:02:32',NULL);

/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 0,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL DEFAULT '',
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `admin`, `active`, `name`, `updatedAt`, `createdAt`, `deleted`)
VALUES
	(2,'john@example.com','fake-hashed-pass',0,1,'John Smith','2023-07-15 13:01:42','2017-02-14 11:16:09',0),
	(4,'jane@example.com','fake-hashed-pass',1,1,'Jane Smith','2023-07-15 13:01:59','2017-02-25 10:11:12',0);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
