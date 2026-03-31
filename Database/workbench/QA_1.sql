CREATE TABLE tech_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    brand VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT,
    supplier_email VARCHAR(100),
    promo_code VARCHAR(15), -- For practicing IS NULL
    rating DECIMAL(2, 1)    -- For practicing > and < comparisons (e.g., 4.5)
);

SELECT * FROM tech_inventory
WHERE price <>999;

CREATE database myy_store;
use myy_store;
CREATE TABLE tech_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    brand VARCHAR(50),
    price DECIMAL(10, 2),
    stock INT,
    supplier_email VARCHAR(100),
    promo_code VARCHAR(15), -- For practicing IS NULL
    rating DECIMAL(2, 1)    -- For practicing > and < comparisons (e.g., 4.5)
);
SELECT * FROM tech_inventory
WHERE price <>999;

INSERT INTO tech_inventory 
(item_name, category, brand, price, stock, supplier_email, promo_code, rating)
VALUES 
('Galaxy Tab S9', 'Tablets', 'Samsung', 799.99, 25, 'sales@samsung.com', 'TECH20', 4.8),
('Galaxy Book3', 'Laptops', 'Samsung', 1299.00, 10, 'support@samsung.com', NULL, 4.2),
('iPad Air', 'Tablets', 'Apple', 599.00, 0, 'orders@apple.com', 'APPLE5', 4.9),
('MacBook Air M2', 'Laptops', 'Apple', 1099.00, 15, 'shipping@apple.com', NULL, 4.7),
('Pixel 8 Pro', 'Mobile', 'Google', 999.00, 40, 'direct@google.com', 'PIXEL10', 4.5),
('Pixel Buds Pro', 'Audio', 'Google', 199.99, 100, 'nexus@gmail.com', NULL, 4.3),
('Surface Laptop 5', 'Laptops', 'Microsoft', 999.99, 8, 'store@outlook.com', 'OFFICE', 4.0),
('XPS 13 Laptop', 'Laptops', 'Dell', 1150.00, 5, 'contact@dell.com', NULL, 4.6),
('Insignia Mouse', 'Accessories', 'BestBuy', 15.50, 250, 'bulk@gmail.com', 'CHEAP', 3.5),
('Basic HDMI Cable', 'Accessories', 'Generic', 9.99, 500, 'info@generic.com', NULL, 2.8);
SELECT * FROM tech_inventory
WHERE  item_name = 'Laptop' AND price >1000;

select * from tech_inventory;

SELECT * FROM tech_inventory WHERE brand IN ('Apple' , 'Samsung');

SELECT * FROM tech_inventory
WHERE rating >=4 AND price >900;

SELECT * FROM tech_inventory
WHERE item_name LIKE '%Galaxy%';

SELECT * FROM tech_inventory
WHERE item_name LIKE '%Air%';

SELECT * FROM tech_inventory
WHERE brand LIKE '_____';

SELECT * FROM tech_inventory
WHERE promo_code IS NOT NULL;

SELECT * FROM tech_inventory
WHERE brand = 'Apple' AND category = 'Laptops' AND price >900;

SELECT * FROM tech_inventory
WHERE supplier_email LIKE '%gmail%' AND rating >= 4.0;
SELECT * FROM tech_inventory;

SELECT * FROM tech_inventory 
WHERE (category = 'Accessories' AND stock >=100) OR price <=200;