
-- earthdistance
create extension if not exists cube;
create extension if not exists earthdistance;

-- This index will allow for fast "nearby" searches
CREATE INDEX ON geolocation USING gist (ll_to_earth(lat, lng));

-- check extensions
SELECT * FROM pg_extension;