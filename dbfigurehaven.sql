-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2024 at 01:16 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbfigurehaven`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `anime` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `contact_number` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `number_of_items` int(11) NOT NULL,
  `shipping_fee` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `date_ordered` date NOT NULL DEFAULT current_timestamp(),
  `online_payment` varchar(5) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `product_name`, `anime`, `image`, `name`, `contact_number`, `email`, `address`, `username`, `price`, `number_of_items`, `shipping_fee`, `total`, `date_ordered`, `online_payment`, `status`) VALUES
(246, 78, 'Nezuko Kamado', 'Demon Slayer', 'http://localhost/action-figure/products-images/nezuko.jpg', 'Angelo Miguel Parungao', '09059738615', 'angeloparungao.ap@gmail.com', 'Sabang, Baliwag, Bulacan', 'Miguel', 53299, 1, 40, 53339, '2024-05-18', '', 'pending'),
(247, 78, 'Black Asta', 'Black Clover', 'http://localhost/action-figure/products-images/POP! BLACK ASTA (GLOW).png', 'Angelo Miguel Parungao', '09059738615', 'angeloparungao.ap@gmail.com', 'Sabang, Baliwag, Bulacan', 'Miguel', 1000, 1, 40, 1040, '2024-05-18', 'yes', 'pending'),
(249, 73, 'Nezuko Kamado', 'Demon Slayer', 'http://localhost/action-figure/products-images/nezuko.jpg', 'Clyde Mondero', '09923194842', 'clyde@gmail.com', 'Poblacion, Baliwag, Bulacan', 'clyde', 53299, 2, 40, 106638, '2024-05-18', 'yes', 'pending'),
(250, 71, 'Parade Chika Fujiwara', 'Kaguya-sama: Love is War', 'http://localhost/action-figure/products-images/Pop Up Parade Chika Fujiwara.jpg', 'Angel Shane Mangrobang', '09924046185', 'angelshane@gmail.com', 'Plaridel, Bulacan', 'angel_sheyyn', 1750, 1, 40, 1790, '2024-05-18', 'yes', 'pending'),
(251, 73, 'FATGUM (SLIM FORM)', 'My Hero Academia', 'http://localhost/action-figure/products-images/POP! FATGUM (SLIM FORM) box.png', 'Clyde Mondero', '09923194842', 'clyde@gmail.com', 'Poblacion, Baliwag, Bulacan', 'clyde', 688, 1, 40, 728, '2024-05-18', '', 'delivered'),
(252, 73, 'GON FREECSS (FISHING)', 'Hunter x Hunter', 'http://localhost/action-figure/products-images/POP! GON FREECSS (FISHING) box.png', 'Clyde Mondero', '09923194842', 'clyde@gmail.com', 'Poblacion, Baliwag, Bulacan', 'clyde', 1100, 1, 40, 1100, '2024-05-18', '', 'cart'),
(253, 73, 'YUNO WITH SPIRIT OF ZEPHYR', 'Black Clover', 'http://localhost/action-figure/products-images/POP! YUNO WITH SPIRIT OF ZEPHYR (GLOW) box.png', 'Clyde Mondero', '09923194842', 'clyde@gmail.com', 'Poblacion, Baliwag, Bulacan', 'clyde', 980, 1, 40, 1664, '2024-05-18', '', 'pending'),
(254, 78, 'SHIZUKU WITH BLINKY', 'Hunter x Hunter', 'http://localhost/action-figure/products-images/POP! SHIZUKU WITH BLINKY.png', 'Angelo Miguel Parungao', '09059738615', 'angeloparungao.ap@gmail.com', 'Sabang, Baliwag, Bulacan', 'Miguel', 500, 2, 40, 1000, '2024-05-18', '', 'cart'),
(255, 80, 'Nakano Nino Marine', 'Quintessential Quintuplets', 'http://localhost/action-figure/products-images/Nakano Nino Marine.jpg', 'Andrei John Poma', '09923194842', 'andrei@gmail.com', 'Ulingao, Baliwag, Bulacan', 'Pomski', 792, 2, 40, 1624, '2024-05-18', 'yes', 'pending'),
(256, 71, 'Sangoro in Wano outfit', 'One Piece', 'http://localhost/action-figure/products-images/POP! SANGORO IN WANO OUTFIT.png', 'Angel Shane Mangrobang', '09924046185', 'angelshane@gmail.com', 'Plaridel, Bulacan', 'angel_sheyyn', 683, 1, 40, 723, '2024-05-19', '', 'pending'),
(257, 71, 'Unif Ver. Marin Kitagawa', 'My Dress-Up Darling', 'http://localhost/action-figure/products-images/uniform ver. marin kitagawa.jpg', 'Angel Shane Mangrobang', '09924046185', 'angelshane@gmail.com', 'Plaridel, Bulacan', 'angel_sheyyn', 7750, 1, 40, 7790, '2024-05-19', 'yes', 'pending'),
(258, 80, 'GON FREECSS (FISHING)', 'Hunter x Hunter', 'http://localhost/action-figure/products-images/POP! GON FREECSS (FISHING) box.png', 'Andrei John Poma', '09923194842', 'andrei@gmail.com', 'Ulingao, Baliwag, Bulacan', 'Pomski', 1100, 1, 40, 1140, '2024-05-19', 'yes', 'pending'),
(259, 80, 'Monkey D. Luffy Gear 4', 'One Piece', 'http://localhost/action-figure/products-images/gear four.jpg', 'Andrei John Poma', '09923194842', 'andrei@gmail.com', 'Ulingao, Baliwag, Bulacan', 'Pomski', 3845, 1, 40, 3885, '2024-05-19', '', 'pending'),
(261, 71, 'Rorono Zoro', 'One Piece', 'http://localhost/action-figure/products-images/POP! RORONOA ZORO (GLOW).png', 'Angel Shane Mangrobang', '09924046185', 'angelshane@gmail.com', 'Plaridel, Bulacan', 'angel_sheyyn', 853, 1, 40, 893, '2024-05-19', '', 'cart');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `profile` varchar(100) NOT NULL,
  `user_fullname` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contact_number` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `account_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `profile`, `user_fullname`, `address`, `email`, `contact_number`, `username`, `password`, `account_type`) VALUES
(71, 'http://localhost/action-figure/user-profile/435444881_951750389738489_5640510130736340859_n.jpg', 'Angel Shane Mangrobang', 'Plaridel, Bulacan', 'angelshane@gmail.com', '09924046185', 'angel_sheyyn', 'mangrobang', 'user'),
(73, 'http://localhost/action-figure/user-profile/default.png', 'Clyde Mondero', 'Poblacion, Baliwag, Bulacan', 'clyde@gmail.com', '09923194842', 'clyde', 'mondero', 'user'),
(78, 'http://localhost/action-figure/user-profile/IMG_2672.jpg', 'Angelo Miguel Parungao', 'Sabang, Baliwag, Bulacan', 'angeloparungao.ap@gmail.com', '09059738615', 'Miguel', 'parungao', 'user'),
(79, 'http://localhost/action-figure/user-profile/default.png', 'Administrator', 'Baliwag,Bulacan', 'figureHaven.admin@gmail.com', '09367898762', 'Admin', 'administration', 'admin'),
(80, 'http://localhost/action-figure/user-profile/Untitled (800 x 600 px) (1).png', 'Andrei John Poma', 'Ulingao, Baliwag, Bulacan', 'andrei@gmail.com', '09923194842', 'Pomski', 'niggerako', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
