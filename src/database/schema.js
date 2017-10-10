CREATE TABLE `wines` (
    `title` varchar(45) NOT NULL,
    `vintage` int(4) NOT NULL,
    `country` varchar(20) NOT NULL,
    `region` varchar(45) NOT NULL,
    `score` int(2) NOT NULL,
    `review` varchar(300) NOT NULL,
    `brandName` varchar(45) NOT NULL,
    `type` varchar(45) NOT NULL,
    `description` varchar(300) NOT NULL,
    `image` varchar(300) NOT NULL,
    `id` varchar(150) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;


  CREATE TABLE `price` (
    `code` varchar(10) NOT NULL,
    `symbol` varchar(2) NOT NULL,
    `price` int(10) NOT NULL,
    `stockName` varchar(45) NOT NULL,
    `url` varchar(300) NOT NULL,
    `wineId` varchar(150) NOT NULL,
    `id` int(10) NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;