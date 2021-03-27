
-- db
CREATE DATABASE collaborative_world;

-- To use function uuid_generate_v4()
CREATE extension IF NOT EXISTS "uuid-ossp";

/**
 * After start
 */
-- User test
INSERT INTO "user" (uuid, full_name, alias, username, password, active)
VALUES (uuid_generate_v4(), 'Federico Marcos Alessio', 'fmalessio', 'fmalessio', '1234', true);
-- User test 2
INSERT INTO "user" (uuid, full_name, alias, username, password, active)
VALUES (uuid_generate_v4(), 'Federico Marcos Alessio', 'fmalessio2', 'fmalessio2', '1234', true);