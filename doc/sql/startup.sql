
-- db
CREATE DATABASE collaborative_world;

-- earthdistance
create extension if not exists cube;
create extension if not exists earthdistance;

CREATE TABLE geolocation (
	uuid uuid PRIMARY KEY,
	lat float8,
	long float8
);
-- This index will allow for fast "nearby" searches
CREATE INDEX ON geolocation USING gist (ll_to_earth(lat, long));

CREATE TABLE donation (
	uuid uuid PRIMARY KEY,
	foollow_up boolean,
	start_date int,
	finish_date int
);

select * from geolocation;


-- Example queries

insert into geolocation(uuid, lat, long)
values (uuid_generate_v4(), numeric(5,1) '-34.640745', numeric(5,1) '-58.649488');

select (point(-34.640745, -58.649488) <@> point(-34.590258, -58.379677)) * 1.609344 as distance;

select * from geolocation where 
	earth_box(ll_to_earth(45.1013021, 46.3021011), 25000) @> ll_to_earth(lat, long) 
    and earth_distance(ll_to_earth(45.1013021, 46.3021011), ll_to_earth(lat, long)) < 25000;

