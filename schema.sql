DROP TABLE IF EXISTS `devices`;

CREATE TABLE `devices` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `device_token` varchar(255) NOT NULL UNIQUE,
    `position` point NULL,
    `created_at` timestamp NOT NULL,
    `updated_at` timestamp NOT NULL
);

DROP TABLE IF EXISTS `cameras`;

CREATE TABLE `cameras` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `address` varchar(255) NOT NULL,
    `position` point NOT NULL,
    `name` varchar(255) NOT NULL,
    `created_at` timestamp NOT NULL,
    `updated_at` timestamp NOT NULL
);

DROP TABLE IF EXISTS `reports`;

CREATE TABLE `reports` (
    `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `reported_at` datetime NOT NULL,
    `position` point NOT NULL,
    `address` varchar(255) NOT NULL,
    `created_at` timestamp NOT NULL,
    `updated_at` timestamp NOT NULL
);
