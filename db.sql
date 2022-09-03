-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for mrp_clocking
CREATE DATABASE IF NOT EXISTS `mrp_clocking` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `mrp_clocking`;

-- Dumping structure for table mrp_clocking.clock_times
CREATE TABLE IF NOT EXISTS `clock_times` (
  `#` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext,
  `id` longtext,
  `starttime` longtext,
  `endtime` longtext,
  `week` int(11) DEFAULT NULL,
  PRIMARY KEY (`#`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

-- Dumping data for table mrp_clocking.clock_times: ~0 rows (approximately)
/*!40000 ALTER TABLE `clock_times` DISABLE KEYS */;
/*!40000 ALTER TABLE `clock_times` ENABLE KEYS */;

-- Dumping structure for table mrp_clocking.users
CREATE TABLE IF NOT EXISTS `users` (
  `#` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` longtext,
  `permission` varchar(50) DEFAULT NULL,
  `last_clock` longtext,
  PRIMARY KEY (`#`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table mrp_clocking.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`#`, `token`, `username`, `password`, `permission`, `last_clock`) VALUES
	(1, '8bb5405b-3073-4988-9898-7161611751af', 's0me1', '$2a$12$XLYFvbD3a0.PKHlJVd3p/.gqdADgWtaV/gxQSX8QYATikkRvU8JYu', 'admin', NULL),
	(2, 'e80dc122-01ae-4be2-84ea-8af28d07d1c7', 'Trif', '$2a$12$2yhKoRZlsaiM07VivwTB.eKa7zvWm3PMCu0/JEy/4XInNYHYk8kYu\r\n', 'admin', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
