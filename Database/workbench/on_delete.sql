-- Assignment: 
-- 1st:
-- create table, customers, orders, order_items

-- create customer table

-- in orders have a customer id

-- order_items will have a orders id

-- 2nd task:
-- customer will have 2 child tables


show DATABASES;
CREATE DATABASE order_system;
USE order_system;

CREATE TABLE customers(
customer_id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
email VARCHAR(30) UNIQUE,
phone VARCHAR(15)
);
CREATE TABLE orders(
order_id INT PRIMARY KEY auto_increment,
order_date DATE,
customer_id INT ,
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
ON DELETE RESTRICT
);

CREATE TABLE order_items(
item_id INT PRIMARY KEY auto_increment,
product_name VARCHAR (30),
quantity INT,
price DECIMAL(10,2),
order_id INT,
FOREIGN KEY(order_id) REFERENCES orders(order_id)
ON DELETE CASCADE
 );
 SHOW TABLES;
 describe customers;
 INSERT INTO customers(name, email, phone) VALUES('ajay', 'aj@gmail.com', '1234567890'),
 ('sonu', 'sn@gmail.com', '1234000890'),
 ('deepak', 'dp@gmail.com', '1234111890');
 
 INSERT INTO orders (order_date, customer_id) VALUES
('2026-03-20', 1),
('2026-03-21', 2),
('2026-03-22', 1);

INSERT INTO order_items (product_name, quantity, price, order_id) VALUES
('Laptop', 1, 55000.00, 1),
('Mouse', 2, 500.00, 1),
('Keyboard', 1, 1500.00, 2),
('Monitor', 1, 12000.00, 3);

SELECT * FROM customers;
SELECT * FROM orders;
SELECT * FROM order_items;

DELETE FROM customers WHERE customer_id = 1;

DELETE FROM orders WHERE order_id = 1;