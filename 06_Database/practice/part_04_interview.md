🚀 50 REAL SQL INTERVIEW QUESTIONS
🔹 BASIC → FILTERING & SELECT
Find all users whose name starts with 'A'
Find products with price between 500 and 1000
Get top 5 highest priced products
Find duplicate records in a table
Fetch second highest salary
Fetch nth highest salary
Find employees with NULL values in any column
Replace NULL values with default value
🔹 STRING + DATA CLEANING
Extract domain from email
Find users with gmail accounts only
Remove duplicate spaces in names
Capitalize first letter of each word
Mask phone number except last 4 digits
Count number of words in a sentence
Reverse a string
Find palindrome strings
🔹 AGGREGATE + GROUP BY
Count number of orders per user
Find total revenue per product
Find average salary per department
Find departments with more than 10 employees
Find highest salary per department
Find second highest salary per department
Find users with more than 5 orders
Find products with total sales > 100 units
🔹 JOINS (VERY IMPORTANT)
Get all users with their orders
Find users who never placed an order
Get products with no sales
Find total revenue per user (JOIN)
Find top 3 customers by spending
Join 3 tables (users, orders, products)
Find duplicate rows using JOIN
Self join: find employees with same salary
🔹 SUBQUERIES
Find employees earning more than average salary
Find products priced above average
Find users with max order amount
Find customers who placed orders above average order value
Find second highest salary using subquery
Find products not ordered yet
Find users whose total spending > overall average
Find employees working in same dept as 'John'
🔹 WINDOW FUNCTIONS (ADVANCED / AMAZON LEVEL)
Rank employees by salary
Dense rank employees by salary
Find running total of sales
Find moving average (last 3 rows)
Find difference between current and previous row
Find top 2 salaries per department
Find first and last order per user
Find duplicate rows using window functions
🔹 REAL BUSINESS SCENARIOS
Find retention users (users ordering again within 30 days)
Find most popular product (highest orders)
🔥 HOW TO USE THIS

👉 Step 1: Try solving yourself
👉 Step 2: Ask me:

“Solve 1–10” OR
“Mock interview me”
🎯 INTERVIEW STRATEGY (IMPORTANT)
60% questions = GROUP BY + JOIN
20% = Subqueries
10% = Window functions (top companies)
10% = tricky logic

======================================================
🚀 SOLUTIONS (1–50)
🔹 BASIC

1. Name starts with A

SELECT * FROM users WHERE name LIKE 'A%';

2. Price between 500–1000

SELECT * FROM products WHERE price BETWEEN 500 AND 1000;

3. Top 5 expensive

SELECT * FROM products ORDER BY price DESC LIMIT 5;

4. Duplicate records

SELECT name, COUNT(*) 
FROM users 
GROUP BY name 
HAVING COUNT(*) > 1;

5. Second highest salary

SELECT MAX(salary) 
FROM employees 
WHERE salary < (SELECT MAX(salary) FROM employees);

6. Nth highest salary

SELECT salary 
FROM employees 
ORDER BY salary DESC 
LIMIT 1 OFFSET n-1;

7. NULL values

SELECT * FROM users WHERE name IS NULL;

8. Replace NULL

SELECT IFNULL(name,'N/A') FROM users;
🔹 STRING

9. Email domain

SELECT SUBSTRING_INDEX(email,'@',-1) FROM users;

10. Gmail users

SELECT * FROM users WHERE email LIKE '%@gmail.com';

11. Remove extra spaces

SELECT TRIM(name) FROM users;

12. Capitalize

SELECT CONCAT(UPPER(LEFT(name,1)),LOWER(SUBSTRING(name,2))) FROM users;

13. Mask phone

SELECT CONCAT('XXXXXX', RIGHT(phone,4)) FROM users;

14. Count words

SELECT LENGTH(name)-LENGTH(REPLACE(name,' ',''))+1 FROM users;

15. Reverse

SELECT REVERSE(name) FROM users;

16. Palindrome

SELECT name FROM users WHERE name = REVERSE(name);
🔹 AGGREGATE

17. Orders per user

SELECT user_id, COUNT(*) FROM orders GROUP BY user_id;

18. Revenue per product

SELECT product_id, SUM(total_amount) FROM orders GROUP BY product_id;

19. Avg salary per dept

SELECT dept_id, AVG(salary) FROM employees GROUP BY dept_id;

20. Dept >10 employees

SELECT dept_id FROM employees GROUP BY dept_id HAVING COUNT(*) > 10;

21. Highest salary per dept

SELECT dept_id, MAX(salary) FROM employees GROUP BY dept_id;

22. Second highest per dept

SELECT dept_id, MAX(salary)
FROM employees e1
WHERE salary < (SELECT MAX(salary) FROM employees e2 WHERE e1.dept_id=e2.dept_id)
GROUP BY dept_id;

23. Users >5 orders

SELECT user_id FROM orders GROUP BY user_id HAVING COUNT(*) > 5;

24. Products sold >100

SELECT product_id FROM orders GROUP BY product_id HAVING SUM(quantity) > 100;
🔹 JOINS

25. Users with orders

SELECT u.*, o.* 
FROM users u 
JOIN orders o ON u.id=o.user_id;

26. Users with no orders

SELECT u.* 
FROM users u 
LEFT JOIN orders o ON u.id=o.user_id 
WHERE o.id IS NULL;

27. Products with no sales

SELECT p.* 
FROM products p 
LEFT JOIN orders o ON p.id=o.product_id 
WHERE o.id IS NULL;

28. Revenue per user

SELECT u.id, SUM(o.total_amount)
FROM users u 
JOIN orders o ON u.id=o.user_id
GROUP BY u.id;

29. Top 3 customers

SELECT user_id, SUM(total_amount) total
FROM orders
GROUP BY user_id
ORDER BY total DESC
LIMIT 3;

30. Join 3 tables

SELECT u.name, p.name, o.total_amount
FROM users u
JOIN orders o ON u.id=o.user_id
JOIN products p ON o.product_id=p.id;

31. Duplicate rows

SELECT a.*
FROM users a
JOIN users b
ON a.name=b.name AND a.id>b.id;

32. Same salary

SELECT e1.*
FROM employees e1
JOIN employees e2
ON e1.salary=e2.salary AND e1.id<>e2.id;
🔹 SUBQUERIES

33. Salary > avg

SELECT * FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);

34. Products > avg price

SELECT * FROM products 
WHERE price > (SELECT AVG(price) FROM products);

35. Max order user

SELECT user_id 
FROM orders 
WHERE total_amount = (SELECT MAX(total_amount) FROM orders);

36. Orders above avg

SELECT * FROM orders 
WHERE total_amount > (SELECT AVG(total_amount) FROM orders);

37. Second highest

SELECT MAX(salary)
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

38. Products not ordered

SELECT * FROM products 
WHERE id NOT IN (SELECT product_id FROM orders);

39. Users spending > avg

SELECT user_id
FROM orders
GROUP BY user_id
HAVING SUM(total_amount) > (SELECT AVG(total_amount) FROM orders);

40. Same dept as John

SELECT * FROM employees
WHERE dept_id = (SELECT dept_id FROM employees WHERE name='John');
🔹 WINDOW FUNCTIONS

41. Rank

SELECT name, RANK() OVER(ORDER BY salary DESC) FROM employees;

42. Dense rank

SELECT name, DENSE_RANK() OVER(ORDER BY salary DESC) FROM employees;

43. Running total

SELECT id, SUM(total_amount) OVER(ORDER BY id) FROM orders;

44. Moving avg

SELECT id, AVG(total_amount) OVER(ORDER BY id ROWS 2 PRECEDING) FROM orders;

45. Diff prev row

SELECT id, total_amount - LAG(total_amount) OVER(ORDER BY id) FROM orders;

46. Top 2 per dept

SELECT * FROM (
 SELECT *, RANK() OVER(PARTITION BY dept_id ORDER BY salary DESC) r
 FROM employees
) t WHERE r<=2;

47. First & last order

SELECT user_id,
FIRST_VALUE(order_date) OVER(PARTITION BY user_id ORDER BY order_date),
LAST_VALUE(order_date) OVER(PARTITION BY user_id ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)
FROM orders;

48. Duplicate rows (window)

SELECT * FROM (
 SELECT *, ROW_NUMBER() OVER(PARTITION BY name ORDER BY id) rn
 FROM users
) t WHERE rn>1;
🔹 REAL SCENARIOS

49. Retention users (30 days)

SELECT DISTINCT o1.user_id
FROM orders o1
JOIN orders o2 
ON o1.user_id=o2.user_id
AND o2.order_date BETWEEN o1.order_date AND o1.order_date + INTERVAL 30 DAY;

50. Most popular product

SELECT product_id, COUNT(*) total
FROM orders
GROUP BY product_id
ORDER BY total DESC
LIMIT 1;
🎯 FINAL INTERVIEW TIP

If you can solve:

JOIN + GROUP BY + HAVING
Subqueries
Window functions

👉 You’re interview ready for 90% SQL rounds