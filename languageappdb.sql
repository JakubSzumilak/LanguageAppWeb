-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 27, 2024 at 01:21 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `languageappdb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `terms`
--

CREATE TABLE `terms` (
  `ID` int(11) NOT NULL,
  `term` varchar(40) NOT NULL,
  `translation` varchar(40) NOT NULL,
  `example` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`ID`, `term`, `translation`, `example`) VALUES
(1, 'yes', 'tak', NULL),
(2, 'no', 'nie', NULL),
(3, 'maybe', 'może', NULL),
(4, 'who', 'kto', NULL),
(5, 'where', 'gdzie', NULL),
(6, 'whom', 'kogo', NULL),
(7, 'when', 'kiedy', NULL),
(8, 'why', 'dlaczego', NULL),
(9, 'what', 'co', NULL),
(10, 'for', 'dla', NULL),
(11, 'dog', 'pies', NULL),
(12, 'cat', 'kot', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(40) NOT NULL,
  `image` varchar(50) NOT NULL,
  `bIsAdmin` tinyint(1) DEFAULT 0,
  `weakestTermID` int(11) DEFAULT NULL,
  `strongestTermID` int(11) DEFAULT NULL,
  `timeSpent` bigint(20) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `login`, `password`, `email`, `image`, `bIsAdmin`, `weakestTermID`, `strongestTermID`, `timeSpent`) VALUES
(2, 'user01', '$2y$10$e9D4qzZEs6oJTx0REpqfpO48YRWYniY0oWpYJ3hO0WNr/5ct01J6u', 'mail01@gmail.com', '', 0, NULL, NULL, 391),
(3, 'user02', '$2y$10$8QxXRqYu8125Ht95A1qpYuafhED7ckfdxKga4fhUIc5LJvGZ/qZsm', 'mail02@gmail.com', '', 0, NULL, NULL, 0),
(4, 'user03', '$2y$10$nJoJCZuIOdHZ66lkou6gHeD86bDmE8y5dbxZOc8TkmeAIfzd.W5Cm', 'mail03@gmail.com', '', 0, NULL, NULL, 0),
(5, 'testowy', '$2y$10$2192870HxEftEI2uPrhD4O9QCQnjis7MXv2F34AImzsTsmymherD6', 'test@gmail.com', '', 0, NULL, NULL, 0),
(6, 'testowy3', '$2y$10$7mu7peur84Oy7e1LexUSw.dsnNXAB90XfJeoHkVF//RCQZ4LVUdIW', 'test3@gmail.com', '', 0, NULL, NULL, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
