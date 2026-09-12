-- Reassigns recipes.image_url from the dead archanaskitchen.com hotlinks to
-- self-hosted local dish-bucket photos (frontend/public/images/dishes/*).
-- Each UPDATE only touches rows still pointing at the old dead domain, so
-- priority order matters: most specific dish name first, then main
-- ingredient, then cuisine-level fallback, then one final catch-all.

-- ===== TIER 1: specific named dishes =====
UPDATE recipes SET image_url = '/images/dishes/biryani.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%biryani%';
UPDATE recipes SET image_url = '/images/dishes/pulao.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%pulao%' OR name ILIKE '%pulav%' OR name ILIKE '%pilaf%');
UPDATE recipes SET image_url = '/images/dishes/dosa.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%dosa%';
UPDATE recipes SET image_url = '/images/dishes/idli.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%idli%';
UPDATE recipes SET image_url = '/images/dishes/uttapam.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%uttapam%';
UPDATE recipes SET image_url = '/images/dishes/sambar.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%sambar%';
UPDATE recipes SET image_url = '/images/dishes/rasam.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%rasam%';
UPDATE recipes SET image_url = '/images/dishes/vada.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%vada%' OR name ILIKE '%vade%');
UPDATE recipes SET image_url = '/images/dishes/upma.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%upma%';
UPDATE recipes SET image_url = '/images/dishes/poha.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%poha%';
UPDATE recipes SET image_url = '/images/dishes/khichdi.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%khichdi%' OR name ILIKE '%khichri%');
UPDATE recipes SET image_url = '/images/dishes/paratha.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%paratha%' OR name ILIKE '%parantha%');
UPDATE recipes SET image_url = '/images/dishes/naan.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%naan%';
UPDATE recipes SET image_url = '/images/dishes/roti.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%roti%' OR name ILIKE '%chapati%' OR name ILIKE '%phulka%');
UPDATE recipes SET image_url = '/images/dishes/samosa.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%samosa%';
UPDATE recipes SET image_url = '/images/dishes/pakora.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%pakora%' OR name ILIKE '%bhajiya%' OR name ILIKE '%fritter%');
UPDATE recipes SET image_url = '/images/dishes/dhokla.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%dhokla%';
UPDATE recipes SET image_url = '/images/dishes/thepla.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%thepla%';
UPDATE recipes SET image_url = '/images/dishes/chaat.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%chaat%' OR name ILIKE '%bhel%' OR name ILIKE '%papdi%');
UPDATE recipes SET image_url = '/images/dishes/tikka.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%tikka%';
UPDATE recipes SET image_url = '/images/dishes/kebab.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%kebab%' OR name ILIKE '%kabab%' OR name ILIKE '%seekh%');
UPDATE recipes SET image_url = '/images/dishes/korma.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%korma%';
UPDATE recipes SET image_url = '/images/dishes/kofta.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%kofta%';
UPDATE recipes SET image_url = '/images/dishes/tandoori.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%tandoori%';
UPDATE recipes SET image_url = '/images/dishes/halwa.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%halwa%';
UPDATE recipes SET image_url = '/images/dishes/kheer.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%kheer%' OR name ILIKE '%payasam%' OR name ILIKE '%payasa%');
UPDATE recipes SET image_url = '/images/dishes/laddu.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%laddu%' OR name ILIKE '%ladoo%');
UPDATE recipes SET image_url = '/images/dishes/barfi.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%barfi%';
UPDATE recipes SET image_url = '/images/dishes/gulab-jamun.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%gulab%jamun%';
UPDATE recipes SET image_url = '/images/dishes/cake.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%cake%';
UPDATE recipes SET image_url = '/images/dishes/cookies.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%cookie%');
UPDATE recipes SET image_url = '/images/dishes/pasta.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%pasta%';
UPDATE recipes SET image_url = '/images/dishes/pizza.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%pizza%';
UPDATE recipes SET image_url = '/images/dishes/sandwich.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%sandwich%';
UPDATE recipes SET image_url = '/images/dishes/soup.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%soup%';
UPDATE recipes SET image_url = '/images/dishes/salad.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%salad%';
UPDATE recipes SET image_url = '/images/dishes/momos.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%momo%');
UPDATE recipes SET image_url = '/images/dishes/noodles.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%noodle%' OR name ILIKE '%chowmein%' OR name ILIKE '%hakka%');
UPDATE recipes SET image_url = '/images/dishes/fried-rice.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%fried rice%';
UPDATE recipes SET image_url = '/images/dishes/chutney.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%chutney%';
UPDATE recipes SET image_url = '/images/dishes/pickle.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%pickle%' OR name ILIKE '%achar%');
UPDATE recipes SET image_url = '/images/dishes/raita.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%raita%';

-- ===== TIER 2: main ingredient / format =====
UPDATE recipes SET image_url = '/images/dishes/chicken.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%chicken%';
UPDATE recipes SET image_url = '/images/dishes/paneer.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%paneer%';
UPDATE recipes SET image_url = '/images/dishes/egg.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%egg%';
UPDATE recipes SET image_url = '/images/dishes/fish.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%fish%' OR name ILIKE '%prawn%' OR name ILIKE '%shrimp%');
UPDATE recipes SET image_url = '/images/dishes/mushroom.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%mushroom%';
UPDATE recipes SET image_url = '/images/dishes/dal.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%dal%' OR name ILIKE '%daal%' OR name ILIKE '%moong%' OR name ILIKE '%chana%' OR name ILIKE '%toor%' OR name ILIKE '%masoor%' OR name ILIKE '%rajma%' OR name ILIKE '%lentil%');
UPDATE recipes SET image_url = '/images/dishes/potato.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%potato%' OR name ILIKE '%aloo%');
UPDATE recipes SET image_url = '/images/dishes/spinach.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%spinach%' OR name ILIKE '%palak%');
UPDATE recipes SET image_url = '/images/dishes/rice.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%rice%';
UPDATE recipes SET image_url = '/images/dishes/bread.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND name ILIKE '%bread%';
UPDATE recipes SET image_url = '/images/dishes/dessert.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%dessert%' OR name ILIKE '%sweet%');
UPDATE recipes SET image_url = '/images/dishes/vegetable-curry.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND (name ILIKE '%vegetable%' OR name ILIKE '%sabzi%' OR name ILIKE '%sabji%' OR name ILIKE '%curry%' OR name ILIKE '%gravy%' OR name ILIKE '%masala%');

-- ===== TIER 3: cuisine-level fallback (consolidated regional buckets) =====
UPDATE recipes SET image_url = '/images/dishes/italian-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'Italian%');
UPDATE recipes SET image_url = '/images/dishes/mexican-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'Mexican%');
UPDATE recipes SET image_url = '/images/dishes/asian-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'Chinese%' OR name ILIKE 'Indo Chinese%' OR name ILIKE 'Thai%' OR name ILIKE 'Asian%');
UPDATE recipes SET image_url = '/images/dishes/continental-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'Continental%' OR name ILIKE 'European%' OR name ILIKE 'French%' OR name ILIKE 'Mediterranean%' OR name ILIKE 'Greek%' OR name ILIKE 'Middle Eastern%' OR name ILIKE 'African%');
UPDATE recipes SET image_url = '/images/dishes/south-indian-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'South Indian%' OR name ILIKE 'Karnataka%' OR name ILIKE 'Tamil Nadu%' OR name ILIKE 'Kerala%' OR name ILIKE 'Andhra%' OR name ILIKE 'Chettinad%' OR name ILIKE 'Hyderabadi%');
UPDATE recipes SET image_url = '/images/dishes/north-indian-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'North Indian%' OR name ILIKE 'Punjabi%' OR name ILIKE 'Rajasthani%' OR name ILIKE 'Kashmiri%' OR name ILIKE 'Awadhi%' OR name ILIKE 'Mughlai%' OR name ILIKE 'Bihari%');
UPDATE recipes SET image_url = '/images/dishes/west-indian-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'Maharashtrian%' OR name ILIKE 'Gujarati%' OR name ILIKE 'Goan%' OR name ILIKE 'Konkan%' OR name ILIKE 'Sindhi%' OR name ILIKE 'Parsi%');
UPDATE recipes SET image_url = '/images/dishes/east-indian-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'Bengali%' OR name ILIKE 'Assamese%' OR name ILIKE 'Oriya%' OR name ILIKE 'North East India%');
UPDATE recipes SET image_url = '/images/dishes/fusion-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%' AND cuisine_id IN (SELECT id FROM cuisines WHERE name ILIKE 'Fusion%');

-- ===== TIER 4: final catch-all =====
UPDATE recipes SET image_url = '/images/dishes/mixed-indian-food.jpg' WHERE image_url LIKE 'https://www.archanaskitchen.com%';
