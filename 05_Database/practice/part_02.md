TOPICS 
==================================
Aggregate Functions
GROUP BY
HAVING


=======================
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

==============================================================================================================================

🚀 TOPIC 6: GROUP BY (25+ Questions + Solutions)

Assume tables:

products(id, name, price, quantity, category)
users(id, first_name, last_name)
orders(id, user_id, product_id, quantity, total_amount)
🔹 QUESTIONS
✅ BASIC (1–8)
Count number of products per category
Find average price per category
Find total quantity per product
Find maximum price per category
Find minimum price per category
Count number of orders per user
Total order amount per user
Average order amount per user
✅ INTERMEDIATE (9–17)
Total quantity sold per product
Total revenue per product
Count products in each price range (using GROUP BY + CASE)
Find categories having more than 5 products
Find users with more than 3 orders
Find average quantity ordered per product
Find max order value per user
Find min order value per user
Sort categories by total product count
✅ ADVANCED (18–26)
Total revenue per user (JOIN)
Total orders and revenue per product (JOIN)
Top 3 users by total spending
Products with total sales > 100 units
Categories with average price > 1000
Users who spent more than average spending
Percentage contribution of each user to total revenue
Find most sold product (by quantity)
Find category with highest total revenue
🔹 SOLUTIONS
-- 1 Count products per category
SELECT category, COUNT(*) AS total_products
FROM products
GROUP BY category;

-- 2 Average price per category
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category;

-- 3 Total quantity per product
SELECT name, SUM(quantity) AS total_quantity
FROM products
GROUP BY name;

-- 4 Max price per category
SELECT category, MAX(price) AS max_price
FROM products
GROUP BY category;

-- 5 Min price per category
SELECT category, MIN(price) AS min_price
FROM products
GROUP BY category;

-- 6 Orders per user
SELECT user_id, COUNT(*) AS total_orders
FROM orders
GROUP BY user_id;

-- 7 Total order amount per user
SELECT user_id, SUM(total_amount) AS total_spent
FROM orders
GROUP BY user_id;

-- 8 Avg order amount per user
SELECT user_id, AVG(total_amount) AS avg_order
FROM orders
GROUP BY user_id;

-- 9 Total quantity sold per product
SELECT product_id, SUM(quantity) AS total_sold
FROM orders
GROUP BY product_id;

-- 10 Total revenue per product
SELECT product_id, SUM(total_amount) AS revenue
FROM orders
GROUP BY product_id;

-- 11 Price range grouping
SELECT 
  CASE 
    WHEN price < 500 THEN 'Low'
    WHEN price BETWEEN 500 AND 1000 THEN 'Medium'
    ELSE 'High'
  END AS price_range,
  COUNT(*) AS total_products
FROM products
GROUP BY price_range;

-- 12 Categories having >5 products
SELECT category, COUNT(*) 
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- 13 Users with >3 orders
SELECT user_id, COUNT(*) 
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 3;

-- 14 Avg quantity ordered per product
SELECT product_id, AVG(quantity) 
FROM orders
GROUP BY product_id;

-- 15 Max order value per user
SELECT user_id, MAX(total_amount)
FROM orders
GROUP BY user_id;

-- 16 Min order value per user
SELECT user_id, MIN(total_amount)
FROM orders
GROUP BY user_id;

-- 17 Sort categories by count
SELECT category, COUNT(*) AS total
FROM products
GROUP BY category
ORDER BY total DESC;

-- 18 Total revenue per user (JOIN)
SELECT u.id, u.first_name, SUM(o.total_amount) AS revenue
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- 19 Orders & revenue per product (JOIN)
SELECT p.name, COUNT(o.id) AS total_orders, SUM(o.total_amount) AS revenue
FROM products p
JOIN orders o ON p.id = o.product_id
GROUP BY p.id;

-- 20 Top 3 users by spending
SELECT user_id, SUM(total_amount) AS total_spent
FROM orders
GROUP BY user_id
ORDER BY total_spent DESC
LIMIT 3;

-- 21 Products with total sales > 100
SELECT product_id, SUM(quantity) AS total_sold
FROM orders
GROUP BY product_id
HAVING total_sold > 100;

-- 22 Categories with avg price > 1000
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING avg_price > 1000;

-- 23 Users spending more than average
SELECT user_id, SUM(total_amount) AS total_spent
FROM orders
GROUP BY user_id
HAVING total_spent > (SELECT AVG(total_amount) FROM orders);

-- 24 Percentage contribution per user
SELECT user_id,
       SUM(total_amount) / (SELECT SUM(total_amount) FROM orders) * 100 AS percent
FROM orders
GROUP BY user_id;

-- 25 Most sold product
SELECT product_id, SUM(quantity) AS total_sold
FROM orders
GROUP BY product_id
ORDER BY total_sold DESC
LIMIT 1;

-- 26 Category with highest revenue
SELECT p.category, SUM(o.total_amount) AS revenue
FROM products p
JOIN orders o ON p.id = o.product_id
GROUP BY p.category
ORDER BY revenue DESC
LIMIT 1;
💡 INTERVIEW NOTES (VERY IMPORTANT)
GROUP BY → groups rows before aggregation
Every non-aggregated column must be in GROUP BY
WHERE → filters before grouping
HAVING → filters after grouping
JOIN + GROUP BY → most asked in interviews
Use aliases (AS) for readability
Combine with ORDER BY, LIMIT for top results

========================================================
🚀 TOPIC 7: HAVING (25+ Questions + Solutions)

👉 Key Idea:

WHERE → filters rows before grouping
HAVING → filters after GROUP BY (on aggregated data)
📌 TABLES
products(id, name, price, quantity, category)
orders(id, user_id, product_id, quantity, total_amount)
users(id, first_name, last_name)
🔹 QUESTIONS
✅ BASIC (1–8)
Categories having more than 5 products
Users having more than 3 orders
Products with total quantity > 100
Users with total spending > 5000
Categories with average price > 1000
Products with max price > 2000
Users with minimum order amount < 100
Categories with total quantity < 50
✅ INTERMEDIATE (9–17)
Products with total revenue > 10000
Users with average order value > 2000
Categories having at least 3 products with price > 500
Users having exactly 2 orders
Products whose total sold quantity is between 50 and 200
Categories where max price > avg price
Users whose total spending is less than overall average spending
Products with more than 5 orders
Categories with sum(quantity) > avg(quantity)
✅ ADVANCED (18–26)
Top users whose total spending > 2× average spending
Products contributing >10% of total revenue
Users who placed orders for more than 3 different products
Categories with highest total revenue (filter top ones)
Products whose avg order quantity > overall avg quantity
Users with increasing order amounts (logic-based grouping)
Categories having both high and low priced products
Users with no small orders (all orders > 500)
Products with consistent sales (min qty > 10)
🔹 SOLUTIONS
-- 1 Categories having >5 products
SELECT category, COUNT(*) 
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- 2 Users having >3 orders
SELECT user_id, COUNT(*)
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 3;

-- 3 Products with total quantity >100
SELECT product_id, SUM(quantity)
FROM orders
GROUP BY product_id
HAVING SUM(quantity) > 100;

-- 4 Users with total spending >5000
SELECT user_id, SUM(total_amount)
FROM orders
GROUP BY user_id
HAVING SUM(total_amount) > 5000;

-- 5 Categories avg price >1000
SELECT category, AVG(price)
FROM products
GROUP BY category
HAVING AVG(price) > 1000;

-- 6 Products with max price >2000
SELECT name, MAX(price)
FROM products
GROUP BY name
HAVING MAX(price) > 2000;

-- 7 Users with min order <100
SELECT user_id, MIN(total_amount)
FROM orders
GROUP BY user_id
HAVING MIN(total_amount) < 100;

-- 8 Categories total quantity <50
SELECT category, SUM(quantity)
FROM products
GROUP BY category
HAVING SUM(quantity) < 50;

-- 9 Products revenue >10000
SELECT product_id, SUM(total_amount)
FROM orders
GROUP BY product_id
HAVING SUM(total_amount) > 10000;

-- 10 Users avg order >2000
SELECT user_id, AVG(total_amount)
FROM orders
GROUP BY user_id
HAVING AVG(total_amount) > 2000;

-- 11 Categories with >=3 products price>500
SELECT category, COUNT(*)
FROM products
WHERE price > 500
GROUP BY category
HAVING COUNT(*) >= 3;

-- 12 Users exactly 2 orders
SELECT user_id, COUNT(*)
FROM orders
GROUP BY user_id
HAVING COUNT(*) = 2;

-- 13 Products total qty between 50 and 200
SELECT product_id, SUM(quantity)
FROM orders
GROUP BY product_id
HAVING SUM(quantity) BETWEEN 50 AND 200;

-- 14 Categories where max price > avg price
SELECT category, MAX(price), AVG(price)
FROM products
GROUP BY category
HAVING MAX(price) > AVG(price);

-- 15 Users spending < overall avg
SELECT user_id, SUM(total_amount)
FROM orders
GROUP BY user_id
HAVING SUM(total_amount) < (SELECT AVG(total_amount) FROM orders);

-- 16 Products with >5 orders
SELECT product_id, COUNT(*)
FROM orders
GROUP BY product_id
HAVING COUNT(*) > 5;

-- 17 Categories sum(quantity) > avg(quantity)
SELECT category, SUM(quantity)
FROM products
GROUP BY category
HAVING SUM(quantity) > (SELECT AVG(quantity) FROM products);

-- 18 Users spending >2x avg
SELECT user_id, SUM(total_amount)
FROM orders
GROUP BY user_id
HAVING SUM(total_amount) > 2*(SELECT AVG(total_amount) FROM orders);

-- 19 Products contributing >10% revenue
SELECT product_id,
SUM(total_amount)/(SELECT SUM(total_amount) FROM orders)*100 AS percent
FROM orders
GROUP BY product_id
HAVING percent > 10;

-- 20 Users with >3 different products
SELECT user_id, COUNT(DISTINCT product_id)
FROM orders
GROUP BY user_id
HAVING COUNT(DISTINCT product_id) > 3;

-- 21 Categories with highest revenue
SELECT p.category, SUM(o.total_amount) AS revenue
FROM products p
JOIN orders o ON p.id = o.product_id
GROUP BY p.category
HAVING revenue > 10000;

-- 22 Products avg order qty > overall avg
SELECT product_id, AVG(quantity)
FROM orders
GROUP BY product_id
HAVING AVG(quantity) > (SELECT AVG(quantity) FROM orders);

-- 23 Users with increasing order amounts (basic logic)
SELECT user_id
FROM orders
GROUP BY user_id
HAVING MIN(total_amount) < MAX(total_amount);

-- 24 Categories having both high & low price
SELECT category
FROM products
GROUP BY category
HAVING MIN(price) < 500 AND MAX(price) > 1000;

-- 25 Users with no small orders (all >500)
SELECT user_id
FROM orders
GROUP BY user_id
HAVING MIN(total_amount) > 500;

-- 26 Products with consistent sales
SELECT product_id
FROM orders
GROUP BY product_id
HAVING MIN(quantity) > 10;
💡 INTERVIEW NOTES (VERY IMPORTANT)
HAVING is used only with GROUP BY (mostly)
Cannot use aggregate functions in WHERE → use HAVING
WHERE + HAVING combo is powerful
WHERE filters rows
HAVING filters grouped results
Subqueries are very common with HAVING
COUNT(DISTINCT ...) + HAVING = frequently asked