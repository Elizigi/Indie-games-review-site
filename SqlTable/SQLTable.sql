create database if not exists mini_steam;
use mini_steam;


create table users(
    user_id int AUTO_INCREMENT primary key,
    user_name varchar(50) not null ,
    user_email varchar(50) no null unique,
    user_password varchar(60) not null,
    user_role ENUM('admin', 'developer', 'user') NOT NULL
);
create table games(
    game_id int AUTO_INCREMENT primary key,
    game_name varchar(50) not null ,
    game_developer varchar(50) not null ,
    game_description VARCHAR(255) no null unique,
    game_genre ENUM(
     'action',
     'adventure',
     'rpg',
     'shooter',
     'platformer',
     'simulation',
     'strategy',
     'sports',
     'racing',
     'puzzle',
     'horror',
     'sandbox',
     'fighting'
        ) NOT NULL,
    game_release_date DATE NOT NULL DEFAULT CURRENT_DATE,
    game_role 
)