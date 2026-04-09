📌 TOPICS LIST
String Functions
Arithmetic Operators
Modifying Tables
CRUD Operations


======================== part 1 =============================

🚀 STRING FUNCTIONS – SOLUTIONS (1–25)

Assume table:

users(id, first_name, last_name, name, email)
products(id, name)

USERS TABLE (with constraints)

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    
    name VARCHAR(120) GENERATED ALWAYS AS 
        (CONCAT(first_name, ' ', last_name)) STORED,
    
    email VARCHAR(100) NOT NULL UNIQUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_email CHECK (email LIKE '%@%.%')
);

🚀 PRODUCTS TABLE (with constraints)
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    
    name VARCHAR(100) NOT NULL,
    
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_price CHECK (price > 0),
    CONSTRAINT chk_quantity CHECK (quantity >= 0)
);

💡 IMPORTANT (INTERVIEW LEVEL)

🔥 Constraints Used
PRIMARY KEY → unique + not null
AUTO_INCREMENT → automatic id
NOT NULL → mandatory fields
UNIQUE → no duplicate emails
CHECK → validates data (price > 0 etc.)
DEFAULT → auto values (quantity, timestamp)
GENERATED COLUMN → auto full name

🔹 BASIC

1. Uppercase

SELECT UPPER(name) FROM products;

2. Lowercase

SELECT LOWER(name) FROM users;

3. Length

SELECT name, LENGTH(name) FROM products;

4. First 3 characters

SELECT SUBSTRING(name, 1, 3) FROM products;

5. Last 4 characters

SELECT RIGHT(name, 4) FROM products;

6. Concatenate

SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;

7. Remove leading spaces

SELECT LTRIM(name) FROM users;

8. Remove trailing spaces

SELECT RTRIM(name) FROM users;
🔹 INTERMEDIATE

9. Replace word

SELECT REPLACE(name, 'old', 'new') FROM products;

10. Position of 'a'

SELECT LOCATE('a', name) FROM products;

11. Substring (2 to 5)

SELECT SUBSTRING(name, 2, 4) FROM products;

12. Reverse string

SELECT REVERSE(name) FROM users;

13. Length excluding spaces

SELECT LENGTH(REPLACE(name, ' ', '')) FROM users;

14. First word

SELECT SUBSTRING_INDEX(name, ' ', 1) FROM users;

15. Last word

SELECT SUBSTRING_INDEX(name, ' ', -1) FROM users;

16. Starts with 'A'

SELECT name FROM users WHERE name LIKE 'A%';

17. Ends with 'n'

SELECT name FROM users WHERE name LIKE '%n';
🔹 ADVANCED

18. Exactly 5 characters

SELECT name FROM users WHERE LENGTH(name) = 5;

19. Remove all spaces

SELECT REPLACE(name, ' ', '') FROM users;

20. Capitalize first letter (basic approach)

SELECT CONCAT(
    UPPER(LEFT(name,1)),
    LOWER(SUBSTRING(name,2))
) FROM users;

(Note: Full proper capitalization needs more logic in MySQL)

21. Palindrome

SELECT name 
FROM users 
WHERE name = REVERSE(name);

22. Count vowels

SELECT name,
LENGTH(name) - LENGTH(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    LOWER(name),'a',''),'e',''),'i',''),'o',''),'u','')
) AS vowel_count
FROM users;

23. Extract email domain

SELECT SUBSTRING_INDEX(email, '@', -1) FROM users;

24. Mask email

SELECT CONCAT(
    LEFT(email,1),
    '***@',
    SUBSTRING_INDEX(email,'@',-1)
) FROM users;

25. Duplicate strings (case-insensitive)

SELECT LOWER(name), COUNT(*)
FROM users
GROUP BY LOWER(name)
HAVING COUNT(*) > 1;
🎯 INTERVIEW TIP (IMPORTANT)
SUBSTRING_INDEX() → very powerful for splitting
REPLACE() → used in tricky questions
LENGTH vs CHAR_LENGTH → difference in Unicode
LIKE → pattern matching basics

===================================
🚀 TOPIC 2: ARITHMETIC OPERATORS – 25 QUESTIONS
🔹 BASIC (1–8)
Add 100 to product price
Subtract 50 from product price
Multiply price by quantity
Divide total_amount by quantity
Increase price by 10%
Decrease price by 5%
Find remainder of price ÷ 7
Round total_amount to nearest integer
🔹 INTERMEDIATE (9–17)
Calculate total value (price × quantity) for each product
Calculate total discount (price × discount/100)
Final price after discount (price - discount)
Average price per product
Increase quantity by 10 where quantity < 50
Apply 5% extra tax to total_amount
Difference between max and min price
Multiply price by 1.1 and round to 2 decimals
Find integer division of quantity ÷ 3
🔹 ADVANCED (18–25)
Total revenue per product (price × quantity)
Profit assuming cost = price × 0.7
Percentage of product quantity in total stock
Conditional price increase: +10 if price < 500 else +5
Calculate compounded price increase (price × 1.05 × 1.02)
Calculate price after sequential discounts: 10% then 5%
Compare two products: price difference / higher price × 100
Find top 3 products by total value (price × quantity)
🔹 SOLUTIONS
-- 1 Add 100
SELECT name, price + 100 AS new_price FROM products;

-- 2 Subtract 50
SELECT name, price - 50 AS new_price FROM products;

-- 3 Multiply price by quantity
SELECT name, price * quantity AS total_value FROM products;

-- 4 Divide total_amount by quantity
SELECT id, total_amount / quantity AS unit_price FROM orders;

-- 5 Increase price by 10%
SELECT name, price * 1.10 AS increased_price FROM products;

-- 6 Decrease price by 5%
SELECT name, price * 0.95 AS decreased_price FROM products;

-- 7 Remainder of price ÷ 7
SELECT name, MOD(price,7) AS remainder FROM products;

-- 8 Round total_amount
SELECT id, ROUND(total_amount) AS rounded_amount FROM orders;

-- 9 Total value per product
SELECT name, price * quantity AS total_value FROM products;

-- 10 Total discount
SELECT name, price * discount/100 AS discount_value FROM products;

-- 11 Final price after discount
SELECT name, price - (price * discount/100) AS final_price FROM products;

-- 12 Average price
SELECT AVG(price) AS avg_price FROM products;

-- 13 Increase quantity by 10 where quantity < 50
UPDATE products SET quantity = quantity + 10 WHERE quantity < 50;

-- 14 Apply 5% extra tax
SELECT id, total_amount * 1.05 AS taxed_amount FROM orders;

-- 15 Difference between max and min price
SELECT MAX(price) - MIN(price) AS price_range FROM products;

-- 16 Multiply by 1.1 and round to 2 decimals
SELECT name, ROUND(price*1.1,2) AS new_price FROM products;

-- 17 Integer division quantity ÷ 3
SELECT name, FLOOR(quantity/3) AS div3 FROM products;

-- 18 Total revenue per product
SELECT name, price * quantity AS revenue FROM products;

-- 19 Profit assuming cost = price*0.7
SELECT name, price*quantity - (price*0.7*quantity) AS profit FROM products;

-- 20 Percentage of product quantity in total stock
SELECT name, (quantity / (SELECT SUM(quantity) FROM products) * 100) AS stock_percent FROM products;

-- 21 Conditional price increase
SELECT name,
       price + CASE WHEN price < 500 THEN 10 ELSE 5 END AS new_price
FROM products;

-- 22 Compounded price increase
SELECT name, price * 1.05 * 1.02 AS compounded_price FROM products;

-- 23 Sequential discounts 10% then 5%
SELECT name, price * 0.90 * 0.95 AS price_after_discounts FROM products;

-- 24 Price difference percentage
SELECT p1.name AS product1, p2.name AS product2,
       ABS(p1.price - p2.price)/GREATEST(p1.price,p2.price)*100 AS diff_percent
FROM products p1 CROSS JOIN products p2
WHERE p1.id < p2.id;

-- 25 Top 3 products by total value
SELECT name, price*quantity AS total_value
FROM products
ORDER BY total_value DESC
LIMIT 3;

💡 TIP:

MOD() → remainder
FLOOR() → integer division
ROUND(x,2) → round to 2 decimals
CASE WHEN → conditional arithmetic

===============================

Topic 3: Modifying Tables (ALTER, ADD, DROP, etc.), with 25 questions + solutions, from basic → advanced, in detailed, interview-ready style.

Assume table:

products(id INT PRIMARY KEY, name VARCHAR(50), price DECIMAL(10,2), quantity INT)
users(id INT PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(100))
🚀 TOPIC 3: MODIFYING TABLES – 25 QUESTIONS
🔹 BASIC (1–8)
Add a new column discount to products
Drop column quantity from products
Rename column price to product_price
Change column data type product_price to INT
Add multiple columns created_at (DATETIME) and updated_at (DATETIME)
Drop multiple columns first_name and last_name from users
Rename table products to items
Rename table users to customers
🔹 INTERMEDIATE (9–17)
Set default value of quantity to 0
Set discount default value to 5
Make column email NOT NULL
Make column product_price allow NULL
Add a unique constraint on email
Drop unique constraint on email
Add a primary key on users(id) (if missing)
Drop primary key on users
Add auto_increment to id in products
🔹 ADVANCED (18–25)
Add foreign key user_id in orders referencing users(id)
Drop foreign key from orders
Change column order (move discount after price)
Change column name and type together (quantity → stock INT)
Add CHECK constraint for product_price > 0
Drop CHECK constraint on product_price
Modify table to add multiple constraints: NOT NULL + DEFAULT
Add comment to column discount
🔹 SOLUTIONS
-- 1 Add new column discount
ALTER TABLE products ADD COLUMN discount DECIMAL(5,2);

-- 2 Drop column quantity
ALTER TABLE products DROP COLUMN quantity;

-- 3 Rename column price to product_price
ALTER TABLE products CHANGE COLUMN price product_price DECIMAL(10,2);

-- 4 Change column type product_price to INT
ALTER TABLE products MODIFY COLUMN product_price INT;

-- 5 Add multiple columns
ALTER TABLE products 
ADD COLUMN created_at DATETIME,
ADD COLUMN updated_at DATETIME;

-- 6 Drop multiple columns
ALTER TABLE users 
DROP COLUMN first_name,
DROP COLUMN last_name;

-- 7 Rename table products to items
RENAME TABLE products TO items;

-- 8 Rename table users to customers
RENAME TABLE users TO customers;

-- 9 Set default value of quantity to 0
ALTER TABLE products MODIFY COLUMN quantity INT DEFAULT 0;

-- 10 Set discount default to 5
ALTER TABLE products MODIFY COLUMN discount DECIMAL(5,2) DEFAULT 5;

-- 11 Make column email NOT NULL
ALTER TABLE users MODIFY COLUMN email VARCHAR(100) NOT NULL;

-- 12 Allow product_price to be NULL
ALTER TABLE products MODIFY COLUMN product_price DECIMAL(10,2) NULL;

-- 13 Add unique constraint on email
ALTER TABLE users ADD UNIQUE (email);

-- 14 Drop unique constraint on email
ALTER TABLE users DROP INDEX email;

-- 15 Add primary key on users(id)
ALTER TABLE users ADD PRIMARY KEY(id);

-- 16 Drop primary key on users
ALTER TABLE users DROP PRIMARY KEY;

-- 17 Add auto_increment to id
ALTER TABLE products MODIFY COLUMN id INT AUTO_INCREMENT;

-- 18 Add foreign key user_id in orders
ALTER TABLE orders 
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id);

-- 19 Drop foreign key from orders
ALTER TABLE orders DROP FOREIGN KEY fk_user;

-- 20 Change column order (move discount after price)
ALTER TABLE products MODIFY COLUMN discount DECIMAL(5,2) AFTER product_price;

-- 21 Change column name and type together
ALTER TABLE products CHANGE COLUMN quantity stock INT;

-- 22 Add CHECK constraint product_price > 0
ALTER TABLE products ADD CONSTRAINT chk_price CHECK (product_price > 0);

-- 23 Drop CHECK constraint
ALTER TABLE products DROP CHECK chk_price;

-- 24 Add multiple constraints: NOT NULL + DEFAULT
ALTER TABLE products 
MODIFY COLUMN stock INT NOT NULL DEFAULT 0;

-- 25 Add comment to column discount
ALTER TABLE products MODIFY COLUMN discount DECIMAL(5,2) DEFAULT 5 COMMENT 'Discount in %';

💡 TIPs / INTERVIEW NOTES

ALTER TABLE → versatile: ADD, DROP, MODIFY, CHANGE, RENAME
CHANGE COLUMN → rename + type
MODIFY COLUMN → only type / constraints
Constraints: UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, NOT NULL
Order of columns can be changed with AFTER column_name
Comments: useful for documentation (COMMENT '...')

================================================================
Topic 4: CRUD Operations (INSERT, UPDATE, DELETE, SELECT) — 25+ coding questions with solutions, from basic → advanced, interview-ready.

Assume tables:

products(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), price DECIMAL(10,2), quantity INT, discount DECIMAL(5,2))
users(id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(100))
orders(id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, product_id INT, quantity INT, total_amount DECIMAL(10,2))
🚀 TOPIC 4: CRUD OPERATIONS – 25+ QUESTIONS
🔹 BASIC (INSERT / SELECT / UPDATE / DELETE)
Insert a new product
Insert multiple products at once
Insert a new user
Select all products
Select product name and price only
Select products with price > 500
Select users with first name starting with 'A'
Update product price by +50
🔹 INTERMEDIATE
Update quantity by 10 where quantity < 50
Delete products with price < 100
Delete user with id = 5
Select products in ascending price order
Select top 5 expensive products
Count total products
Count products with discount > 10
Sum of all product quantities
Average price of products
🔹 ADVANCED
Select users along with total orders (JOIN)
Insert order with calculated total_amount
Update total_amount in orders after price change
Delete orders older than a certain date
Select products with stock < 10 (low stock alert)
Select users who never placed an order
Select top 3 users by total order value
Update multiple columns in a single query (price & discount)
Upsert: Insert product if not exists, else update price
Delete duplicate products keeping one
🔹 SOLUTIONS
-- 1 Insert a new product
INSERT INTO products(name, price, quantity, discount)
VALUES('Laptop', 55000, 10, 5);

-- 2 Insert multiple products
INSERT INTO products(name, price, quantity, discount)
VALUES
('Mouse', 500, 50, 0),
('Keyboard', 1200, 30, 5),
('Monitor', 8000, 15, 10);

-- 3 Insert a new user
INSERT INTO users(first_name, last_name, email)
VALUES('Ajay','Sharma','ajay@example.com');

-- 4 Select all products
SELECT * FROM products;

-- 5 Select product name and price
SELECT name, price FROM products;

-- 6 Select products with price > 500
SELECT * FROM products WHERE price > 500;

-- 7 Select users with first name starting with 'A'
SELECT * FROM users WHERE first_name LIKE 'A%';

-- 8 Update product price by +50
UPDATE products SET price = price + 50 WHERE id = 1;

-- 9 Update quantity by 10 where quantity < 50
UPDATE products SET quantity = quantity + 10 WHERE quantity < 50;

-- 10 Delete products with price < 100
DELETE FROM products WHERE price < 100;

-- 11 Delete user with id = 5
DELETE FROM users WHERE id = 5;

-- 12 Select products in ascending price order
SELECT * FROM products ORDER BY price ASC;

-- 13 Select top 5 expensive products
SELECT * FROM products ORDER BY price DESC LIMIT 5;

-- 14 Count total products
SELECT COUNT(*) AS total_products FROM products;

-- 15 Count products with discount > 10
SELECT COUNT(*) AS discounted_products FROM products WHERE discount > 10;

-- 16 Sum of all product quantities
SELECT SUM(quantity) AS total_quantity FROM products;

-- 17 Average price of products
SELECT AVG(price) AS avg_price FROM products;

-- 18 Select users along with total orders (JOIN)
SELECT u.first_name, u.last_name, COUNT(o.id) AS total_orders
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- 19 Insert order with calculated total_amount
INSERT INTO orders(user_id, product_id, quantity, total_amount)
SELECT 1, id, 2, price*2 FROM products WHERE name='Laptop';

-- 20 Update total_amount in orders after price change
UPDATE orders o
JOIN products p ON o.product_id = p.id
SET o.total_amount = o.quantity * p.price;

-- 21 Delete orders older than '2026-01-01'
DELETE FROM orders WHERE created_at < '2026-01-01';

-- 22 Select products with stock < 10
SELECT * FROM products WHERE quantity < 10;

-- 23 Select users who never placed an order
SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- 24 Select top 3 users by total order value
SELECT u.first_name, u.last_name, SUM(o.total_amount) AS total_value
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY total_value DESC
LIMIT 3;

-- 25 Update multiple columns in a single query (price & discount)
UPDATE products SET price = price + 100, discount = discount + 5 WHERE id = 2;

-- 26 Upsert: Insert if not exists, else update price
INSERT INTO products(name, price, quantity, discount)
VALUES('Tablet',15000,5,5)
ON DUPLICATE KEY UPDATE price=VALUES(price);

-- 27 Delete duplicate products keeping one
DELETE p1 FROM products p1
INNER JOIN products p2
WHERE p1.name = p2.name AND p1.id > p2.id;

💡 INTERVIEW NOTES

INSERT → single, multiple, upsert (ON DUPLICATE KEY UPDATE)
UPDATE → single/multiple columns, with JOIN for dependent tables
DELETE → with condition, join, or duplicates
SELECT → aggregate + JOIN + GROUP BY + ORDER BY + LIMIT
Always check constraints before DELETE (foreign keys)

========================================================
Topic 5: Aggregate Functions (SUM, AVG, COUNT, MIN, MAX, etc.) — 25+ coding questions + solutions, from basic → advanced, interview-ready.

Assume tables:

products(id INT PRIMARY KEY, name VARCHAR(50), price DECIMAL(10,2), quantity INT, discount DECIMAL(5,2))
orders(id INT PRIMARY KEY, user_id INT, product_id INT, quantity INT, total_amount DECIMAL(10,2))
users(id INT PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), email VARCHAR(100))
🚀 TOPIC 5: AGGREGATE FUNCTIONS – 25+ QUESTIONS
🔹 BASIC (1–8)
Count total products
Count total users
Count distinct product names
Sum of all product quantities
Sum of total_amount in orders
Average price of products
Minimum product price
Maximum product price
🔹 INTERMEDIATE (9–17)
Average quantity per product
Sum of discounts of all products
Count users who placed at least 1 order
Count orders per user
Maximum total_amount in orders
Minimum total_amount in orders
Average order value per user
Total revenue from all orders
Count products with quantity > 50
🔹 ADVANCED (18–25)
Total orders and total revenue per user
Average discount per product category (assume column category)
Count products per price range (e.g., <500, 500-1000, >1000)
Top 3 products by total revenue
Users with maximum total order value
Total quantity sold per product
Average order value for users with >5 orders
Percentage contribution of each product to total revenue
🔹 SOLUTIONS
-- 1 Count total products
SELECT COUNT(*) AS total_products FROM products;

-- 2 Count total users
SELECT COUNT(*) AS total_users FROM users;

-- 3 Count distinct product names
SELECT COUNT(DISTINCT name) AS distinct_products FROM products;

-- 4 Sum of all product quantities
SELECT SUM(quantity) AS total_quantity FROM products;

-- 5 Sum of total_amount in orders
SELECT SUM(total_amount) AS total_revenue FROM orders;

-- 6 Average price of products
SELECT AVG(price) AS avg_price FROM products;

-- 7 Minimum product price
SELECT MIN(price) AS min_price FROM products;

-- 8 Maximum product price
SELECT MAX(price) AS max_price FROM products;

-- 9 Average quantity per product
SELECT AVG(quantity) AS avg_quantity FROM products;

-- 10 Sum of discounts of all products
SELECT SUM(discount) AS total_discount FROM products;

-- 11 Count users who placed at least 1 order
SELECT COUNT(DISTINCT user_id) AS users_with_orders FROM orders;

-- 12 Count orders per user
SELECT user_id, COUNT(*) AS total_orders
FROM orders
GROUP BY user_id;

-- 13 Maximum total_amount in orders
SELECT MAX(total_amount) AS max_order FROM orders;

-- 14 Minimum total_amount in orders
SELECT MIN(total_amount) AS min_order FROM orders;

-- 15 Average order value per user
SELECT user_id, AVG(total_amount) AS avg_order_value
FROM orders
GROUP BY user_id;

-- 16 Total revenue from all orders
SELECT SUM(total_amount) AS total_revenue FROM orders;

-- 17 Count products with quantity > 50
SELECT COUNT(*) AS high_stock_products FROM products WHERE quantity > 50;

-- 18 Total orders and revenue per user
SELECT user_id, COUNT(*) AS total_orders, SUM(total_amount) AS total_revenue
FROM orders
GROUP BY user_id;

-- 19 Average discount per product category
SELECT category, AVG(discount) AS avg_discount
FROM products
GROUP BY category;

-- 20 Count products per price range
SELECT 
  SUM(CASE WHEN price < 500 THEN 1 ELSE 0 END) AS below_500,
  SUM(CASE WHEN price BETWEEN 500 AND 1000 THEN 1 ELSE 0 END) AS between_500_1000,
  SUM(CASE WHEN price > 1000 THEN 1 ELSE 0 END) AS above_1000
FROM products;

-- 21 Top 3 products by total revenue
SELECT name, price*quantity AS total_revenue
FROM products
ORDER BY total_revenue DESC
LIMIT 3;

-- 22 Users with maximum total order value
SELECT user_id, SUM(total_amount) AS total_revenue
FROM orders
GROUP BY user_id
ORDER BY total_revenue DESC
LIMIT 1;

-- 23 Total quantity sold per product
SELECT product_id, SUM(quantity) AS total_quantity_sold
FROM orders
GROUP BY product_id;

-- 24 Average order value for users with >5 orders
SELECT user_id, AVG(total_amount) AS avg_order
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;

-- 25 Percentage contribution of each product to total revenue
SELECT name, (price*quantity / (SELECT SUM(price*quantity) FROM products)*100) AS revenue_percent
FROM products;

💡 INTERVIEW NOTES / TIPS

Basic functions: COUNT, SUM, AVG, MIN, MAX
Use DISTINCT with COUNT to avoid duplicates
GROUP BY is essential for aggregation per category, user, or product
HAVING filters after aggregation (unlike WHERE)
Conditional aggregation with CASE is powerful (e.g., price ranges)
Subqueries can calculate totals for percentages