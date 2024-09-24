CREATE DATABASE `mon_repo`;
USE `mon_repo`;

CREATE TABLE `repo` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `url` VARCHAR(45) NOT NULL,
)
CREATE TABLE `repo_Statut` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `statu` VARCHAR(45) NOT NULL,
)
CREATE TABLE `langages` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name_langages` VARCHAR(45) NOT NULL,
)
CREATE TABLE `commentaire` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `texte` VARCHAR(600) NOT NULL,
    
)
CREATE TABLE `repo_langage` (
    `repo_id` INT NOT NULL,
    `langage_id` INT NOT NULL,
    PRIMARY KEY (`repo_id`, `langage_id`),
    FOREIGN KEY (`repo_id`) 
    REFERENCES `mon_repo`.`repo`(`id`) 
    ON DELETE CASCADE,
    FOREIGN KEY (`langage_id`) 
    REFERENCES `mon_repo`.`langages`(`id`) 
    ON DELETE CASCADE,
)