-- phpMyAdmin SQL Dump
-- version 3.3.10.4
-- http://www.phpmyadmin.net
--
-- Host: lunchboxdb.thelunchboxcontains.me
-- Generation Time: Sep 23, 2012 at 03:38 PM
-- Server version: 5.1.56
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lunchboxdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `ExtensionTest`
--

CREATE TABLE IF NOT EXISTS `ExtensionTest` (
  `TutorialDomain` varchar(150) NOT NULL,
  `ElementID` varchar(50) NOT NULL,
  `ContentType` varchar(50) NOT NULL,
  `Key` int(120) NOT NULL AUTO_INCREMENT,
  `TutorialName` varchar(50) NOT NULL,
  `ViewType` varchar(50) NOT NULL,
  `ContentValue` varchar(300) NOT NULL,
  `StepHeader` varchar(75) NOT NULL,
  `Order` int(10) NOT NULL,
  UNIQUE KEY `Key` (`Key`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `ExtensionTest`
--

INSERT INTO `ExtensionTest` (`TutorialDomain`, `ElementID`, `ContentType`, `Key`, `TutorialName`, `ViewType`, `ContentValue`, `StepHeader`, `Order`) VALUES
('www.google.com', 'gbqff', 'url', 1, 'Google', '', '', '', 0),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'orderedlist', 'CSS', 2, 'James1', 'NONE', 'red', 'Set Background Red', 3),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'orderedlist2', 'CSS', 3, 'James1', 'NONE', 'blue', 'Set Text Blue', 2),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'first', 'VIDEO', 6, 'James1', 'MODAL', 'http://www.youtube.com/embed/K94b4buRNFE', 'Show Video in Modal', 1),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'first', 'VIDEO', 7, 'James4', 'MODAL', 'http://www.youtube.com/embed/oHg5SJYRHA0', '', 2),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'orderedlist2', 'CSS', 5, 'James4', 'NONE', 'red', '', 1),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'first', 'URL', 8, 'PopOver', 'POPOVER', 'http://thelunchboxcontains.me/ExtensionTest/Tutorial1.html', '', 0),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'first', 'VIDEO', 9, 'URL test in Modal', 'MODAL', 'http://thelunchboxcontains.me/ExtensionTest/Tutorial1.html', '', 0),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'first', 'VIDEO', 10, 'Two Videos Same Time', 'MODAL', 'http://www.youtube.com/embed/K94b4buRNFE', '', 0),
('http://tsylatac.mooo.com:8080/lunchbox/starterkit.html', 'reset', 'VIDEO', 11, 'Two Videos Same Time', 'MODAL', 'http://www.youtube.com/embed/oHg5SJYRHA0', '', 0);
