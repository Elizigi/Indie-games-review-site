CREATE DATABASE IF NOT EXISTS mini_steam;
USE mini_steam;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(60) NOT NULL,
    user_role ENUM('admin', 'developer', 'user') NOT NULL
);

CREATE TABLE games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(50) NOT NULL,
    game_developer VARCHAR(50) NOT NULL,
    game_release_date TIMESTAMP NOT NULL,
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
    game_added_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    game_description VARCHAR(255) NOT NULL,
    game_main_img_url VARCHAR(255) NOT NULL,
    game_rating_combined INT,
    game_rating_users INT
);

CREATE TABLE posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  post_title VARCHAR(50) NOT NULL,
  post_description VARCHAR(255) NOT NULL,
  post_img_url VARCHAR(255) NOT NULL
);

CREATE TABLE comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  comment_description VARCHAR(255),
  comment_responding_to INT NOT NULL,
  post_img_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (comment_responding_to) REFERENCES comments(comment_id)
);

CREATE TABLE comment_user_join_table (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  comment_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
  UNIQUE KEY (user_id, comment_id)
);

CREATE TABLE post_user_join_table (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id),
  UNIQUE KEY (user_id, post_id)
);

CREATE TABLE game_images (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);

CREATE TABLE review_join_table (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  review_description VARCHAR(255) NOT NULL UNIQUE,
  review_rating INT CHECK (review_rating >= 1 AND review_rating <= 5) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, game_id)
);

CREATE TABLE developer_join_table (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  UNIQUE KEY (user_id, game_id)
);
