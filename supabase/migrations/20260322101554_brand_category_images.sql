-- Update Category Images
UPDATE public.categories SET image_url = '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/0961c272 d7c9 4494 a260 456e1473d440_1.jpg' WHERE id = 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c';
UPDATE public.categories SET image_url = '/images/CHRA cartridges - Abm-automotive-online.com/003ABM.jpg' WHERE id = '16490fcf-fdf1-483b-b2bd-df61aea9a8a8';
UPDATE public.categories SET image_url = '/images/Compresseurs - Page 2 à 2 - Abm-automotive-online.com/20181204 100209.jpg' WHERE id = '8d457139-63c9-44a5-9533-6f4adda1efde';
UPDATE public.categories SET image_url = '/images/Kits réfection turbo - Page 6 à 6 - Abm-automotive-online.com/20190131 132838.jpg' WHERE id = '62b9a11b-16de-4563-9ee5-a066a76cecbd';
UPDATE public.categories SET image_url = '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/1.9 TDI 105 BLS 2 engine.jpg' WHERE id = 'b72acdc6-f680-4fc0-9d05-a0568a244ceb';

-- Ensure Brands exist and have images
INSERT INTO public.brands (name, slug, image_url) VALUES ('Audi', 'audi', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/0AV409053T boite de transfert audi s3 8pa 265 (1).jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Rover', 'rover', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/6hp 26 range rover sport l320 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Man', 'man', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/7540004302 boite de transfert mini countryman sd all4.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('BMW', 'bmw', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/8hp 70x boite de vitesses automatique bmw x3 2.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Mercedes', 'mercedes', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/a9062603402 boite manuelle mercedes sprinter.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Mini', 'mini', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/awf8g45 GA8Q45CW mini cooper jcw 213 (3).jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Hyundai', 'hyundai', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite a vitesses automatique hyundai tucson 1 6 crdi hybride 136 (2).jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Renault', 'renault', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite a vitesses automatique renault talisman dci 160 dw6003 (2).jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Suzuki', 'suzuki', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite a vitesses automatiques tf71sc suzuki vitara hybride.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Fiat', 'fiat', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite a vitesses fiat barchetta.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Ford', 'ford', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite a vitesses ford focus 1 scti ecoboost 125.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Kia', 'kia', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite a vitesses manuelle kia sportage crdi.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Peugeot', 'peugeot', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite automatique at6 peugeot 5008 thp 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Jaguar', 'jaguar', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite automatique jaguar xk8 722650 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Land Rover', 'land-rover', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite de transfert fg5ja land rover discovery sport td4 150.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Volvo', 'volvo', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite de transfert volvo xc 90 d5 200 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Alfa Romeo', 'alfa-romeo', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite de vitesses alfa romeo mito 1 4 multiair 170.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Isuzu', 'isuzu', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite de vitesses isuzu npr nqr nkr 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Iveco', 'iveco', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite de vitesses iveco daily 5s270 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Nissan', 'nissan', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite de vitesses tl4 125 nissan juke dci 110.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Subaru', 'subaru', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/boite de vitesses TY756W12AB subaru.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Toyota', 'toyota', '/images/Boites à vitesses - Page 61 à 63 - Abm-automotive-online.com/Boite à vitesses Toyota Yaris hybride.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Opel', 'opel', '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/B14XER engine for Opel Corsa 3.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Citroen', 'citroen', '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/engine hnv hn05 citroen c3 thp puretech 110 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Honda', 'honda', '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/engine honda crv 4 2 2 i dtec awd 150 n22b4 1.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Jeep', 'jeep', '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/exf engine vm23d jeep grand cherokee cdr 240 (1).jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Porsche', 'porsche', '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/M44 41 engine Porsche 944 S2 (1).jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Mitsubishi', 'mitsubishi', '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/Mitsubishi L200 Triton 181 1 4N15 engine.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;
INSERT INTO public.brands (name, slug, image_url) VALUES ('Seat', 'seat', '/images/Moteurs - Page 52 à 97 - Abm-automotive-online.com/Seat Ateca 1.6 TDI 115 DGT DGTE 1 engine.jpg') 
ON CONFLICT (slug) DO UPDATE SET image_url = EXCLUDED.image_url;

-- Associate Brands with Categories
DELETE FROM public.category_brands;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'audi'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'rover'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'man'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'bmw'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'mercedes'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'mini'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'hyundai'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'renault'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'suzuki'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'fiat'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'ford'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'kia'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'peugeot'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'jaguar'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'land-rover'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'volvo'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'alfa-romeo'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'isuzu'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'iveco'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'nissan'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'subaru'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', id FROM public.brands WHERE slug = 'toyota'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT '8d457139-63c9-44a5-9533-6f4adda1efde', id FROM public.brands WHERE slug = 'mini'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT '8d457139-63c9-44a5-9533-6f4adda1efde', id FROM public.brands WHERE slug = 'audi'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'rover'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'jaguar'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'peugeot'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'alfa-romeo'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'audi'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'opel'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'mini'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'man'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'bmw'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'mercedes'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'fiat'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'ford'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'citroen'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'honda'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'nissan'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'land-rover'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'jeep'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'hyundai'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'isuzu'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'iveco'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'kia'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'porsche'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'mitsubishi'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'renault'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'seat'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'subaru'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'suzuki'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'toyota'
ON CONFLICT DO NOTHING;
INSERT INTO public.category_brands (category_id, brand_id) 
SELECT 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', id FROM public.brands WHERE slug = 'volvo'
ON CONFLICT DO NOTHING;
