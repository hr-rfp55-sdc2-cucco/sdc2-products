CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "slogan" varchar,
  "description" varchar,
  "category" varchar,
  "default_price" int
);

CREATE TABLE "related" (
 "id" SERIAL PRIMARY KEY,
 "current_product_id" int,
 "related_product_id" int
);

CREATE TABLE "features" (
  "id" SERIAL PRIMARY KEY,
  "product_id" int,
  "value" varchar,
  "feature" varchar
);

CREATE TABLE "styles" (
  "id" SERIAL PRIMARY KEY,
  "product_id" int,
  "name" varchar,
  "sale_price" varchar NULL,
  "original_price" int,
  "default_style" boolean
);

CREATE TABLE "photos" (
  "id" SERIAL PRIMARY KEY,
  "style_id" int,
  "url" varchar,
  "thumbnail_url" varchar
);

CREATE TABLE "skus" (
  "id" SERIAL PRIMARY KEY,
  "style_id" int,
  "size" varchar,
  "quantity" int
);

ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE related ADD CONSTRAINT related_current_product_id_fkey FOREIGN KEY (current_product_id) REFERENCES products(id);
ALTER TABLE styles ADD CONSTRAINT product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);

COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/gayakim/Desktop/work/hr-rfp55/sdc2-products/csvsdc/product.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Users/gayakim/Desktop/work/hr-rfp55/sdc2-products/csvsdc/related.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, value, feature)
FROM '/Users/gayakim/Desktop/work/hr-rfp55/sdc2-products/csvsdc/features.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/gayakim/Desktop/work/hr-rfp55/sdc2-products/csvsdc/styles.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, style_id, url, thumbnail_url)
FROM '/Users/gayakim/Desktop/work/hr-rfp55/sdc2-products/csvsdc/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, style_id, size, quantity)
FROM '/Users/gayakim/Desktop/work/hr-rfp55/sdc2-products/csvsdc/skus.csv'
DELIMITER ','
CSV HEADER;