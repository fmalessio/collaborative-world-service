-- Example queries
select * from category;
select * from geolocation;
select * from donation;
select * from donation_transaction;
select * from bc_block;
select * from "user";
-- 887819d135cdbdc9928be627198b3ee35d7891790f0613eca026aec7d00eb9b452e762bccab4c85f03ec2679e6c30ac129b2ec3a0ec72f4f1d67b129ce3061d9

DELETE FROM bc_block;
DELETE FROM donation_transaction;
DELETE FROM donation;
DELETE FROM geolocation;

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

select CURRENT_TIMESTAMP;

update donation set user_id = 'f7feadfa-d33a-4ed3-8bf5-b0e090b7381c';