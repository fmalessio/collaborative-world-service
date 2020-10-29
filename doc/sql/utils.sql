-- Example queries
select * from category;
select * from geolocation;
select * from donation;
--DELETE FROM category;

insert into geolocation(uuid, lat, lng) 
values (uuid_generate_v4(), -34.633763, -58.6316297, 
'Tebicuary 1825, Castelar, Buenos Aires, Argentina');

select uuid_generate_v4();

select (point(-34.640745, -58.649488) <@> point(-34.633763, -58.6316297)) * 1.609344 as distance;

select (point(-34.640745, -58.649488) <@> point(-34.633763, -58.6316297)) * 1.609344 as distance;

-- Search near to 200km
select *, 
	earth_distance(ll_to_earth(-34.640745, -58.649488), ll_to_earth(lat, lng)) as distance
	from geolocation where 
	earth_box(ll_to_earth(-34.640745, -58.649488), 200000) @> ll_to_earth(lat, lng) 
    and earth_distance(ll_to_earth(-34.640745, -58.649488), ll_to_earth(lat, lng)) < 200000;

--https://www.google.com/maps/search/?api=1&query=-34.640745,-58.649488;

alter table geolocation rename column long to lng;
alter table geolocation add column address VARCHAR(256);
