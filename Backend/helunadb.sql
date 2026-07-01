-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2026 at 02:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helunadb`
-- Table structure for table `appointments`
CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `booking_type` enum('personal','gift') NOT NULL,
  `service_name` text DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `recipient_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `message_content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'Confirmed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `contact_messages`
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `message_content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Dumping data for table `appointments`
INSERT INTO `appointments` (`id`, `booking_type`, `service_name`, `appointment_date`, `appointment_time`, `full_name`, `recipient_name`, `phone_number`, `email_address`, `message_content`, `created_at`, `status`) VALUES
(1, 'gift', 'Relax Day Package', '2026-05-06', '12:00:00', 'Lina', 'Hanan', 'N/A', 'N/A', 'Enjoy!!', '2026-05-05 23:26:27', 'Confirmed'),
(2, 'personal', 'Hair Coloring - 400 - 900 ⃁', '2027-12-02', '14:22:00', 'Hanan', NULL, '0512345678', 'Hanan@gmail.com', '', '2026-05-05 23:27:50', 'Confirmed'),
(3, 'personal', 'Curly Styling - 150 - 300 ⃁', '0026-10-05', '17:00:00', 'Hanan ', NULL, '0541422783', 'Hanan@gmail.com', 'Do you use a diffuser or heat ?', '2026-05-05 23:32:06', 'Confirmed'),
(4, 'personal', 'Full Body Massage - 350 ⃁', '2026-10-05', '08:37:00', 'Lina', NULL, '0564636220', 'Lno@gmail.com', 'can i request medium pressure ?', '2026-05-05 23:34:12', 'Confirmed'),
(5, 'personal', 'Bridal Makeup - 800 - 1500 ⃁', '2026-10-05', '14:30:00', 'ليان الحارثي', NULL, '0512345567', 'Layan@gmail.com', '', '2026-05-05 23:35:42', 'Confirmed'),
(6, 'personal', 'Gold Facial - 500 ⃁', '2026-10-05', '08:42:00', 'مروة الغامدي', NULL, '0512345678', 'Memo@gmail.com', 'يناسب البشره الحساسه ؟', '2026-05-05 23:36:57', 'Confirmed'),
(7, 'gift', 'Relax Day Package', '2026-05-06', '12:00:00', 'w', 'q', '0564636602', 'N/A', '22', '2026-05-06 00:01:04', 'Confirmed'),
(8, 'personal', 'Balayage / Ombre - 600 - 1200 ⃁', '2029-03-04', '18:06:00', 'لينا السلمي', NULL, '0564636220', 'umsltt@gmail.com', '', '2026-05-06 00:02:16', 'Confirmed'),
(9, 'personal', 'Balayage / Ombre - 600 - 1200 ⃁', '2025-03-31', '14:20:00', 'أم سلطاان', NULL, '0564636220', 'umsltt@gmail.com', '', '2026-05-06 00:02:49', 'Canceled'),
(10, 'personal', 'Hair Styling - 150 - 300 ⃁', '2026-07-05', '21:00:00', 'sozan', NULL, '0512312345', 'sozy@gmail.com', '', '2026-05-06 00:41:07', 'Canceled'),
(11, 'personal', 'Hair Coloring - 400 - 900 ⃁', '2026-08-07', '21:09:00', 'لينا السلمي', NULL, '0564636220', 'umsltt@gmail.com', '', '2026-05-06 15:24:33', 'Confirmed'),
(39, 'personal', 'General Service', '2026-02-09', '20:08:00', 'lno', NULL, '0512345678', 'Lno@gmail.com', '', '2026-05-06 16:55:56', 'Confirmed'),
(40, 'gift', 'Relax Day Package', '2026-05-06', '12:00:00', 'l', 'l', '051234678', 'N/A', 'enjooooy ', '2026-05-06 17:51:08', 'Confirmed'),
(41, 'gift', 'Relax Day Package', '2026-05-06', '12:00:00', 'Fatima', 'Mimi', '0564636602', 'N/A', 'enjoy your relaxing day Mimi💖!', '2026-05-06 17:55:27', 'Confirmed');

-- Dumping data for table `contact_messages`
INSERT INTO `contact_messages` (`id`, `first_name`, `last_name`, `gender`, `mobile`, `dob`, `email`, `language`, `message_content`, `created_at`) VALUES
(1, 'Fatima', 'Ahmad', 'Female', '0512312312', '2003-12-02', 'fatoom@gmail.com', 'English', 'do u have private parking lot ?', '2026-05-06 23:43:50'),
(2, 'Dana ', 'Bandar', 'Female', '0520262026', '2007-01-08', 'dandon@gmail.com', 'English', 'Do you have special services for graduates ?', '2026-05-06 23:47:02'),
(3, 'Soso ', 'Abduallah ', 'Female', '0577789363', '1990-01-02', 'sosoaaa@gmail.com', 'English', 'do you have kids area in the salon ?', '2026-05-06 23:49:28'),
(4, 'Afaf', 'Abduallah', 'Female', '0599832468', '1992-01-02', 'AfafA@gmail.com', 'English', 'do you offer home services ?', '2026-05-06 23:50:32'),
(5, 'Lina ', 'Sultan', 'Female', '0564636220', '2004-01-13', 'Lno@gmail.com', 'English', 'Do you offer VIP rooms ?', '2026-05-06 23:51:42'),
(6, 'Jojo', 'Alsulami', 'Female', '0544543786', '1981-01-02', 'Jojo@gmail.com', 'English', 'Is valet parking available ???', '2026-05-06 23:52:53'),
(7, 'Hanan', 'Wael', 'Female', '0564636220', '2004-07-25', 'Hanan@gmail.com', 'English', 'Do you use luxury hair products ', '2026-05-06 23:54:14'),
(8, 'Ahmad', 'Abduallah', 'Male', '0532146892', '1995-02-10', 'Ahmad@gmail.com', 'English', 'Can I arrange a birthday surprise for my wife ? 🧐', '2026-05-06 23:57:39'),
(9, 'Hanay', 'K', 'Female', '0564738212', '2005-01-03', 'Hanoty2026@gmail.com', 'English', 'Do u serve coffee or refreshments ?', '2026-05-07 00:01:50'),
(10, 'Alzain', 'K', 'Female', '0537829372', '2008-03-03', 'zinooo@gmail.com', 'English', 'Do you use organic products 😬?', '2026-05-07 00:03:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
