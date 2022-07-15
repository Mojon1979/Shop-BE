-- --------------------------------------------------------
-- Host:                         localhost
-- Wersja serwera:               10.4.21-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzut struktury tabela small_shop.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(35) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `createAT` datetime NOT NULL DEFAULT current_timestamp(),
  `endAT` datetime DEFAULT NULL,
  `modifyAT` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli small_shop.product: ~8 rows (około)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `name`, `description`, `price`, `createAT`, `endAT`, `modifyAT`) VALUES
	('0c91c4b7-9a1d-4129-ad69-5a20c3e06e3d', 'Product seven', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. ', 77.77, '2022-07-15 18:18:35', NULL, '2022-07-15 20:52:54'),
	('2205abe7-77e3-4f72-bbc3-8e8a98ceb50f', 'Product One', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. Nam eleifend blandit neque et fermentum.', 9.99, '2022-07-15 12:10:48', NULL, NULL),
	('25168421-b8d1-4d19-b70d-ed51156aec3a', 'Product Five', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. Nam eleifend blandit neque et fermentum.', 99.00, '2022-07-15 12:15:19', NULL, NULL),
	('358a3499-3306-4ca8-8058-f79a2208477b', 'Product Three', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. Nam eleifend blandit neque et fermentum.', 999.99, '2022-07-15 12:14:31', NULL, NULL),
	('4b4d8943-6e6c-43c1-aa9a-d74c1f61ebec', 'Product Nine', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. Nam eleifend blandit neque et fermentum.', 88.80, '2022-07-15 12:15:49', NULL, '2022-07-15 20:56:39'),
	('99334bc7-9e6c-4fdb-b1ec-be497b2772b3', 'Product Eight', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. Nam eleifend blandit neque et fermentum.', 9.99, '2022-07-15 12:35:49', NULL, NULL),
	('b86aa7d3-8441-4fad-abf5-095c64fc36d5', 'Product SIX', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. Nam eleifend blandit neque et fermentum.', 666.66, '2022-07-15 12:15:34', NULL, NULL),
	('eb8196ed-eb96-4124-a7fa-f22a4b782c56', 'Product Four', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum non elit in ornare. Sed viverra, lorem lacinia laoreet pharetra, arcu odio mattis eros, sed sollicitudin est nibh et eros. Nam eleifend blandit neque et fermentum.', 5.00, '2022-07-15 12:14:56', NULL, NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Zrzut struktury tabela small_shop.product_count
CREATE TABLE IF NOT EXISTS `product_count` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `count` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `FK_product_count_product` FOREIGN KEY (`id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli small_shop.product_count: ~8 rows (około)
/*!40000 ALTER TABLE `product_count` DISABLE KEYS */;
INSERT INTO `product_count` (`id`, `count`) VALUES
	('0c91c4b7-9a1d-4129-ad69-5a20c3e06e3d', 77),
	('2205abe7-77e3-4f72-bbc3-8e8a98ceb50f', 99),
	('25168421-b8d1-4d19-b70d-ed51156aec3a', 100),
	('358a3499-3306-4ca8-8058-f79a2208477b', 11),
	('4b4d8943-6e6c-43c1-aa9a-d74c1f61ebec', 8),
	('99334bc7-9e6c-4fdb-b1ec-be497b2772b3', 99),
	('b86aa7d3-8441-4fad-abf5-095c64fc36d5', 66),
	('eb8196ed-eb96-4124-a7fa-f22a4b782c56', 1321);
/*!40000 ALTER TABLE `product_count` ENABLE KEYS */;

-- Zrzut struktury tabela small_shop.product_url
CREATE TABLE IF NOT EXISTS `product_url` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idProd` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli small_shop.product_url: ~8 rows (około)
/*!40000 ALTER TABLE `product_url` DISABLE KEYS */;
INSERT INTO `product_url` (`id`, `idProd`, `url`) VALUES
	(2, '2205abe7-77e3-4f72-bbc3-8e8a98ceb50f', 'https://via.placeholder.com/'),
	(4, '358a3499-3306-4ca8-8058-f79a2208477b', 'https://via.placeholder.com/'),
	(5, 'eb8196ed-eb96-4124-a7fa-f22a4b782c56', 'https://via.placeholder.com/'),
	(6, '25168421-b8d1-4d19-b70d-ed51156aec3a', 'https://via.placeholder.com/'),
	(7, 'b86aa7d3-8441-4fad-abf5-095c64fc36d5', 'https://via.placeholder.com/'),
	(8, '4b4d8943-6e6c-43c1-aa9a-d74c1f61ebec', 'https://via.placeholder.com/'),
	(9, '99334bc7-9e6c-4fdb-b1ec-be497b2772b3', 'https://via.placeholder.com/'),
	(10, '0c91c4b7-9a1d-4129-ad69-5a20c3e06e3d', 'https://via.placeholder.com/');
/*!40000 ALTER TABLE `product_url` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
