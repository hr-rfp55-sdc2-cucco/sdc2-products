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
