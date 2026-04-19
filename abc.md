DELIMITTER $$
CREATE PROCEDURE getOrders(In cust_id INT)
BEGIN
SELECT * FROM orders WHERE customer_id  = cust_id;
END$$
DELIMITTER;

==================================
DELIMITTER $$
CREATE PROCEDURE 
