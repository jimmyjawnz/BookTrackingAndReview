CREATE DATABASE IF NOT EXISTS `booktracking_db`;
USE `booktracking_db`;

--
-- Drop tables in database
--
DROP TABLE IF EXISTS `listtobook`;
DROP TABLE IF EXISTS `booklists`;
DROP TABLE IF EXISTS `friends`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `books`;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Data for table `user`
--

-- INSERT INTO `user` VALUES
--	(1,'Leslie','Andrews','leslie@luv2code.com'),
--	(2,'Emma','Baumgarten','emma@luv2code.com'),
--	(3,'Avani','Gupta','avani@luv2code.com'),
--	(4,'Yuri','Petrov','yuri@luv2code.com'),
--	(5,'Juan','Vega','juan@luv2code.com');


--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `friendid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  PRIMARY KEY (`friendid`),
  CONSTRAINT FK_UserFriend FOREIGN KEY (userid)
      REFERENCES users(userid)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `bookid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(50) DEFAULT NULL,
  `year` int DEFAULT 1000,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`bookid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


--
-- Table structure for table `booklists`
--

CREATE TABLE `booklists` (
  `booklistid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `visibility` bit DEFAULT NULL, -- NULL -> private | 0 -> friends | 1 -> public
  PRIMARY KEY (`booklistid`),
  CONSTRAINT FK_UserBookList FOREIGN KEY (userid)
    REFERENCES users(userid)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


--
-- Table structure for table `listobook`
--

CREATE TABLE `listtobook` (
  `booktolistid` int NOT NULL AUTO_INCREMENT,
  `booklistid` int NOT NULL,
  `bookid` int NOT NULL,
  PRIMARY KEY (`booktolistid`),
  CONSTRAINT FK_BookListRelation FOREIGN KEY (booklistid)
    REFERENCES booklists(booklistid),
  CONSTRAINT FK_BookRelation FOREIGN KEY (bookid)
    REFERENCES books(bookid)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;