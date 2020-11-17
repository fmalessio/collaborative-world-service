
-- db
CREATE DATABASE collaborative_world;

CREATE TABLE geolocation (
	uuid uuid PRIMARY KEY,
	lat float8,
	lng float8,
	address VARCHAR(256);
);

-- User test
INSERT INTO "user" (uuid, full_name, alias, password, active)
VALUES (uuid_generate_v4(), 'Federico Marcos Alessio', 'fmalessio', '1234', true);