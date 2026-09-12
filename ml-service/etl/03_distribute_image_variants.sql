-- For the highest-volume dish buckets (>150 recipes each), a single shared
-- photo meant a search-results page could show the exact same image
-- repeated 15+ times in a row. Spreads each of these 12 buckets across 4
-- photo variants (id % 4) so a grid of results actually looks varied while
-- staying thematically correct.
UPDATE recipes SET image_url = '/images/dishes/chicken-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/chicken.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/vegetable-curry-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/vegetable-curry.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/continental-food-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/continental-food.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/dal-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/dal.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/south-indian-food-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/south-indian-food.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/mixed-indian-food-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/mixed-indian-food.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/potato-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/potato.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/cake-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/cake.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/salad-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/salad.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/egg-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/egg.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/north-indian-food-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/north-indian-food.jpg' AND id % 4 != 0;
UPDATE recipes SET image_url = '/images/dishes/rice-' || (2 + (id % 3)) || '.jpg' WHERE image_url = '/images/dishes/rice.jpg' AND id % 4 != 0;
