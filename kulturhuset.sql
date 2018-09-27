-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2018 at 12:26 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `kulturhuset`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountlevel`
--

CREATE TABLE IF NOT EXISTS `accountlevel` (
  `id` int(11) NOT NULL,
  `rights` varchar(10) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accountlevel`
--

INSERT INTO `accountlevel` (`id`, `rights`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL,
  `lastname` varchar(15) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `fk_accountlevel` int(11) NOT NULL DEFAULT '2'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `lastname`, `email`, `phone`, `username`, `password`, `fk_accountlevel`) VALUES
(1, 'mantas', 'akilanas', 'mantas2630@hotmail.com', 60316611, 'mantarias', '1234', 1),
(2, 'Frank', 'Goldman', 'afdasfasd@gasdf.com', 12345678, 'frank', '1234', 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'film'),
(2, 'teater'),
(3, 'koncerter'),
(4, 'udstillinger '),
(5, 'foredrag');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `time` date NOT NULL,
  `duration` int(11) NOT NULL,
  `fk_room` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `fk_category` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `time`, `duration`, `fk_room`, `price`, `fk_category`, `timestamp`) VALUES
(1, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 09:27:24'),
(2, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:26'),
(3, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:31'),
(4, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:33'),
(5, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:35'),
(6, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:36'),
(7, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:37'),
(8, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:38'),
(9, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:38'),
(10, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:39'),
(11, 'test', '2018-04-03', 120, 1, 120, 1, '2018-04-18 12:58:40'),
(12, 'asdf', '2018-04-04', 123, 1, 123, 5, '2018-04-20 07:05:24');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `rows` int(11) NOT NULL,
  `seats` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`, `rows`, `seats`) VALUES
(1, 'sal1', 5, 20),
(2, 'sal2', 10, 20);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(11) NOT NULL,
  `fk_events` int(11) NOT NULL,
  `fk_account` int(11) NOT NULL,
  `seat` int(11) NOT NULL,
  `row` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `fk_events`, `fk_account`, `seat`, `row`) VALUES
(1, 1, 1, 2, 2),
(4, 1, 1, 11, 2),
(5, 1, 1, 7, 1),
(6, 1, 1, 8, 3),
(7, 1, 1, 9, 3),
(8, 1, 1, 10, 3),
(9, 1, 1, 11, 3),
(10, 1, 1, 12, 3),
(11, 1, 1, 3, 5),
(12, 1, 1, 4, 5),
(13, 1, 1, 5, 5),
(14, 1, 1, 16, 1),
(15, 1, 1, 17, 1),
(16, 1, 1, 18, 1),
(17, 1, 1, 19, 1),
(18, 1, 1, 20, 1),
(19, 1, 1, 16, 3),
(20, 1, 1, 17, 3),
(21, 1, 1, 18, 3),
(22, 1, 2, 13, 3),
(23, 5, 2, 7, 2),
(24, 12, 1, 8, 3),
(25, 12, 1, 9, 2),
(26, 12, 1, 9, 2),
(27, 2, 1, 6, 2),
(28, 12, 1, 4, 2),
(29, 12, 1, 11, 3),
(30, 5, 1, 11, 2),
(31, 5, 1, 11, 2),
(32, 5, 1, 12, 3),
(33, 5, 1, 8, 3),
(34, 5, 1, 10, 4),
(35, 5, 1, 5, 4),
(36, 5, 1, 4, 3),
(37, 12, 1, 1, 1),
(38, 12, 1, 1, 1),
(39, 12, 1, 2, 1),
(40, 12, 1, 2, 1),
(41, 12, 1, 3, 1),
(42, 12, 1, 3, 1),
(43, 12, 1, 1, 4),
(44, 12, 1, 1, 4),
(45, 12, 1, 2, 4),
(46, 12, 1, 2, 4),
(47, 12, 1, 3, 4),
(48, 12, 1, 3, 4),
(49, 12, 1, 4, 4),
(50, 12, 1, 4, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountlevel`
--
ALTER TABLE `accountlevel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_accountlevel` (`fk_accountlevel`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_category` (`fk_category`), ADD KEY `fk_room` (`fk_room`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_account` (`fk_account`), ADD KEY `fk_events` (`fk_events`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountlevel`
--
ALTER TABLE `accountlevel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=51;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`fk_accountlevel`) REFERENCES `accountlevel` (`id`);

--
-- Constraints for table `events`
--
ALTER TABLE `events`
ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`fk_category`) REFERENCES `category` (`id`),
ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`fk_room`) REFERENCES `room` (`id`);

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`fk_account`) REFERENCES `accounts` (`id`),
ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`fk_events`) REFERENCES `events` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
