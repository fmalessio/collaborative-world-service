
-- db
CREATE DATABASE collaborative_world;

CREATE TABLE geolocation (
	uuid uuid PRIMARY KEY,
	lat float8,
	lng float8,
	address VARCHAR(256);
);
