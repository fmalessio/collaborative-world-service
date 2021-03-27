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

-- Plaza Oeste
latitude: -34.63284719532406,
longitude: -58.6296368183098
  
-- Search near to 50km
select *, 
	earth_distance(ll_to_earth(-34.63284719532406, -58.6296368183098), ll_to_earth(lat, lng)) as distance
	from geolocation where 
	earth_box(ll_to_earth(-34.63284719532406, -58.6296368183098), 50000) @> ll_to_earth(lat, lng) 
    and earth_distance(ll_to_earth(-34.63284719532406, -58.6296368183098), ll_to_earth(lat, lng)) < 50000
	order by distance asc;

SELECT
don.uuid AS uuid, don.amount,
cat.name AS category_name,
don.amount as ammount,
earth_distance(ll_to_earth(-34.63284719532406, -58.6296368183098), ll_to_earth(geo.lat, geo.lng)) AS distance
FROM 
donation don
inner join geolocation geo on don.geolocation_id = geo.uuid
inner join box box on don.box_id = box.uuid
inner join category cat on box.category_id = cat.id
WHERE 
don.state = 'READY_TO_TRAVEL'
and don.user_id != 'f7feadfa-d33a-4ed3-8bf5-b0e090b73811'
AND earth_box(ll_to_earth(-34.63284719532406, -58.6296368183098), 50000) @> ll_to_earth(geo.lat, geo.lng) 
AND earth_distance(ll_to_earth(-34.63284719532406, -58.6296368183098), ll_to_earth(geo.lat, geo.lng)) < 50000
ORDER BY distance asc;

--https://www.google.com/maps/search/?api=1&query=-34.640745,-58.649488;

alter table geolocation rename column long to lng;
alter table geolocation add column address VARCHAR(256);

select CURRENT_TIMESTAMP;

update donation set user_id = 'f7feadfa-d33a-4ed3-8bf5-b0e090b7381c';

-- User test 2
INSERT INTO "user" (uuid, full_name, alias, username, password, active)
VALUES (uuid_generate_v4(), 'Federico Marcos Alessio', 'fmalessio3', 'fmalessio3', '1234', true);

ALTER TABLE "user" DROP CONSTRAINT "UQ_638bac731294171648258260ff2";
