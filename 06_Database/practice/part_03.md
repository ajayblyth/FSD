DATE, DATETIME, TIMESTAMP
Foreign Key
Relationships
=====================================================

🚀 TOPIC 8: DATE, DATETIME, TIMESTAMP

(25+ Coding Questions + Solutions | Interview Level)

📌 TABLES
orders(id, user_id, product_id, total_amount, order_date DATETIME)
users(id, first_name, created_at DATETIME)
products(id, name, created_at DATETIME)
🔹 QUESTIONS
✅ BASIC (1–8)
Get current date
Get current date & time
Extract year from order_date
Extract month from order_date
Extract day from order_date
Format date as 'DD-MM-YYYY'
Find orders placed today
Find users created this year
✅ INTERMEDIATE (9–17)
Find orders in last 7 days
Find orders between two dates
Count orders per month
Find difference in days between two dates
Add 10 days to order_date
Subtract 5 days from order_date
Find users created in last 1 month
Get day name (Monday, etc.)
Get week number from date
✅ ADVANCED (18–26)
Find orders older than 30 days
Group orders by year and month
Find users inactive for last 60 days
Calculate age of records (in days)
Find first order date per user
Find latest order per product
Calculate time difference between two orders
Find orders placed on weekends
Find peak sales day (max revenue day)
🔹 SOLUTIONS
-- 1 Current date
SELECT CURDATE();

-- 2 Current date & time
SELECT NOW();

-- 3 Extract year
SELECT YEAR(order_date) FROM orders;

-- 4 Extract month
SELECT MONTH(order_date) FROM orders;

-- 5 Extract day
SELECT DAY(order_date) FROM orders;

-- 6 Format date
SELECT DATE_FORMAT(order_date, '%d-%m-%Y') FROM orders;

-- 7 Orders placed today
SELECT * FROM orders WHERE DATE(order_date) = CURDATE();

-- 8 Users created this year
SELECT * FROM users WHERE YEAR(created_at) = YEAR(CURDATE());

-- 9 Orders in last 7 days
SELECT * FROM orders 
WHERE order_date >= NOW() - INTERVAL 7 DAY;

-- 10 Orders between two dates
SELECT * FROM orders
WHERE order_date BETWEEN '2026-01-01' AND '2026-03-01';

-- 11 Count orders per month
SELECT MONTH(order_date) AS month, COUNT(*) 
FROM orders
GROUP BY MONTH(order_date);

-- 12 Difference in days
SELECT DATEDIFF('2026-04-01','2026-03-01');

-- 13 Add 10 days
SELECT DATE_ADD(order_date, INTERVAL 10 DAY) FROM orders;

-- 14 Subtract 5 days
SELECT DATE_SUB(order_date, INTERVAL 5 DAY) FROM orders;

-- 15 Users created last 1 month
SELECT * FROM users
WHERE created_at >= NOW() - INTERVAL 1 MONTH;

-- 16 Day name
SELECT DAYNAME(order_date) FROM orders;

-- 17 Week number
SELECT WEEK(order_date) FROM orders;

-- 18 Orders older than 30 days
SELECT * FROM orders
WHERE order_date < NOW() - INTERVAL 30 DAY;

-- 19 Group by year & month
SELECT YEAR(order_date) AS yr, MONTH(order_date) AS mon, COUNT(*)
FROM orders
GROUP BY yr, mon;

-- 20 Users inactive for last 60 days
SELECT u.id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id
HAVING MAX(o.order_date) < NOW() - INTERVAL 60 DAY;

-- 21 Age of records (days)
SELECT id, DATEDIFF(NOW(), order_date) AS age_days
FROM orders;

-- 22 First order date per user
SELECT user_id, MIN(order_date)
FROM orders
GROUP BY user_id;

-- 23 Latest order per product
SELECT product_id, MAX(order_date)
FROM orders
GROUP BY product_id;

-- 24 Time difference between two dates
SELECT TIMESTAMPDIFF(HOUR, '2026-04-01 10:00:00', '2026-04-01 15:00:00');

-- 25 Weekend orders
SELECT * FROM orders
WHERE DAYOFWEEK(order_date) IN (1,7);

-- 26 Peak sales day
SELECT DATE(order_date) AS day, SUM(total_amount) AS revenue
FROM orders
GROUP BY day
ORDER BY revenue DESC
LIMIT 1;
💡 INTERVIEW NOTES (VERY IMPORTANT)
🔥 Most Important Functions:
NOW() → current date + time
CURDATE() → only date
DATE_FORMAT() → formatting
DATEDIFF() → days difference
TIMESTAMPDIFF() → flexible (hour, min, etc.)
🔥 KEY CONCEPTS
Use INTERVAL for date arithmetic
Always wrap datetime with DATE() when comparing only date
GROUP BY YEAR(), MONTH() → common pattern
Weekend logic → DAYOFWEEK()
Time-based filtering → very common in real projects

============================================================================================
🚀 TOPIC 9: FOREIGN KEY

(25+ Coding Questions + Solutions | Interview Level)

📌 TABLES
users(id INT PRIMARY KEY, name VARCHAR(50))
products(id INT PRIMARY KEY, name VARCHAR(50))
orders(id INT PRIMARY KEY, user_id INT, product_id INT)
🔹 QUESTIONS
✅ BASIC (1–8)
Create orders table with foreign keys
Add foreign key on user_id
Add foreign key on product_id
Show table structure with foreign keys
Insert valid record in orders
Try inserting invalid foreign key (understand error)
Delete parent record (observe restriction)
Update parent primary key (check behavior)
✅ INTERMEDIATE (9–17)
Add foreign key with ON DELETE CASCADE
Add foreign key with ON DELETE SET NULL
Add foreign key with ON UPDATE CASCADE
Drop foreign key constraint
Find all foreign keys in a database
Disable foreign key checks temporarily
Enable foreign key checks again
Insert multiple records respecting FK
Delete child records before parent
✅ ADVANCED (18–26)
Create orders table with all constraints properly
Prevent deletion using RESTRICT
Insert data in correct order (parent → child)
Identify orphan records (invalid FK references)
Fix orphan records
Self-referencing foreign key (employee-manager)
Multiple foreign keys in one table
Join tables using foreign key relationships
Design foreign key with composite key
🔹 SOLUTIONS
-- 1 Create orders with foreign keys
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  product_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 2 Add foreign key on user_id
ALTER TABLE orders
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);

-- 3 Add foreign key on product_id
ALTER TABLE orders
ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id);

-- 4 Show structure
DESCRIBE orders;

-- 5 Insert valid record
INSERT INTO orders VALUES (1, 1, 1);

-- 6 Insert invalid FK (will fail)
INSERT INTO orders VALUES (2, 999, 1);

-- 7 Delete parent (fails if child exists)
DELETE FROM users WHERE id = 1;

-- 8 Update parent key (depends on ON UPDATE rule)
UPDATE users SET id = 10 WHERE id = 1;

-- 9 ON DELETE CASCADE
ALTER TABLE orders
ADD CONSTRAINT fk_user2 FOREIGN KEY(user_id)
REFERENCES users(id)
ON DELETE CASCADE;

-- 10 ON DELETE SET NULL
ALTER TABLE orders
ADD CONSTRAINT fk_user3 FOREIGN KEY(user_id)
REFERENCES users(id)
ON DELETE SET NULL;

-- 11 ON UPDATE CASCADE
ALTER TABLE orders
ADD CONSTRAINT fk_user4 FOREIGN KEY(user_id)
REFERENCES users(id)
ON UPDATE CASCADE;

-- 12 Drop foreign key
ALTER TABLE orders DROP FOREIGN KEY fk_user;

-- 13 Find all foreign keys
SELECT *
FROM information_schema.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_NAME IS NOT NULL;

-- 14 Disable FK checks
SET FOREIGN_KEY_CHECKS = 0;

-- 15 Enable FK checks
SET FOREIGN_KEY_CHECKS = 1;

-- 16 Insert multiple valid records
INSERT INTO orders VALUES
(3,1,1),
(4,2,2);

-- 17 Delete child before parent
DELETE FROM orders WHERE user_id = 1;
DELETE FROM users WHERE id = 1;

-- 18 Proper design
CREATE TABLE orders (
 id INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT,
 product_id INT,
 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
 FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 19 Restrict delete
ALTER TABLE orders
ADD CONSTRAINT fk_restrict FOREIGN KEY(user_id)
REFERENCES users(id)
ON DELETE RESTRICT;

-- 20 Correct insert order
INSERT INTO users VALUES (1,'Ajay');
INSERT INTO products VALUES (1,'Laptop');
INSERT INTO orders VALUES (1,1,1);

-- 21 Find orphan records
SELECT *
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;

-- 22 Fix orphan records (delete)
DELETE o FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;

-- 23 Self-referencing FK
CREATE TABLE employees (
 id INT PRIMARY KEY,
 name VARCHAR(50),
 manager_id INT,
 FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- 24 Multiple FKs
CREATE TABLE payments (
 id INT PRIMARY KEY,
 user_id INT,
 order_id INT,
 FOREIGN KEY (user_id) REFERENCES users(id),
 FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 25 Join using FK
SELECT u.name, p.name
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id;

-- 26 Composite FK
CREATE TABLE order_items (
 order_id INT,
 product_id INT,
 PRIMARY KEY(order_id, product_id),
 FOREIGN KEY(order_id) REFERENCES orders(id),
 FOREIGN KEY(product_id) REFERENCES products(id)
);
💡 INTERVIEW NOTES (VERY IMPORTANT)
🔥 KEY RULES
Foreign Key → ensures referential integrity
Child table depends on Parent table
Cannot insert child without parent
🔥 ON DELETE / UPDATE OPTIONS
Action	Meaning
CASCADE	Auto delete/update child
SET NULL	Set FK to NULL
RESTRICT	Prevent action
NO ACTION	Same as RESTRICT
🔥 MOST ASKED
Difference: CASCADE vs RESTRICT
Orphan records
Self-referencing FK
Composite keys
====================================================================================
🚀 TOPIC 10: RELATIONSHIPS (1–1, 1–M, M–M)

(25+ Coding Questions + Solutions | Real-world + Interview Level)

📌 TYPES OF RELATIONSHIPS
1️⃣ One-to-One (1–1)

👉 One record in A ↔ One record in B

2️⃣ One-to-Many (1–M)

👉 One record in A → Many in B

3️⃣ Many-to-Many (M–M)

👉 Many in A ↔ Many in B (via junction table)

📌 TABLE DESIGN
-- 1-1
users(id, name)
user_profiles(id, user_id UNIQUE, address)

-- 1-M
customers(id, name)
orders(id, customer_id, total)

-- M-M
students(id, name)
courses(id, name)
student_courses(student_id, course_id)
🔹 QUESTIONS
✅ BASIC (1–8)
Create 1–1 relationship (users ↔ profiles)
Create 1–M relationship (customers → orders)
Create M–M relationship (students ↔ courses)
Insert data in 1–1 tables
Insert data in 1–M tables
Insert data in M–M tables
Fetch user with profile
Fetch customer with orders
✅ INTERMEDIATE (9–17)
Fetch all students with their courses
Count orders per customer
Find customers with no orders
Find students enrolled in more than 2 courses
Fetch courses with number of students
Find users without profiles
Fetch latest order per customer
Find students not enrolled in any course
Count total enrollments per course
✅ ADVANCED (18–26)
Top customer by total order amount
Students enrolled in all courses
Customers who ordered multiple products
Courses with highest enrollment
Users and profile (LEFT JOIN handling NULL)
Delete parent in 1–M with CASCADE
Many-to-many aggregation (total students per course)
Find duplicate enrollments
Complex join: students + courses + count
🔹 SOLUTIONS
-- 1 Create 1-1
CREATE TABLE user_profiles (
 id INT PRIMARY KEY,
 user_id INT UNIQUE,
 address VARCHAR(100),
 FOREIGN KEY(user_id) REFERENCES users(id)
);

-- 2 Create 1-M
CREATE TABLE orders (
 id INT PRIMARY KEY,
 customer_id INT,
 total DECIMAL(10,2),
 FOREIGN KEY(customer_id) REFERENCES customers(id)
);

-- 3 Create M-M
CREATE TABLE student_courses (
 student_id INT,
 course_id INT,
 PRIMARY KEY(student_id, course_id),
 FOREIGN KEY(student_id) REFERENCES students(id),
 FOREIGN KEY(course_id) REFERENCES courses(id)
);

-- 4 Insert 1-1
INSERT INTO users VALUES (1,'Ajay');
INSERT INTO user_profiles VALUES (1,1,'Bangalore');

-- 5 Insert 1-M
INSERT INTO customers VALUES (1,'Ram');
INSERT INTO orders VALUES (1,1,500);

-- 6 Insert M-M
INSERT INTO students VALUES (1,'A');
INSERT INTO courses VALUES (1,'Java');
INSERT INTO student_courses VALUES (1,1);

-- 7 User with profile
SELECT u.name, p.address
FROM users u
JOIN user_profiles p ON u.id = p.user_id;

-- 8 Customer with orders
SELECT c.name, o.total
FROM customers c
JOIN orders o ON c.id = o.customer_id;

-- 9 Students with courses
SELECT s.name, c.name
FROM students s
JOIN student_courses sc ON s.id = sc.student_id
JOIN courses c ON sc.course_id = c.id;

-- 10 Orders per customer
SELECT customer_id, COUNT(*) 
FROM orders
GROUP BY customer_id;

-- 11 Customers with no orders
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;

-- 12 Students >2 courses
SELECT student_id, COUNT(*) 
FROM student_courses
GROUP BY student_id
HAVING COUNT(*) > 2;

-- 13 Courses with student count
SELECT course_id, COUNT(*) 
FROM student_courses
GROUP BY course_id;

-- 14 Users without profiles
SELECT u.*
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE p.id IS NULL;

-- 15 Latest order per customer
SELECT customer_id, MAX(total)
FROM orders
GROUP BY customer_id;

-- 16 Students not enrolled
SELECT s.*
FROM students s
LEFT JOIN student_courses sc ON s.id = sc.student_id
WHERE sc.student_id IS NULL;

-- 17 Total enrollments per course
SELECT course_id, COUNT(*) 
FROM student_courses
GROUP BY course_id;

-- 18 Top customer by spending
SELECT customer_id, SUM(total) AS total_spent
FROM orders
GROUP BY customer_id
ORDER BY total_spent DESC
LIMIT 1;

-- 19 Students in all courses
SELECT student_id
FROM student_courses
GROUP BY student_id
HAVING COUNT(DISTINCT course_id) = (SELECT COUNT(*) FROM courses);

-- 20 Customers ordering multiple products (concept)
SELECT customer_id, COUNT(DISTINCT id)
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 1;

-- 21 Course with highest enrollment
SELECT course_id, COUNT(*) AS total
FROM student_courses
GROUP BY course_id
ORDER BY total DESC
LIMIT 1;

-- 22 LEFT JOIN (handle NULL)
SELECT u.name, IFNULL(p.address,'No Address')
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id;

-- 23 Delete with CASCADE (design)
ALTER TABLE orders
ADD CONSTRAINT fk_customer FOREIGN KEY(customer_id)
REFERENCES customers(id)
ON DELETE CASCADE;

-- 24 Aggregation in M-M
SELECT c.name, COUNT(sc.student_id)
FROM courses c
JOIN student_courses sc ON c.id = sc.course_id
GROUP BY c.id;

-- 25 Duplicate enrollments
SELECT student_id, course_id, COUNT(*)
FROM student_courses
GROUP BY student_id, course_id
HAVING COUNT(*) > 1;

-- 26 Complex join
SELECT s.name, COUNT(sc.course_id) AS total_courses
FROM students s
LEFT JOIN student_courses sc ON s.id = sc.student_id
GROUP BY s.id;
💡 INTERVIEW NOTES (VERY IMPORTANT)
🔥 RELATIONSHIP SUMMARY
Type	Example	Key Point
1–1	User–Profile	FK + UNIQUE
1–M	Customer–Orders	FK in child
M–M	Students–Courses	Junction table
🔥 MOST ASKED
Difference: 1-M vs M-M
Why junction table needed
How to design FK constraints
LEFT JOIN vs INNER JOIN in relationships
Handling NULL cases
🎯 FINAL SUMMARY (YOUR SQL ROADMAP COMPLETE)

You now covered:

✔ String Functions
✔ Arithmetic
✔ Table Modifications
✔ CRUD
✔ Aggregates
✔ GROUP BY
✔ HAVING
✔ DATE functions
✔ Foreign Keys
✔ Relationships