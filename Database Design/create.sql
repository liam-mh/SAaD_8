CREATE DATABASE PAMLDB08;
USE PAMLDB08;

CREATE TYPE Genre AS ENUM (
  'Fiction',
  'Non-Fiction',
  'Action',
  'Fantasy',
  'Biography',
  'Thriller',
  'History',
  'Educational',
  'Entertainment',
  'Art & Culture'
);

CREATE TYPE Type AS ENUM (
  'Book',
  'Journal',
  'CD',
  'DVD',
  'Game'
);

CREATE TYPE Role AS ENUM (
  'Librarian',
  'BranchManager',
  'Administrator',
  'CallCentreOperator',
  'Accountant',
  'PurchaseManager',
  'SystemAdministrator'
);

CREATE TABLE Media (
  MediaID INT PRIMARY KEY AUTO_INCREMENT,
  Type Type,
  Title VARCHAR(255),
  Description TEXT,
  PublishDate DATE,
  Author VARCHAR(225),
  Genre Genre,
  BranchID INT,
  FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
);

CREATE TABLE Branch (
  BranchID INT PRIMARY KEY AUTO_INCREMENT,
  FirstLineAddress VARCHAR(255),
  Postcode VARCHAR(20),
  City VARCHAR(100),
  OpeningHours VARCHAR(255)
);

CREATE TABLE Employee (
  EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
  FirstName VARCHAR(100),
  Surname VARCHAR(100),
  Email VARCHAR(255),
  Password VARCHAR(100),
  FirstLineAddress VARCHAR(225),
  City VARCHAR(100),
  Postcode VARCHAR(20),
  BranchID INT,
  Role Role,
  FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
);

CREATE TABLE User (
  UserID INT PRIMARY KEY AUTO_INCREMENT,
  FirstName VARCHAR(100),
  Surname VARCHAR(100),
  Email VARCHAR(255),
  Password VARCHAR(100),
  FirstLineAddress VARCHAR(255),
  City VARCHAR(100),
  Postcode VARCHAR(20),
  BranchID INT,
  RegisterDate DATE,
  FOREIGN KEY (BranchID) REFERENCES Branch(BranchID)
);

CREATE TABLE MediaRentalHistory (
  HistoryID INT PRIMARY KEY AUTO_INCREMENT,
  MediaID INT,
  UserID INT,
  BranchID INT,
  EmployeeID INT,
  Active BOOLEAN,
  RentStart DATE,
  RentEnd DATE,
  ActualReturn DATE,
  FOREIGN KEY (MediaID) REFERENCES Media(MediaID),
  FOREIGN KEY (UserID) REFERENCES User(UserID),
  FOREIGN KEY (BranchID) REFERENCES Branch(BranchID),
  FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE Wishlist (
  WishlistID INT PRIMARY KEY AUTO_INCREMENT,
  UserID INT,
  Title VARCHAR(255),
  Type Type,
  DateTime DATETIME,
  WishType ENUM('Wishlist','Reservation'),
  FOREIGN KEY (UserID) REFERENCES User(UserID)
); 

CREATE TABLE NewMediaRequest (
  RequestID INT PRIMARY KEY AUTO_INCREMENT,
  Title VARCHAR(255),
  Type Type,
  Reason VARCHAR(255),
  Date DATE,
  UserID INT,
  FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Subscriptions (
  SubscriptionID INT PRIMARY KEY AUTO_INCREMENT,
  TokenQuantity  INT,
  PricePerMonth DECIMAL(10, 2),
  OverduePricePerDay DECIMAL(10, 2)
);

CREATE TABLE UserSubscriptions (
  UserID INT PRIMARY KEY,
  SubscriptionID INT,
  SubscriptionDate DATE,
  TokenQuantity INT,
  OverdueDebt DECIMAL(10, 2),
  FOREIGN KEY (UserID) REFERENCES User(UserID),
  FOREIGN KEY (SubscriptionID) REFERENCES Subscriptions(SubscriptionID)
);

CREATE TABLE Payment (
  PaymentID INT PRIMARY KEY AUTO_INCREMENT,
  PaymentType ENUM('Card', 'PayPal', 'Klarna'),
  PaymentReason ENUM('Subscription', 'OverduePayment', 'Purchase'),
  Date DATE,
  UserID INT,
  Price DECIMAL(10, 2),
  EmployeeID INT,
  FOREIGN KEY (UserID) REFERENCES User(UserID),
  FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);