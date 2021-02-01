
-- db
CREATE DATABASE collaborative_world;

-- To use function uuid_generate_v4()
CREATE extension IF NOT EXISTS "uuid-ossp";

/**
 * After start
 */
-- User test
INSERT INTO "user" (uuid, full_name, alias, password, active)
VALUES (uuid_generate_v4(), 'Federico Marcos Alessio', 'fmalessio', '1234', true);

-- Categories
INSERT INTO public.category (name,description,"parentId",nsleft,nsright) VALUES
	 ('Otros','',NULL,1,2),
	 ('Juguetes','',NULL,1,6),
	 ('Celular','',79,8,9),
	 ('Mueble','',72,22,23),
	 ('Iluminación','',72,24,25),
	 ('Mochila','',65,36,37),
	 ('Librería','',NULL,1,40),
	 ('Dentífrico','',55,50,51),
	 ('Alcohol','',55,2,41),
	 ('Alcohol en gel','',55,42,43);
INSERT INTO public.category (name,description,"parentId",nsleft,nsright) VALUES
	 ('Papel higiénico','',55,54,55),
	 ('Higiene personal','',NULL,1,58),
	 ('Detergente','',19,2,59),
	 ('Insecticida/Repelente','',19,60,61),
	 ('Para ropa','',19,62,63),
	 ('Alimentos','Alimentos deben ser no perecederos',NULL,1,66),
	 ('Indumentaria','',NULL,1,66),
	 ('Leche en polvo','',3,1,66),
	 ('Fideos','',3,1,66),
	 ('Arroz','',3,1,66);
INSERT INTO public.category (name,description,"parentId",nsleft,nsright) VALUES
	 ('Enlatados','',3,1,66),
	 ('Aceite','',3,1,66),
	 ('Harina','',3,1,66),
	 ('Galletitas','',3,1,66),
	 ('Otros','',3,1,66),
	 ('Remera','',12,1,66),
	 ('Pantalón','',12,1,66),
	 ('Tecnología','',NULL,1,16),
	 ('Electrodoméstico','',72,2,17),
	 ('Bebés','',85,4,5);
INSERT INTO public.category (name,description,"parentId",nsleft,nsright) VALUES
	 ('Niño/a','',85,2,3),
	 ('Tablet','',79,10,11),
	 ('Televisión','',79,12,13),
	 ('Cocina y bazar','',72,18,19),
	 ('Medias','',12,1,66),
	 ('Calzado','',12,1,66),
	 ('Notebook','',79,2,7),
	 ('Baño','',72,20,21),
	 ('Cotonetes','',55,44,45),
	 ('Desodorante','',55,46,47);
INSERT INTO public.category (name,description,"parentId",nsleft,nsright) VALUES
	 ('Otros','',65,38,39),
	 ('Resma','',65,32,33),
	 ('Útiles','',65,34,35),
	 ('Toallas femeninas','',55,48,49),
	 ('Shampoo/Acondicionador','',55,52,53),
	 ('Abrigo','',12,1,66),
	 ('Otros','',12,1,66),
	 ('Artículos de limpieza','',NULL,1,66),
	 ('Lavandina','',19,1,66),
	 ('Otros','',19,64,65);
INSERT INTO public.category (name,description,"parentId",nsleft,nsright) VALUES
	 ('Otros','',55,56,57),
	 ('Cuaderno','',65,2,29),
	 ('Hogar','',NULL,1,28),
	 ('Libros y revistas','',65,30,31),
	 ('Otros','',72,26,27),
	 ('Otros','',79,14,15);