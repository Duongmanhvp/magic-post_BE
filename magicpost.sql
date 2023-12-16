-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th10 28, 2023 lúc 04:37 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `magicpost`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `acc_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `roles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `locations`
--

CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `account_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `location1` int(11) NOT NULL,
  `location2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `parcels`
--

CREATE TABLE `parcels` (
  `parcel_id` int(11) NOT NULL,
  `record_date` date NOT NULL,
  `customer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `location1` (`location1`),
  ADD KEY `location2` (`location2`);

--
-- Chỉ mục cho bảng `parcels`
--
ALTER TABLE `parcels`
  ADD PRIMARY KEY (`parcel_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Các ràng buộc cho bảng `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Các ràng buộc cho bảng `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`location1`) REFERENCES `locations` (`location_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`location2`) REFERENCES `locations` (`location_id`);

--
-- Các ràng buộc cho bảng `parcels`
--
ALTER TABLE `parcels`
  ADD CONSTRAINT `parcels_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
