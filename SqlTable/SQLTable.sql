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
INSERT INTO games (
    game_name, game_developer, game_release_date, game_genre,
    game_description, game_main_img_url, game_rating_combined, game_rating_users
) VALUES
('Celeste', 'Matt Makes Games', '2018-01-25 00:00:00', 'platformer',
 'A touching platformer about climbing a mountain and overcoming anxiety.',
 'https://example.com/celeste.jpg', 0, 0),

('Hollow Knight', 'Team Cherry', '2017-02-24 00:00:00', 'adventure',
 'Explore twisting caverns, ancient cities and deadly creatures in a vast interconnected world.',
 'https://example.com/hollowknight.jpg', 0, 0),

('Undertale', 'Toby Fox', '2015-09-15 00:00:00', 'rpg',
 'A small RPG where no one has to die. Charm, humor, and unique battle system.',
 'https://example.com/undertale.jpg', 0, 0),

('Stardew Valley', 'ConcernedApe', '2016-02-26 00:00:00', 'simulation',
 'You’ve inherited your grandfather’s old farm plot in Stardew Valley.',
 'https://example.com/stardewvalley.jpg', 0, 0),

('Cuphead', 'Studio MDHR', '2017-09-29 00:00:00', 'platformer',
 'Classic run and gun action game heavily focused on boss battles.',
 'https://example.com/cuphead.jpg', 0, 0),

('Dead Cells', 'Motion Twin', '2018-08-07 00:00:00', 'action',
 'Roguelike, metroidvania-inspired action-platformer.',
 'https://example.com/deadcells.jpg', 0, 0),

('Papers, Please', 'Lucas Pope', '2013-08-08 00:00:00', 'simulation',
 'A dystopian document thriller where you’re a border inspector.',
 'https://example.com/papersplease.jpg', 0, 0),

('The Witness', 'Jonathan Blow', '2016-01-26 00:00:00', 'puzzle',
 'Explore an open world island filled with hundreds of puzzles.',
 'https://example.com/thewitness.jpg', 0, 0),

('Hyper Light Drifter', 'Heart Machine', '2016-03-31 00:00:00', 'action',
 'Action RPG with gorgeous pixel art and mysterious storytelling.',
 'https://example.com/hyperlightdrifter.jpg', 0, 0),

('Slay the Spire', 'MegaCrit', '2019-01-23 00:00:00', 'strategy',
 'Card-based roguelike where you climb a spire battling enemies.',
 'https://example.com/slaythespire.jpg', 0, 0);