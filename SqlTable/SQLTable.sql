CREATE DATABASE IF NOT EXISTS mini_steam;
USE mini_steam;

-- Users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(60) NOT NULL,
    user_role ENUM('admin', 'developer', 'user') NOT NULL
);

-- Games
CREATE TABLE games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(50) NOT NULL,
    game_developer VARCHAR(50) NOT NULL,
    game_release_date TIMESTAMP NOT NULL,
    game_genre ENUM(
     'action', 'adventure', 'rpg', 'shooter', 'platformer', 'simulation',
     'strategy', 'sports', 'racing', 'puzzle', 'horror', 'sandbox', 'fighting'
    ) NOT NULL,
    game_added_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    game_description VARCHAR(255) NOT NULL,
    game_main_img_url VARCHAR(255) NOT NULL,
    game_rating_combined INT,
    game_rating_users INT
);

-- Posts
CREATE TABLE posts (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  post_title VARCHAR(50) NOT NULL,
  post_description VARCHAR(255) NOT NULL,
  post_img_url VARCHAR(255) NOT NULL
);

-- Comments
CREATE TABLE comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  comment_description VARCHAR(255),
  comment_responding_to INT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (comment_responding_to) REFERENCES comments(comment_id) ON DELETE SET NULL,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

-- Comment <-> User
CREATE TABLE comment_user_join_table (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  comment_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
  UNIQUE KEY (user_id, comment_id)
);

-- Post <-> User
CREATE TABLE post_user_join_table (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  game_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (post_id) REFERENCES posts(post_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id),
  UNIQUE KEY (user_id, post_id)
);

-- Game Images
CREATE TABLE game_images (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (game_id) REFERENCES games(game_id)
);

-- Reviews
CREATE TABLE review_join_table (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_id INT NOT NULL,
  review_description VARCHAR(255),
  review_rating INT CHECK (review_rating >= 1 AND review_rating <= 5) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, game_id)
);

-- Developer Access
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
 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/504230/capsule_616x353.jpg', 0, 0),

('Hollow Knight', 'Team Cherry', '2017-02-24 00:00:00', 'adventure',
 'Explore twisting caverns, ancient cities and deadly creatures in a vast interconnected world.',
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGCf98td_1NMhbHiPbwKB9BTpMOsS1uQa2CGlVHL95upC5AsI', 0, 0),

('Undertale', 'Toby Fox', '2015-09-15 00:00:00', 'rpg',
 'A small RPG where no one has to die. Charm, humor, and unique battle system.',
 'https://e.snmc.io/lk/l/x/16ff906ed589772893da8602a02651a6/10965847', 0, 0),

('Stardew Valley', 'ConcernedApe', '2016-02-26 00:00:00', 'simulation',
 'You’ve inherited your grandfather’s old farm plot in Stardew Valley.',
 'https://cdn.displate.com/artwork/857x1200/2024-11-13/b6df36cd-e0dd-4082-ae7b-7a72f4e44482.jpg', 0, 0),

('Cuphead', 'Studio MDHR', '2017-09-29 00:00:00', 'platformer',
 'Classic run and gun action game heavily focused on boss battles.',
 'https://m.media-amazon.com/images/M/MV5BN2I1ZTBiOTctZDc5MC00YjdkLWI3ZjUtNjI5Y2EzMjM2NGViXkEyXkFqcGc@._V1_.jpg', 0, 0),

('Dead Cells', 'Motion Twin', '2018-08-07 00:00:00', 'action',
 'Roguelike, metroidvania-inspired action-platformer.',
 'https://upload.wikimedia.org/wikipedia/en/1/1f/Dead_cells_cover_art.png', 0, 0),

('Papers, Please', 'Lucas Pope', '2013-08-08 00:00:00', 'simulation',
 'A dystopian document thriller where you’re a border inspector.',
 'https://m.media-amazon.com/images/M/MV5BOWVlNjAxMWMtOTY3MC00OWY5LWI5NDktMTMwOWQ4N2M0MDFhXkEyXkFqcGc@._V1_.jpg', 0, 0),

('The Witness', 'Jonathan Blow', '2016-01-26 00:00:00', 'puzzle',
 'Explore an open world island filled with hundreds of puzzles.',
 'https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/210970/capsule_616x353.jpg', 0, 0),

('Hyper Light Drifter', 'Heart Machine', '2016-03-31 00:00:00', 'action',
 'Action RPG with gorgeous pixel art and mysterious storytelling.',
 'https://images.gog-statics.com/fdc6ee70ba6aee36a86086a9391fbea1ac146ff15cfef037f19ea42046ffa1ca.jpg', 0, 0),

('Slay the Spire', 'MegaCrit', '2019-01-23 00:00:00', 'strategy',
 'Card-based roguelike where you climb a spire battling enemies.',
 'https://image.api.playstation.com/cdn/EP3717/CUSA15338_00/Sn5xbNutqfQdWYIjbeCIN0bwTJOV7UPG.png', 0, 0);
