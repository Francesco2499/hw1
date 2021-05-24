-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 24, 2021 alle 10:48
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ospedale`
--

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `dati`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `dati` (
`username` varchar(20)
,`nome` varchar(20)
,`cognome` varchar(20)
,`data_nascita` date
,`email` varchar(30)
,`CF` varchar(30)
,`cod` varchar(20)
,`vaccino` varchar(20)
);

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `dati_ticket`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `dati_ticket` (
`username` varchar(20)
,`nome` varchar(20)
,`cognome` varchar(20)
,`email` varchar(30)
,`codTicket` varchar(20)
,`cellulare` varchar(20)
,`Data` date
,`orario` time
);

-- --------------------------------------------------------

--
-- Struttura della tabella `evidenza`
--

CREATE TABLE `evidenza` (
  `id` int(11) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `servizio` varchar(20) NOT NULL,
  `immagine` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `ticket`
--

CREATE TABLE `ticket` (
  `codTicket` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `Cellulare` varchar(20) DEFAULT NULL,
  `Data` date DEFAULT NULL,
  `orario` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `ticket`
--

INSERT INTO `ticket` (`codTicket`, `username`, `Cellulare`, `Data`, `orario`) VALUES
('KT9UAX5K3D', 'ProvaWP', '3339884819', '2021-05-28', '16:00:00');

--
-- Trigger `ticket`
--
DELIMITER $$
CREATE TRIGGER `CheckDate` BEFORE INSERT ON `ticket` FOR EACH ROW begin 
 declare msg varchar(255);
set msg= concat("Data non valida!");
         if (new.Data<=(select current_date))
then signal sqlstate "45000" set message_text= msg;
end if;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `username` varchar(20) NOT NULL,
  `password` varchar(80) DEFAULT NULL,
  `nome` varchar(20) DEFAULT NULL,
  `cognome` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `data` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`username`, `password`, `nome`, `cognome`, `email`, `data`) VALUES
('ProvaWP', '$2y$10$HU.jWXjU/siQ3sUUx7sqIew/Ko5wzlYJwiFkKbDFcuBDIi9RGii9e', 'Francesco', 'Denaro', '24maggio1999@gmail.com', '1999-05-24'), 
('ProvaWP1', '$2y$10$Sefkiyz7PRAqSBnieK.7N.U3P0dApe3NjZSfkGE7cq.4.HBfqq0qq', 'Francesco', 'Denaro', 'ProvaWP1@gmail.com', '1999-05-24');
/*password entrambe : 12345678;*/

-- --------------------------------------------------------

--
-- Struttura della tabella `vaccinazioni`
--

CREATE TABLE `vaccinazioni` (
  `codprenotazione` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `CodiceFiscale` varchar(30) DEFAULT NULL,
  `vaccino` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `vaccinazioni`
--

INSERT INTO `vaccinazioni` (`codprenotazione`, `username`, `CodiceFiscale`, `vaccino`) VALUES
('nMLrOTsc', 'ProvaWP', 'DNRFNC99E24F258J', 'AstraZeneca');

--
-- Trigger `vaccinazioni`
--
DELIMITER $$
CREATE TRIGGER `AggiornaDosi` AFTER INSERT ON `vaccinazioni` FOR EACH ROW begin 
          update vaccino set dosi= dosi-1 where vaccino=new.vaccino;

end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `AggiornaDosi_1` AFTER DELETE ON `vaccinazioni` FOR EACH ROW begin 
          update vaccino set dosi= dosi+1 where vaccino=old.vaccino;

end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `CheckDosi` BEFORE INSERT ON `vaccinazioni` FOR EACH ROW begin 
 declare msg varchar(255);
set msg= concat("Dosi esaurite!");
         if((select dosi from vaccino where vaccino=new.vaccino)=0)
then signal sqlstate "45000" set message_text= msg;
end if;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `CheckPrenotazione` BEFORE INSERT ON `vaccinazioni` FOR EACH ROW begin 
 declare msg varchar(255);
set msg= concat("Gia prenotato!");
         if exists (select * from vaccinazioni where username=new.username or codprenotazione=new.codprenotazione)
then signal sqlstate "45000" set message_text= msg;
end if;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `vaccino`
--

CREATE TABLE `vaccino` (
  `vaccino` varchar(20) NOT NULL,
  `dosi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `vaccino`
--

INSERT INTO `vaccino` (`vaccino`, `dosi`) VALUES
('AstraZeneca', 42),
('Moderna', 42),
('Pfizer', 49);

-- --------------------------------------------------------

--
-- Struttura per vista `dati`
--
DROP TABLE IF EXISTS `dati`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dati`  AS SELECT `u`.`username` AS `username`, `u`.`nome` AS `nome`, `u`.`cognome` AS `cognome`, `u`.`data` AS `data_nascita`, `u`.`email` AS `email`, `v`.`CodiceFiscale` AS `CF`, `v`.`codprenotazione` AS `cod`, `v`.`vaccino` AS `vaccino` FROM (`user` `u` join `vaccinazioni` `v` on(`u`.`username` = `v`.`username`)) ;

-- --------------------------------------------------------

--
-- Struttura per vista `dati_ticket`
--
DROP TABLE IF EXISTS `dati_ticket`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `dati_ticket`  AS SELECT `u`.`username` AS `username`, `u`.`nome` AS `nome`, `u`.`cognome` AS `cognome`, `u`.`email` AS `email`, `t`.`codTicket` AS `codTicket`, `t`.`Cellulare` AS `cellulare`, `t`.`Data` AS `Data`, `t`.`orario` AS `orario` FROM (`user` `u` join `ticket` `t` on(`u`.`username` = `t`.`username`)) ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `evidenza`
--
ALTER TABLE `evidenza`
  ADD PRIMARY KEY (`username`,`servizio`,`immagine`),
  ADD KEY `idx_user` (`username`);

--
-- Indici per le tabelle `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`codTicket`,`username`),
  ADD KEY `username` (`username`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- Indici per le tabelle `vaccinazioni`
--
ALTER TABLE `vaccinazioni`
  ADD PRIMARY KEY (`codprenotazione`,`username`),
  ADD KEY `idx_user` (`username`),
  ADD KEY `idx_vacc` (`vaccino`);

--
-- Indici per le tabelle `vaccino`
--
ALTER TABLE `vaccino`
  ADD PRIMARY KEY (`vaccino`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `evidenza`
--
ALTER TABLE `evidenza`
  ADD CONSTRAINT `evidenza_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON UPDATE CASCADE;

--
-- Limiti per la tabella `vaccinazioni`
--
ALTER TABLE `vaccinazioni`
  ADD CONSTRAINT `vaccinazioni_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `vaccinazioni_ibfk_2` FOREIGN KEY (`vaccino`) REFERENCES `vaccino` (`vaccino`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
