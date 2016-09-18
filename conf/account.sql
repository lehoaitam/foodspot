-- Add admin account
INSERT INTO `foodspot`.`user` (`email`, `password`) VALUES ('admin@foodspot.com', '2767ab1eef481d99eb470c26a17d9c5fe76f3178d528fa24a00dfcad7efbd379');

-- add PKs
ALTER TABLE `categories`	ADD UNIQUE INDEX `name_shops_id` (`name`, `shops_id`);
ALTER TABLE `shops`	ADD UNIQUE INDEX `name_users_id` (`name`, `users_id`);
