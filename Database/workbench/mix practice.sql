-- DATABASE SETUP

CREATE DATABASE practice_db;
USE practice_db;


--  TABLE CREATION

CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(50)
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    salary INT,
    dept_id INT,
    manager_id INT,
    hire_date DATE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(50),
    amount INT,
    order_date DATE
);


-- INSERT DATA

INSERT INTO departments (dept_name) VALUES
('IT'), ('HR'), ('Finance');

INSERT INTO employees (name, salary, dept_id, manager_id, hire_date) VALUES
('A', 90000, 1, NULL, '2022-01-01'),
('B', 70000, 1, 1, '2022-02-01'),
('C', 60000, 2, NULL, '2022-03-01'),
('D', 50000, 2, 3, '2022-04-01'),
('E', 80000, 3, NULL, '2022-05-01'),
('F', 40000, 3, 5, '2022-06-01');

INSERT INTO orders (customer_name, amount, order_date) VALUES
('Ajay', 500, '2024-01-01'),
('Rahul', 800, '2024-01-02'),
('Ajay', 300, '2024-01-03'),
('Simran', 700, '2024-01-04'),
('Rahul', 200, '2024-01-05');


-- BASIC SELECT

SELECT * FROM employees;
SELECT name, salary FROM employees;
SELECT * FROM orders;


-- WHERE 

SELECT * FROM employees WHERE salary > 60000;
SELECT * FROM employees WHERE dept_id = 1;
SELECT * FROM orders WHERE amount > 500;


--  ORDER BY 

SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY dept_id, salary DESC;
SELECT * FROM orders ORDER BY order_date;


--  AGGREGATE FUNCTIONS 

SELECT COUNT(*) FROM employees;
SELECT AVG(salary) FROM employees;
SELECT SUM(amount) FROM orders;


--  GROUP BY

SELECT dept_id, COUNT(*) FROM employees GROUP BY dept_id;
SELECT dept_id, AVG(salary) FROM employees GROUP BY dept_id;
SELECT customer_name, SUM(amount) FROM orders GROUP BY customer_name;


-- HAVING

SELECT dept_id, SUM(salary) AS total
FROM employees
GROUP BY dept_id
HAVING total > 100000;

SELECT customer_name, SUM(amount) AS total
FROM orders
GROUP BY customer_name
HAVING total > 700;


-- JOINS

SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d
ON e.dept_id = d.dept_id;

SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d
ON e.dept_id = d.dept_id;


--  SUBQUERY

SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

SELECT * FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);


-- CASE

SELECT name, salary,
CASE
    WHEN salary >= 80000 THEN 'High'
    WHEN salary >= 50000 THEN 'Medium'
    ELSE 'Low'
END AS category
FROM employees;

SELECT customer_name, amount,
CASE
    WHEN amount >= 700 THEN 'Big'
    ELSE 'Small'
END AS order_type
FROM orders;


-- CTE

WITH high_salary AS (
    SELECT * FROM employees WHERE salary > 60000
)
SELECT * FROM high_salary;

WITH big_orders AS (
    SELECT * FROM orders WHERE amount > 500
)
SELECT * FROM big_orders;


--  WINDOW FUNCTIONS 

SELECT name, dept_id, salary,
       ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rn
FROM employees;

SELECT name, salary,
       RANK() OVER (ORDER BY salary DESC) AS rnk
FROM employees;

SELECT name, salary,
       SUM(salary) OVER (ORDER BY salary) AS running_total
FROM employees;


--  LAG / LEAD

SELECT order_date, amount,
       LAG(amount) OVER (ORDER BY order_date) AS prev_amount
FROM orders;

SELECT order_date, amount,
       LEAD(amount) OVER (ORDER BY order_date) AS next_amount
FROM orders;


-- NTILE 
SELECT name, salary,
       NTILE(3) OVER (ORDER BY salary DESC) AS bucket
FROM employees;

SELECT customer_name, amount,
       NTILE(2) OVER (ORDER BY amount DESC) AS half
FROM orders;


--  UPDATE 

UPDATE employees
SET salary = salary + 5000
WHERE dept_id = 1;

UPDATE orders
SET amount = amount + 100
WHERE customer_name = 'Ajay';


-- DELETE 

DELETE FROM employees WHERE salary < 45000;
DELETE FROM orders WHERE amount < 300;


-- VIEW 

CREATE VIEW high_salary_emp AS
SELECT name, salary FROM employees WHERE salary > 70000;

SELECT * FROM high_salary_emp;