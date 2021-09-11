-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: Do_An
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bao_cao`
--

DROP TABLE IF EXISTS `bao_cao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bao_cao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(255) DEFAULT NULL,
  `thoi_gian_tao` datetime DEFAULT NULL,
  `tieu_de` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `nguoi_tao_id` int(11) DEFAULT NULL,
  `thong_bao_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7opmvf7406clbo93y6mk01y9t` (`nguoi_tao_id`),
  KEY `FK6y2apv7rqd184aexq8ktesw8u` (`thong_bao_id`),
  CONSTRAINT `FK6y2apv7rqd184aexq8ktesw8u` FOREIGN KEY (`thong_bao_id`) REFERENCES `thong_bao` (`id`),
  CONSTRAINT `FK7opmvf7406clbo93y6mk01y9t` FOREIGN KEY (`nguoi_tao_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bao_cao`
--

LOCK TABLES `bao_cao` WRITE;
/*!40000 ALTER TABLE `bao_cao` DISABLE KEYS */;
/*!40000 ALTER TABLE `bao_cao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ca_lam_viec`
--

DROP TABLE IF EXISTS `ca_lam_viec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ca_lam_viec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `so_nhan_vien_toi_da` int(11) NOT NULL,
  `thoi_gian_lam_viec` varchar(255) NOT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ca_lam_viec`
--

LOCK TABLES `ca_lam_viec` WRITE;
/*!40000 ALTER TABLE `ca_lam_viec` DISABLE KEYS */;
INSERT INTO `ca_lam_viec` VALUES (1,2,'21h-23h',_binary '\0');
/*!40000 ALTER TABLE `ca_lam_viec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_nhanh`
--

DROP TABLE IF EXISTS `chi_nhanh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chi_nhanh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia_chi` varchar(255) DEFAULT NULL,
  `dia_chi_ip` varchar(255) DEFAULT NULL,
  `ma_chi_nhanh` varchar(255) DEFAULT NULL,
  `trang_thai_hoat_dong` int(11) DEFAULT NULL,
  `trang_thai_ket_noi` int(11) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `cong_ty_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkj566tocq2701a08uw996kj0v` (`cong_ty_id`),
  CONSTRAINT `FKkj566tocq2701a08uw996kj0v` FOREIGN KEY (`cong_ty_id`) REFERENCES `tong_cong_ty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_nhanh`
--

LOCK TABLES `chi_nhanh` WRITE;
/*!40000 ALTER TABLE `chi_nhanh` DISABLE KEYS */;
INSERT INTO `chi_nhanh` VALUES (1,'Đống Đa','Không có','CH-01',1,1,_binary '\0',1),(2,'Thanh Xuân','Không có','CH-02',1,1,_binary '\0',1);
/*!40000 ALTER TABLE `chi_nhanh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chi_nhanh_hang_hoa`
--

DROP TABLE IF EXISTS `chi_nhanh_hang_hoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chi_nhanh_hang_hoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ton_kho` float NOT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `chi_nhanh_id` int(11) DEFAULT NULL,
  `hang_hoa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl3oyjf2j8akkec9yrgoiyyyby` (`chi_nhanh_id`),
  KEY `FKlcxh8hcuoshwhxlrghkpoye6l` (`hang_hoa_id`),
  CONSTRAINT `FKl3oyjf2j8akkec9yrgoiyyyby` FOREIGN KEY (`chi_nhanh_id`) REFERENCES `chi_nhanh` (`id`),
  CONSTRAINT `FKlcxh8hcuoshwhxlrghkpoye6l` FOREIGN KEY (`hang_hoa_id`) REFERENCES `hang_hoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chi_nhanh_hang_hoa`
--

LOCK TABLES `chi_nhanh_hang_hoa` WRITE;
/*!40000 ALTER TABLE `chi_nhanh_hang_hoa` DISABLE KEYS */;
INSERT INTO `chi_nhanh_hang_hoa` VALUES (1,1000,_binary '\0',1,1),(2,100,_binary '\0',1,2),(3,200,_binary '\0',1,3),(4,100,_binary '\0',1,4);
/*!40000 ALTER TABLE `chi_nhanh_hang_hoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chinh_sach`
--

DROP TABLE IF EXISTS `chinh_sach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chinh_sach` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chinh_sach`
--

LOCK TABLES `chinh_sach` WRITE;
/*!40000 ALTER TABLE `chinh_sach` DISABLE KEYS */;
/*!40000 ALTER TABLE `chinh_sach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chuc_vu`
--

DROP TABLE IF EXISTS `chuc_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chuc_vu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten_chuc_vu` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chuc_vu`
--

LOCK TABLES `chuc_vu` WRITE;
/*!40000 ALTER TABLE `chuc_vu` DISABLE KEYS */;
INSERT INTO `chuc_vu` VALUES (1,'Quản lý',_binary '\0'),(2,'Bảo vệ',_binary '\0'),(3,'Thu ngân',_binary '\0'),(4,'Nhân viên kho',_binary '\0');
/*!40000 ALTER TABLE `chuc_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dieu_khoan`
--

DROP TABLE IF EXISTS `dieu_khoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dieu_khoan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noi_dung` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dieu_khoan`
--

LOCK TABLES `dieu_khoan` WRITE;
/*!40000 ALTER TABLE `dieu_khoan` DISABLE KEYS */;
/*!40000 ALTER TABLE `dieu_khoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_vi`
--

DROP TABLE IF EXISTS `don_vi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `don_vi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten_don_vi` varchar(255) DEFAULT NULL,
  `xoa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_vi`
--

LOCK TABLES `don_vi` WRITE;
/*!40000 ALTER TABLE `don_vi` DISABLE KEYS */;
INSERT INTO `don_vi` VALUES (1,'Hộp',0),(2,'Vỉ',0),(3,'Thùng',0),(5,'Lon',0),(6,'Gói',0),(7,'Bịch',0),(8,'Lốc',0),(9,'Chai 1l',0),(10,'Can 2l',0),(11,'Chai 0.5l',0),(12,'Can 5l',0);
/*!40000 ALTER TABLE `don_vi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `don_vi_hang_hoa`
--

DROP TABLE IF EXISTS `don_vi_hang_hoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `don_vi_hang_hoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ti_le` double DEFAULT NULL,
  `xoa` tinyint(1) DEFAULT NULL,
  `don_vi_id` int(11) DEFAULT NULL,
  `hang_hoa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdy3t2p82t6s6ur55s17kmxdkn` (`don_vi_id`),
  KEY `FK89tfq0cui7msn6iwb20b0g5pw` (`hang_hoa_id`),
  CONSTRAINT `FK89tfq0cui7msn6iwb20b0g5pw` FOREIGN KEY (`hang_hoa_id`) REFERENCES `hang_hoa` (`id`),
  CONSTRAINT `FKdy3t2p82t6s6ur55s17kmxdkn` FOREIGN KEY (`don_vi_id`) REFERENCES `don_vi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `don_vi_hang_hoa`
--

LOCK TABLES `don_vi_hang_hoa` WRITE;
/*!40000 ALTER TABLE `don_vi_hang_hoa` DISABLE KEYS */;
INSERT INTO `don_vi_hang_hoa` VALUES (1,1,0,1,1),(2,4,0,2,1),(3,24,0,3,1),(4,24,0,3,2),(5,1,0,5,2),(9,1,0,6,3),(10,6,0,7,3),(11,1,0,6,4),(12,30,0,3,4),(13,6,0,8,2),(14,NULL,0,2,2),(15,1,0,1,1),(16,1,0,9,5),(17,0.5,0,11,5),(18,1,0,1,6),(19,1,0,9,1),(20,4,0,1,8);
/*!40000 ALTER TABLE `don_vi_hang_hoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hang_hoa`
--

DROP TABLE IF EXISTS `hang_hoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hang_hoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ma` varchar(255) DEFAULT NULL,
  `ma_giam_gia` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT 'Không có',
  `phan_tram_giam_gia` float DEFAULT NULL,
  `ten_hang_hoa` varchar(255) NOT NULL,
  `tich_diem` int(11) DEFAULT NULL,
  `url_hinh_anh_1` varchar(255) DEFAULT NULL,
  `url_hinh_anh_2` varchar(255) DEFAULT NULL,
  `url_hinh_anh_3` varchar(255) DEFAULT NULL,
  `url_hinh_anh_4` varchar(255) DEFAULT NULL,
  `url_hinh_anh_5` varchar(255) DEFAULT NULL,
  `xoa` tinyint(1) DEFAULT NULL,
  `nhom_hang_id` int(11) DEFAULT NULL,
  `thuong_hieu_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkatvyhl77er4x924mcc5cmymc` (`nhom_hang_id`),
  KEY `FKt0rvcsd5ktry3f9cp6d5smxd9` (`thuong_hieu_id`),
  CONSTRAINT `FKkatvyhl77er4x924mcc5cmymc` FOREIGN KEY (`nhom_hang_id`) REFERENCES `nhom_hang` (`id`),
  CONSTRAINT `FKt0rvcsd5ktry3f9cp6d5smxd9` FOREIGN KEY (`thuong_hieu_id`) REFERENCES `thuong_hieu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hang_hoa`
--

LOCK TABLES `hang_hoa` WRITE;
/*!40000 ALTER TABLE `hang_hoa` DISABLE KEYS */;
INSERT INTO `hang_hoa` VALUES (1,'S-001','','Không có',0,'Sữa Milo',0,'https://bizweb.dktcdn.net/thumb/large/100/197/189/products/70-14194070-c2a2-4659-ac44-9d17de133e79.jpg',NULL,NULL,NULL,NULL,0,1,1),(2,'NN-001',NULL,'Không có',NULL,'Coca-Cola',NULL,'https://img.sosanhgia.com/images/500x0/0bd57d01fae54215b7e5ef049b2965dc/nuoc-ngot-coca--cola-250ml.jpeg',NULL,NULL,NULL,NULL,0,2,2),(3,'BB-001',NULL,'Không có',NULL,'Bim bim Poca',NULL,'http://htmart.org/wp-content/uploads/2018/11/16033535361054.jpg',NULL,NULL,NULL,NULL,0,3,3),(4,'MT-001',NULL,'Không có',NULL,'Mì Omachi',NULL,'https://cf.shopee.vn/file/bbc69761b0914e0dca03e5b6f84a7d17',NULL,NULL,NULL,NULL,0,4,4),(5,'DA-001',NULL,'Không có',NULL,'Dầu ăn Simply',NULL,NULL,NULL,NULL,NULL,NULL,0,5,6),(6,'S-002',NULL,'Không có',NULL,'Sữa Vinamilk',NULL,NULL,NULL,NULL,NULL,NULL,0,1,5),(7,'BB-7787579456','','<br>',0,'Bim bim',0,'https://cdn.tgdd.vn/Products/Images/2565/220273/bhx/mi-bo-nau-dua-chua-omachi-102-goi-120g-202003311428306753.jpg',NULL,NULL,NULL,NULL,0,1,1),(8,'S-6509564044','','<br>',0,'Banh gao',0,'https://cdn.tgdd.vn/Products/Images/2565/220273/bhx/mi-bo-nau-dua-chua-omachi-102-goi-120g-202003311428306753.jpg',NULL,NULL,NULL,NULL,0,1,1),(12,'B-79036083','','demo',0,'bánh g?o',0,'75000000afc.jpeg',NULL,NULL,NULL,NULL,0,6,7),(13,'DA-61639318','','',0,'D?u ?n Neptune',0,'915000000neptune.jpg',NULL,NULL,NULL,NULL,0,5,1),(14,'B-43748740','','Bánh r?t ngon :v',0,'Bánh Chocopie',0,'214000000chocopie.jpg',NULL,NULL,NULL,NULL,0,6,1);
/*!40000 ALTER TABLE `hang_hoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don`
--

DROP TABLE IF EXISTS `hoa_don`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hoa_don` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ma` varchar(255) NOT NULL,
  `thoi_gian` datetime NOT NULL,
  `tien_khach_tra` double NOT NULL,
  `tien_tra_lai_khach` double DEFAULT NULL,
  `tong_tien` double NOT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `chi_nhanh_id` int(11) DEFAULT NULL,
  `khach_hang_id` int(11) DEFAULT NULL,
  `nguoi_dung_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7vtvttrp9r6o6ikgek40pquiw` (`chi_nhanh_id`),
  KEY `FKfvowmias4ycehn19gyv8t5dys` (`khach_hang_id`),
  KEY `FKdyrp3siy2ej5m684r8jyqn08c` (`nguoi_dung_id`),
  CONSTRAINT `FK7vtvttrp9r6o6ikgek40pquiw` FOREIGN KEY (`chi_nhanh_id`) REFERENCES `chi_nhanh` (`id`),
  CONSTRAINT `FKdyrp3siy2ej5m684r8jyqn08c` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `FKfvowmias4ycehn19gyv8t5dys` FOREIGN KEY (`khach_hang_id`) REFERENCES `khach_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don`
--

LOCK TABLES `hoa_don` WRITE;
/*!40000 ALTER TABLE `hoa_don` DISABLE KEYS */;
INSERT INTO `hoa_don` VALUES (1,'','HD-0006554','2020-07-08 14:14:54',700000,90000,610000,1,_binary '\0',1,13,1),(2,'','HD-0007510','2020-07-08 19:41:20',120000,9000,111000,1,_binary '\0',1,11,1),(3,'','HD-0009014','2020-07-09 08:56:32',210000,0,210000,1,_binary '\0',1,11,3),(5,'','HD-0002484','2020-07-09 09:01:10',256000,0,256000,1,_binary '\0',1,11,2),(6,'','HD-0008929','2020-07-09 10:52:02',250000,10000,240000,1,_binary '\0',1,1,2),(7,'','HD-0008655','2020-07-09 11:00:03',250000,28000,222000,1,_binary '\0',1,14,1),(8,'','HD-0004281','2020-07-20 14:20:21',500000,30000,470000,1,_binary '\0',1,1,1),(9,'','HD-0004043','2020-07-20 14:59:04',40000,NULL,46000,1,_binary '\0',1,17,1);
/*!40000 ALTER TABLE `hoa_don` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoa_don_chi_tiet`
--

DROP TABLE IF EXISTS `hoa_don_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hoa_don_chi_tiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `giam_gia` double DEFAULT '0',
  `so_luong` int(11) NOT NULL,
  `tong_gia` double NOT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `hoa_don_id` int(11) DEFAULT NULL,
  `gia_ban_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8it5rkm179qgy53rxgafr1d5x` (`hoa_don_id`),
  KEY `FKq10j0p42i5k5yj0y6rqqrt0oi` (`gia_ban_id`),
  CONSTRAINT `FK8it5rkm179qgy53rxgafr1d5x` FOREIGN KEY (`hoa_don_id`) REFERENCES `hoa_don` (`id`),
  CONSTRAINT `FKq10j0p42i5k5yj0y6rqqrt0oi` FOREIGN KEY (`gia_ban_id`) REFERENCES `lich_su_gia_ban` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoa_don_chi_tiet`
--

LOCK TABLES `hoa_don_chi_tiet` WRITE;
/*!40000 ALTER TABLE `hoa_don_chi_tiet` DISABLE KEYS */;
INSERT INTO `hoa_don_chi_tiet` VALUES (1,0,2,400000,_binary '\0',1,13),(2,0,1,100000,_binary '\0',1,4),(3,0,2,110000,_binary '\0',1,9),(4,0,1,55000,_binary '\0',2,9),(5,0,2,56000,_binary '\0',2,3),(6,0,10,100000,_binary '\0',3,5),(7,0,2,110000,_binary '\0',3,9),(8,0,1,200000,_binary '\0',5,13),(9,0,2,56000,_binary '\0',5,3),(10,NULL,6,60000,_binary '\0',6,5),(11,NULL,1,180000,_binary '\0',6,12),(12,NULL,2,110000,_binary '\0',7,9),(13,NULL,4,112000,_binary '\0',7,3),(14,NULL,2,420000,_binary '\0',8,4),(15,NULL,1,50000,_binary '\0',8,14),(16,NULL,1,38000,_binary '\0',9,15),(17,NULL,1,8000,_binary '\0',9,8);
/*!40000 ALTER TABLE `hoa_don_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khach_hang`
--

DROP TABLE IF EXISTS `khach_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `khach_hang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia_chi` varchar(255) DEFAULT NULL,
  `dien_thoai` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT 'Không có',
  `ghi_chu` varchar(255) DEFAULT 'Không có',
  `gioi_tinh` bit(1) DEFAULT NULL,
  `loai_khach` varchar(255) DEFAULT NULL,
  `ngay_sinh` varchar(20) DEFAULT 'Không có',
  `tai_khoan` varchar(255) DEFAULT NULL,
  `ten_khach_hang` varchar(255) DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khach_hang`
--

LOCK TABLES `khach_hang` WRITE;
/*!40000 ALTER TABLE `khach_hang` DISABLE KEYS */;
INSERT INTO `khach_hang` VALUES (1,'Đống Đa','0123456789','a@gmail.com','Không có','Không có',NULL,'Bình thường','2004-06-10',NULL,'Hiệp',1,_binary '\0'),(2,'Bách Khoa','011111111','bk@gmail.com','Không có','Không có',NULL,'Bình thường','2020-06-26',NULL,'Bách Khoa',1,_binary '\0'),(11,'Hà Nội','123123131','nguyenhoanghiep132@gmail.com','Không có','Không có',NULL,'Bình thường',NULL,'','Nguyễn Hoàng Hiệp',1,_binary '\0'),(13,'Bách Khoa','0123456789','quy@gmail.com','Không có','Không có',NULL,'Bình thường',NULL,'','Quý',1,_binary '\0'),(14,'Tây Sơn','012398761','hoanghiep@gmail.com','Không có','Không có',NULL,'Bình thường',NULL,'','Hoàng Hiệp',1,_binary '\0'),(15,'Hà N?i','01231','nguyenhoanghiep132@gmail.com','','',NULL,'Bình th??ng',NULL,'','Nguy?n Hoàng Hi?p',1,_binary '\0'),(16,'Hà N?i','01234','nguyenhoanghiep132@gmail.com','','',NULL,'Bình th??ng',NULL,'','Hi?p',1,_binary '\0'),(17,'??ng ?a, Hà N?i','0321452122','nguyenhoanghiep132@gmail.com','','',NULL,'Bình th??ng',NULL,'','Nguy?n Hoàng Hi?p',1,_binary '\0');
/*!40000 ALTER TABLE `khach_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_gia_ban`
--

DROP TABLE IF EXISTS `lich_su_gia_ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lich_su_gia_ban` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gia_ban` float DEFAULT NULL,
  `thoi_gian_bat_dau` datetime DEFAULT NULL,
  `thoi_gian_ket_thuc` datetime DEFAULT NULL,
  `don_vi_hang_hoa_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7srv85mfpjtuy19uf2cfv527g` (`don_vi_hang_hoa_id`),
  CONSTRAINT `FK7srv85mfpjtuy19uf2cfv527g` FOREIGN KEY (`don_vi_hang_hoa_id`) REFERENCES `don_vi_hang_hoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_gia_ban`
--

LOCK TABLES `lich_su_gia_ban` WRITE;
/*!40000 ALTER TABLE `lich_su_gia_ban` DISABLE KEYS */;
INSERT INTO `lich_su_gia_ban` VALUES (1,8000,'2020-05-30 00:00:00','2020-06-24 17:14:13',1),(3,50000,'2020-07-20 14:48:54','2020-09-07 17:22:45',2),(4,210000,'2020-07-10 11:09:33',NULL,3),(5,15000,'2020-07-20 14:43:38',NULL,5),(7,9500,'2020-07-10 17:17:02',NULL,1),(8,8000,'2020-07-20 14:13:17',NULL,9),(9,40000,'2020-07-10 11:03:24',NULL,10),(10,6000,'2020-06-01 08:41:18',NULL,11),(11,170000,'2020-06-01 08:41:22','2020-06-30 12:45:34',12),(12,180000,'2020-06-30 12:45:35',NULL,12),(13,200000,'2020-07-01 18:27:01',NULL,4),(14,50000,'2020-07-10 17:38:50',NULL,13),(15,38000,'2020-07-10 17:41:27',NULL,14),(16,60000,'2020-07-20 14:49:01',NULL,16),(17,30000,'2020-07-10 17:53:06',NULL,17),(18,7000,'2020-07-10 18:00:18',NULL,18),(19,20000,'2020-07-20 14:11:20',NULL,19),(20,10000,'2020-07-20 18:05:39',NULL,20),(21,50010,'2020-09-07 17:22:46',NULL,2);
/*!40000 ALTER TABLE `lich_su_gia_ban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ma_xac_nhan`
--

DROP TABLE IF EXISTS `ma_xac_nhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ma_xac_nhan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_token` varchar(255) DEFAULT NULL,
  `thoi_gian` bigint(20) DEFAULT NULL,
  `nguoi_dung_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd2202xdl2fybvwrj1m92stver` (`nguoi_dung_id`),
  CONSTRAINT `FKd2202xdl2fybvwrj1m92stver` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ma_xac_nhan`
--

LOCK TABLES `ma_xac_nhan` WRITE;
/*!40000 ALTER TABLE `ma_xac_nhan` DISABLE KEYS */;
/*!40000 ALTER TABLE `ma_xac_nhan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoi_dung` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bat_dau_lam_viec` date DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gioi_tinh` tinyint(4) DEFAULT NULL,
  `ho_va_ten` varchar(255) DEFAULT NULL,
  `ma_tai_khoan` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `muc_luong` double DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `tai_khoan` varchar(255) DEFAULT NULL,
  `thoi_gian_het_han` date DEFAULT NULL,
  `thoi_gian_hop_dong` varchar(255) DEFAULT NULL,
  `thoi_gian_khoi_tao` date DEFAULT NULL,
  `thoi_gian_kich_hoat` date DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `url_anh_dai_dien` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES (1,'2020-06-25','Đống Đa','hiep@gmail.com',NULL,'Nguyễn Hoàng Hiệp','NV-00001','943cf209045c1d7de76447e82285f0afbe36d29b963daecdbe6fcdf55e899060',NULL,'1999-02-13','0123456789','hiep',NULL,NULL,'2020-06-01','2020-06-15',0,NULL,_binary '\0','https://www.facebook.com/hoanghiep132/'),(2,'2020-06-20','Bách Khoa','quy@gmail.com',NULL,'Nguyễn Đức Quý','NV-00002','quy123456',NULL,'2002-07-13','0123456789','quy',NULL,NULL,'2020-06-01','2020-06-10',0,NULL,_binary '\0','https://www.facebook.com/quyhust'),(3,'2020-07-01','Bách Khoa','dung@gmail.com',NULL,'Trần Thùy Dung','NV-00003','dung123456',NULL,'1998-07-09','0123456789','dung',NULL,NULL,'2020-06-01','2020-06-15',0,NULL,_binary '\0','https://www.facebook.com/thuydung.tran.12139862');
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung_ca_lam_viec`
--

DROP TABLE IF EXISTS `nguoi_dung_ca_lam_viec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoi_dung_ca_lam_viec` (
  `ca_lam_viec_id` int(11) NOT NULL,
  `nguoi_dung_id` int(11) NOT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ca_lam_viec_id`,`nguoi_dung_id`),
  KEY `FK9leuv5ho5c70kuj8nw8i70vmv` (`nguoi_dung_id`),
  CONSTRAINT `FK9leuv5ho5c70kuj8nw8i70vmv` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `FKo617x9k8sal5q1md2qlhinerk` FOREIGN KEY (`ca_lam_viec_id`) REFERENCES `ca_lam_viec` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung_ca_lam_viec`
--

LOCK TABLES `nguoi_dung_ca_lam_viec` WRITE;
/*!40000 ALTER TABLE `nguoi_dung_ca_lam_viec` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoi_dung_ca_lam_viec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung_co_nhom_quyen`
--

DROP TABLE IF EXISTS `nguoi_dung_co_nhom_quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoi_dung_co_nhom_quyen` (
  `nguoi_dung_id` int(11) NOT NULL,
  `nhom_quyen_id` int(11) NOT NULL,
  KEY `FKsik8biblqoa9vc5tp3x4e3tx` (`nguoi_dung_id`),
  KEY `FK3781l3rdwq1a8tymhhy44gh8v` (`nhom_quyen_id`),
  CONSTRAINT `FK3781l3rdwq1a8tymhhy44gh8v` FOREIGN KEY (`nhom_quyen_id`) REFERENCES `nhom_quyen` (`id`),
  CONSTRAINT `FKsik8biblqoa9vc5tp3x4e3tx` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung_co_nhom_quyen`
--

LOCK TABLES `nguoi_dung_co_nhom_quyen` WRITE;
/*!40000 ALTER TABLE `nguoi_dung_co_nhom_quyen` DISABLE KEYS */;
/*!40000 ALTER TABLE `nguoi_dung_co_nhom_quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung_phong_ban_chuc_vu_vai_tro`
--

DROP TABLE IF EXISTS `nguoi_dung_phong_ban_chuc_vu_vai_tro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nguoi_dung_phong_ban_chuc_vu_vai_tro` (
  `nguoi_dung_id` int(11) NOT NULL,
  `phong_ban_id` int(11) NOT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `chuc_vu_id` int(11) DEFAULT NULL,
  `vai_tro_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`phong_ban_id`),
  KEY `FKchghi4rarsd13xm9an9bupg1f` (`phong_ban_id`),
  KEY `FK3plhdtcncu0yw9najvaimg0rx` (`chuc_vu_id`),
  KEY `FKlunw68oss45y0hdeka0lygqst` (`vai_tro_id`),
  CONSTRAINT `FK3plhdtcncu0yw9najvaimg0rx` FOREIGN KEY (`chuc_vu_id`) REFERENCES `chuc_vu` (`id`),
  CONSTRAINT `FK7ymv035fn8t1bbwl02xv91tpg` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `FKchghi4rarsd13xm9an9bupg1f` FOREIGN KEY (`phong_ban_id`) REFERENCES `phong_ban` (`id`),
  CONSTRAINT `FKlunw68oss45y0hdeka0lygqst` FOREIGN KEY (`vai_tro_id`) REFERENCES `vai_tro` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung_phong_ban_chuc_vu_vai_tro`
--

LOCK TABLES `nguoi_dung_phong_ban_chuc_vu_vai_tro` WRITE;
/*!40000 ALTER TABLE `nguoi_dung_phong_ban_chuc_vu_vai_tro` DISABLE KEYS */;
INSERT INTO `nguoi_dung_phong_ban_chuc_vu_vai_tro` VALUES (1,1,_binary '\0',4,1),(2,5,_binary '\0',1,2),(3,2,_binary '\0',3,1);
/*!40000 ALTER TABLE `nguoi_dung_phong_ban_chuc_vu_vai_tro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nha_cung_cap`
--

DROP TABLE IF EXISTS `nha_cung_cap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nha_cung_cap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia_chi` varchar(255) DEFAULT NULL,
  `dien_thoai` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT 'Không có',
  `ghi_chu` varchar(255) DEFAULT 'Không có',
  `ten` varchar(255) DEFAULT NULL,
  `tong_mua` float DEFAULT NULL,
  `tong_no` float DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nha_cung_cap`
--

LOCK TABLES `nha_cung_cap` WRITE;
/*!40000 ALTER TABLE `nha_cung_cap` DISABLE KEYS */;
INSERT INTO `nha_cung_cap` VALUES (1,'Bách Khoa','01234567','bk@gmail.com','Không có','Không có','BK',NULL,NULL,1,_binary '\0'),(2,'C9-407','0123123213','mpec@gmail.com','Không có','Không có','MPEC',NULL,NULL,1,_binary '\0'),(3,'Đống Đa','0966027102','hiep@gmail.com','Không có','Không có','Nguyễn Hoàng Hiệp',0,0,1,_binary '\0'),(4,'Hà Nội','012345678','sua@gmail.com','','','Nhà máy sữa milo',0,0,1,_binary '\0');
/*!40000 ALTER TABLE `nha_cung_cap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhom_hang`
--

DROP TABLE IF EXISTS `nhom_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhom_hang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_nhom_hang` varchar(255) DEFAULT NULL,
  `ten_nhom_hang` varchar(255) NOT NULL,
  `xoa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhom_hang`
--

LOCK TABLES `nhom_hang` WRITE;
/*!40000 ALTER TABLE `nhom_hang` DISABLE KEYS */;
INSERT INTO `nhom_hang` VALUES (1,'S','Sữa',0),(2,'NC','Nước Ngọt',0),(3,'BB','Bim Bim',0),(4,'MT','Mì tôm',0),(5,'DA','Dầu ăn',0),(6,'B','Bánh',0);
/*!40000 ALTER TABLE `nhom_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhom_quyen`
--

DROP TABLE IF EXISTS `nhom_quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhom_quyen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten_nhom_quyen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhom_quyen`
--

LOCK TABLES `nhom_quyen` WRITE;
/*!40000 ALTER TABLE `nhom_quyen` DISABLE KEYS */;
/*!40000 ALTER TABLE `nhom_quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhom_quyen_co_quyen`
--

DROP TABLE IF EXISTS `nhom_quyen_co_quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nhom_quyen_co_quyen` (
  `nhom_quyen_id` int(11) NOT NULL,
  `quyen_id` int(11) NOT NULL,
  KEY `FKm9g58q6dioi2v4o2t22yrwcip` (`quyen_id`),
  KEY `FKse46o1236qe9ssusumwp8a2vn` (`nhom_quyen_id`),
  CONSTRAINT `FKm9g58q6dioi2v4o2t22yrwcip` FOREIGN KEY (`quyen_id`) REFERENCES `quyen` (`id`),
  CONSTRAINT `FKse46o1236qe9ssusumwp8a2vn` FOREIGN KEY (`nhom_quyen_id`) REFERENCES `nhom_quyen` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhom_quyen_co_quyen`
--

LOCK TABLES `nhom_quyen_co_quyen` WRITE;
/*!40000 ALTER TABLE `nhom_quyen_co_quyen` DISABLE KEYS */;
/*!40000 ALTER TABLE `nhom_quyen_co_quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieu_khach_tra_chi_tiet`
--

DROP TABLE IF EXISTS `phieu_khach_tra_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phieu_khach_tra_chi_tiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `so_luong` int(11) DEFAULT NULL,
  `tong_tien` double DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `hoa_don_chi_tiet_id` int(11) DEFAULT NULL,
  `phieu_tra_khach_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsvlgfogn40m34vn4eow79sw3p` (`hoa_don_chi_tiet_id`),
  KEY `FKmlln5e3595m5gwcsv3mld7apu` (`phieu_tra_khach_id`),
  CONSTRAINT `FKmlln5e3595m5gwcsv3mld7apu` FOREIGN KEY (`phieu_tra_khach_id`) REFERENCES `phieu_tra_khach` (`id`),
  CONSTRAINT `FKsvlgfogn40m34vn4eow79sw3p` FOREIGN KEY (`hoa_don_chi_tiet_id`) REFERENCES `hoa_don_chi_tiet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_khach_tra_chi_tiet`
--

LOCK TABLES `phieu_khach_tra_chi_tiet` WRITE;
/*!40000 ALTER TABLE `phieu_khach_tra_chi_tiet` DISABLE KEYS */;
INSERT INTO `phieu_khach_tra_chi_tiet` VALUES (1,1,55000,_binary '\0',4,1),(2,2,56000,_binary '\0',5,1),(3,10,100000,_binary '\0',6,2),(4,2,110000,_binary '\0',7,2),(5,6,60000,_binary '\0',10,3),(6,1,180000,_binary '\0',11,3),(7,2,110000,_binary '\0',12,4),(8,4,112000,_binary '\0',13,4);
/*!40000 ALTER TABLE `phieu_khach_tra_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieu_nhap_hang`
--

DROP TABLE IF EXISTS `phieu_nhap_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phieu_nhap_hang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ma_phieu` varchar(255) DEFAULT NULL,
  `thoi_gian` datetime DEFAULT NULL,
  `tien_da_tra` double NOT NULL,
  `tien_phai_tra` double DEFAULT NULL,
  `tong_tien` double NOT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `nguoi_dung_id` int(11) DEFAULT NULL,
  `nha_cung_cap_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqbr078j08evewmdq1tisgi8ja` (`nguoi_dung_id`),
  KEY `FKn6dre043qotaubbmd8b8cbr3j` (`nha_cung_cap_id`),
  CONSTRAINT `FKn6dre043qotaubbmd8b8cbr3j` FOREIGN KEY (`nha_cung_cap_id`) REFERENCES `nha_cung_cap` (`id`),
  CONSTRAINT `FKqbr078j08evewmdq1tisgi8ja` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_nhap_hang`
--

LOCK TABLES `phieu_nhap_hang` WRITE;
/*!40000 ALTER TABLE `phieu_nhap_hang` DISABLE KEYS */;
INSERT INTO `phieu_nhap_hang` VALUES (23,'','PN-0007627','2020-07-09 08:53:18',7550000,0,7550000,2,_binary '\0',3,2),(24,'','PN-0008393','2020-07-09 08:54:27',9650000,0,9650000,2,_binary '\0',2,3),(25,'','PN-0006054','2020-07-09 12:48:52',4000000,0,4000000,2,_binary '\0',2,3),(27,'','PN-0007211','2020-07-10 10:41:29',5300000,0,5300000,2,_binary '\0',1,1),(28,'','PN-0007858','2020-07-20 15:11:55',100000,200000,300000,2,_binary '\0',1,2),(29,'','PN-0008560','2020-07-20 15:11:57',100000,200000,300000,2,_binary '\0',1,2),(30,'','PN-0007575','2020-07-20 15:12:01',100000,200000,300000,2,_binary '\0',1,2),(31,'','PN-0007300','2020-07-20 15:12:03',100000,200000,300000,2,_binary '\0',1,2),(32,'','PN-0001086','2020-07-20 15:12:08',100000,200000,300000,2,_binary '\0',1,2),(33,'','PN-0003557','2020-07-20 15:12:08',100000,200000,300000,2,_binary '\0',1,2),(34,'','PN-0009396','2020-07-20 15:12:08',100000,200000,300000,2,_binary '\0',1,2),(35,'','PN-0009895','2020-07-20 15:12:08',100000,200000,300000,2,_binary '\0',1,2),(36,'','PN-0001339','2020-07-20 15:12:13',100000,200000,300000,2,_binary '\0',1,2),(37,'','PN-0009334','2020-07-20 15:12:14',100000,200000,300000,2,_binary '\0',1,2),(38,'','PN-0008865','2020-07-20 15:12:14',100000,200000,300000,2,_binary '\0',1,2),(39,'','PN-0007309','2020-07-20 15:12:14',100000,200000,300000,2,_binary '\0',1,2),(40,'','PN-0009925','2020-07-20 15:12:14',100000,200000,300000,2,_binary '\0',1,2),(41,'','PN-0002157','2020-07-20 15:12:29',300000,0,300000,2,_binary '\0',1,2),(42,'','PN-0004743','2020-07-20 15:15:11',120000,0,120000,2,_binary '\0',1,3),(43,'','PN-0009815','2020-07-20 15:15:33',122000,0,122000,2,_binary '\0',1,3);
/*!40000 ALTER TABLE `phieu_nhap_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieu_nhap_hang_chi_tiet`
--

DROP TABLE IF EXISTS `phieu_nhap_hang_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phieu_nhap_hang_chi_tiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gia_nhap` float DEFAULT NULL,
  `so_luong` int(11) NOT NULL,
  `tong_tien` float NOT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `chi_nhanh_hang_hoa_id` int(11) DEFAULT NULL,
  `phieu_nhap_hang_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5mjil6et0vp9i5d5fwqg6cp3b` (`chi_nhanh_hang_hoa_id`),
  KEY `FKsgg87qo57dktrwaytdfp8ow2p` (`phieu_nhap_hang_id`),
  CONSTRAINT `FK5mjil6et0vp9i5d5fwqg6cp3b` FOREIGN KEY (`chi_nhanh_hang_hoa_id`) REFERENCES `chi_nhanh_hang_hoa` (`id`),
  CONSTRAINT `FKsgg87qo57dktrwaytdfp8ow2p` FOREIGN KEY (`phieu_nhap_hang_id`) REFERENCES `phieu_nhap_hang` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_nhap_hang_chi_tiet`
--

LOCK TABLES `phieu_nhap_hang_chi_tiet` WRITE;
/*!40000 ALTER TABLE `phieu_nhap_hang_chi_tiet` DISABLE KEYS */;
INSERT INTO `phieu_nhap_hang_chi_tiet` VALUES (5,5500,100,550000,_binary '\0',3,23),(6,7000,1000,7000000,_binary '\0',1,23),(7,7500,500,3750000,_binary '\0',1,24),(8,7000,200,1400000,_binary '\0',2,24),(9,4500,1000,4500000,_binary '\0',4,24),(10,7000,100,700000,_binary '\0',2,25),(11,5500,600,3300000,_binary '\0',3,25),(14,8000,100,800000,_binary '\0',2,27),(15,4500,1000,4500000,_binary '\0',4,27),(16,10000,10,100000,_binary '\0',2,28),(17,10000,10,100000,_binary '\0',4,28),(18,10000,10,100000,_binary '\0',2,29),(19,10000,10,100000,_binary '\0',4,29),(20,10000,10,100000,_binary '\0',2,30),(21,10000,10,100000,_binary '\0',4,30),(22,10000,10,100000,_binary '\0',2,31),(23,10000,10,100000,_binary '\0',4,31),(24,10000,10,100000,_binary '\0',2,32),(25,10000,10,100000,_binary '\0',4,32),(26,10000,10,100000,_binary '\0',2,33),(27,10000,10,100000,_binary '\0',4,33),(28,10000,10,100000,_binary '\0',2,34),(29,10000,10,100000,_binary '\0',4,34),(30,10000,10,100000,_binary '\0',2,35),(31,10000,10,100000,_binary '\0',4,35),(32,10000,10,100000,_binary '\0',2,36),(33,10000,10,100000,_binary '\0',4,36),(34,10000,10,100000,_binary '\0',2,37),(35,10000,10,100000,_binary '\0',4,37),(36,10000,10,100000,_binary '\0',2,38),(37,10000,10,100000,_binary '\0',4,38),(38,10000,10,100000,_binary '\0',2,39),(39,10000,10,100000,_binary '\0',4,39),(40,10000,10,100000,_binary '\0',2,40),(41,10000,10,100000,_binary '\0',4,40),(42,10000,10,100000,_binary '\0',2,41),(43,10000,10,100000,_binary '\0',4,41),(44,12000,10,120000,_binary '\0',2,42),(45,12000,10,120000,_binary '\0',2,43),(46,2000,1,2000,_binary '\0',3,43);
/*!40000 ALTER TABLE `phieu_nhap_hang_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieu_tra_hang_nhap`
--

DROP TABLE IF EXISTS `phieu_tra_hang_nhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phieu_tra_hang_nhap` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ly_do` varchar(255) DEFAULT NULL,
  `ma_phieu` varchar(255) DEFAULT NULL,
  `thoi_gian` datetime DEFAULT NULL,
  `tien_da_tra` double DEFAULT NULL,
  `tien_phai_tra` double DEFAULT NULL,
  `tong_tien` double DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `nguoi_dung_id` int(11) DEFAULT NULL,
  `nha_cung_cap_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi2kqwk2wbnom8mmwt83rxpde1` (`nguoi_dung_id`),
  KEY `FKhee8h6q2csltrxsv01jooy4fd` (`nha_cung_cap_id`),
  CONSTRAINT `FKhee8h6q2csltrxsv01jooy4fd` FOREIGN KEY (`nha_cung_cap_id`) REFERENCES `nha_cung_cap` (`id`),
  CONSTRAINT `FKi2kqwk2wbnom8mmwt83rxpde1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_tra_hang_nhap`
--

LOCK TABLES `phieu_tra_hang_nhap` WRITE;
/*!40000 ALTER TABLE `phieu_tra_hang_nhap` DISABLE KEYS */;
INSERT INTO `phieu_tra_hang_nhap` VALUES (1,NULL,'PTN-0009198','2020-07-09 23:17:20',7550000,7550000,7550000,1,_binary '\0',1,1);
/*!40000 ALTER TABLE `phieu_tra_hang_nhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieu_tra_hang_nhap_chi_tiet`
--

DROP TABLE IF EXISTS `phieu_tra_hang_nhap_chi_tiet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phieu_tra_hang_nhap_chi_tiet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `so_luong` int(11) DEFAULT NULL,
  `tong_tien` double DEFAULT NULL,
  `chi_nhanh_hang_hoa_id` int(11) DEFAULT NULL,
  `phieu_tra_hang_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6kf7vdv16swcndc68rk1tm0o1` (`chi_nhanh_hang_hoa_id`),
  KEY `FKed9t1mw48qukowlk5ees8u4ju` (`phieu_tra_hang_id`),
  CONSTRAINT `FK6kf7vdv16swcndc68rk1tm0o1` FOREIGN KEY (`chi_nhanh_hang_hoa_id`) REFERENCES `chi_nhanh_hang_hoa` (`id`),
  CONSTRAINT `FKed9t1mw48qukowlk5ees8u4ju` FOREIGN KEY (`phieu_tra_hang_id`) REFERENCES `phieu_tra_hang_nhap` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_tra_hang_nhap_chi_tiet`
--

LOCK TABLES `phieu_tra_hang_nhap_chi_tiet` WRITE;
/*!40000 ALTER TABLE `phieu_tra_hang_nhap_chi_tiet` DISABLE KEYS */;
INSERT INTO `phieu_tra_hang_nhap_chi_tiet` VALUES (1,100,550000,3,1),(2,1000,7000000,1,1);
/*!40000 ALTER TABLE `phieu_tra_hang_nhap_chi_tiet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieu_tra_khach`
--

DROP TABLE IF EXISTS `phieu_tra_khach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phieu_tra_khach` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `ly_do` varchar(255) DEFAULT NULL,
  `ma` varchar(255) DEFAULT NULL,
  `thoi_gian` datetime DEFAULT NULL,
  `tien_tra_khach` double DEFAULT NULL,
  `trang_thai` int(11) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `nhan_vien_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9fxmwqlvu8spk28cm34uxt710` (`nhan_vien_id`),
  CONSTRAINT `FK9fxmwqlvu8spk28cm34uxt710` FOREIGN KEY (`nhan_vien_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieu_tra_khach`
--

LOCK TABLES `phieu_tra_khach` WRITE;
/*!40000 ALTER TABLE `phieu_tra_khach` DISABLE KEYS */;
INSERT INTO `phieu_tra_khach` VALUES (1,'','Hết hạn sử dụng','PTK-0000011','2020-07-09 22:58:31',111000,1,_binary '\0',1),(2,'','Hết hạn sử dụng','PTK-0000208','2020-07-09 23:03:18',210000,1,_binary '\0',1),(3,'','Hết hạn sử dụng','PTK-0000031','2020-07-09 23:06:02',240000,1,_binary '\0',1),(4,'','Hết hạn sử dụng','PTK-0005265','2020-07-09 23:16:58',222000,1,_binary '\0',1);
/*!40000 ALTER TABLE `phieu_tra_khach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phong_ban`
--

DROP TABLE IF EXISTS `phong_ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phong_ban` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ma_phong_ban` varchar(255) DEFAULT NULL,
  `ten_phong_ban` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `chi_nhanh_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK62qg0iayhb7wjrosyws51dr3a` (`chi_nhanh_id`),
  CONSTRAINT `FK62qg0iayhb7wjrosyws51dr3a` FOREIGN KEY (`chi_nhanh_id`) REFERENCES `chi_nhanh` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phong_ban`
--

LOCK TABLES `phong_ban` WRITE;
/*!40000 ALTER TABLE `phong_ban` DISABLE KEYS */;
INSERT INTO `phong_ban` VALUES (1,'K-01','Kho',_binary '\0',1),(2,'TN-01','Thu ngân',_binary '\0',1),(3,'VC-01','Vận chuyển',_binary '\0',1),(4,'BV-01','Bảo vệ',_binary '\0',1),(5,'HC-01','Hành chính',_binary '\0',1);
/*!40000 ALTER TABLE `phong_ban` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quyen`
--

DROP TABLE IF EXISTS `quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quyen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten_quyen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quyen`
--

LOCK TABLES `quyen` WRITE;
/*!40000 ALTER TABLE `quyen` DISABLE KEYS */;
/*!40000 ALTER TABLE `quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_lieu_dinh_kem`
--

DROP TABLE IF EXISTS `tai_lieu_dinh_kem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tai_lieu_dinh_kem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duong_dan` varchar(255) DEFAULT NULL,
  `bao_cao_id` int(11) DEFAULT NULL,
  `thong_bao_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2ehl140arh072ey4x8k0il9a8` (`bao_cao_id`),
  KEY `FK9jylylituxgdcaoyww9v27ro1` (`thong_bao_id`),
  CONSTRAINT `FK2ehl140arh072ey4x8k0il9a8` FOREIGN KEY (`bao_cao_id`) REFERENCES `bao_cao` (`id`),
  CONSTRAINT `FK9jylylituxgdcaoyww9v27ro1` FOREIGN KEY (`thong_bao_id`) REFERENCES `thong_bao` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_lieu_dinh_kem`
--

LOCK TABLES `tai_lieu_dinh_kem` WRITE;
/*!40000 ALTER TABLE `tai_lieu_dinh_kem` DISABLE KEYS */;
/*!40000 ALTER TABLE `tai_lieu_dinh_kem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thong_bao`
--

DROP TABLE IF EXISTS `thong_bao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thong_bao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `da_nhan_phan_hoi` bit(1) DEFAULT NULL,
  `hinh_thuc_gui` int(11) DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `so_luong_don_vi_nhan` int(11) DEFAULT NULL,
  `thoi_gian_gui` datetime DEFAULT NULL,
  `tieu_de` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  `yeu_cau_phan_hoi` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thong_bao`
--

LOCK TABLES `thong_bao` WRITE;
/*!40000 ALTER TABLE `thong_bao` DISABLE KEYS */;
/*!40000 ALTER TABLE `thong_bao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thong_bao_nguoi_nhan`
--

DROP TABLE IF EXISTS `thong_bao_nguoi_nhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thong_bao_nguoi_nhan` (
  `thong_bao_id` int(11) NOT NULL,
  `nguoi_dung_id` int(11) NOT NULL,
  KEY `FKykkfi5pmad114hub3h72g924` (`nguoi_dung_id`),
  KEY `FKhcx36h6m9bcqf4b083t7eq2xc` (`thong_bao_id`),
  CONSTRAINT `FKhcx36h6m9bcqf4b083t7eq2xc` FOREIGN KEY (`thong_bao_id`) REFERENCES `thong_bao` (`id`),
  CONSTRAINT `FKykkfi5pmad114hub3h72g924` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thong_bao_nguoi_nhan`
--

LOCK TABLES `thong_bao_nguoi_nhan` WRITE;
/*!40000 ALTER TABLE `thong_bao_nguoi_nhan` DISABLE KEYS */;
/*!40000 ALTER TABLE `thong_bao_nguoi_nhan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuong_hieu`
--

DROP TABLE IF EXISTS `thuong_hieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thuong_hieu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten_thuong_hieu` varchar(255) NOT NULL,
  `xoa` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuong_hieu`
--

LOCK TABLES `thuong_hieu` WRITE;
/*!40000 ALTER TABLE `thuong_hieu` DISABLE KEYS */;
INSERT INTO `thuong_hieu` VALUES (1,'Milo',0),(2,'Coca',0),(3,'Poca',0),(4,'Omachi',0),(5,'Vinamilk',0),(6,'Simply',0),(7,'AFC',0),(8,'H?o H?o',0),(9,'Neptune',0),(10,'Chocopie',0);
/*!40000 ALTER TABLE `thuong_hieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tong_cong_ty`
--

DROP TABLE IF EXISTS `tong_cong_ty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tong_cong_ty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia_chi` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `ma_doanh_nghiep` varchar(255) DEFAULT NULL,
  `nguoi_dai_dien` varchar(255) DEFAULT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `ten_doanh_nghiep` varchar(255) DEFAULT NULL,
  `ten_tieng_anh` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tong_cong_ty`
--

LOCK TABLES `tong_cong_ty` WRITE;
/*!40000 ALTER TABLE `tong_cong_ty` DISABLE KEYS */;
INSERT INTO `tong_cong_ty` VALUES (1,'Bách Khoa, Hà Nội','bk@gmail.com',NULL,'DN-00001',NULL,'0966027102','MPEC','MPEC',NULL,_binary '\0');
/*!40000 ALTER TABLE `tong_cong_ty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trig`
--

DROP TABLE IF EXISTS `trig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trig`
--

LOCK TABLES `trig` WRITE;
/*!40000 ALTER TABLE `trig` DISABLE KEYS */;
INSERT INTO `trig` VALUES (1),(2),(3);
/*!40000 ALTER TABLE `trig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vai_tro`
--

DROP TABLE IF EXISTS `vai_tro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vai_tro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ten_vai_tro` varchar(255) DEFAULT NULL,
  `xoa` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vai_tro`
--

LOCK TABLES `vai_tro` WRITE;
/*!40000 ALTER TABLE `vai_tro` DISABLE KEYS */;
INSERT INTO `vai_tro` VALUES (1,'Nhân viên',_binary '\0'),(2,'Quản lý',_binary '\0');
/*!40000 ALTER TABLE `vai_tro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-16 19:48:33
