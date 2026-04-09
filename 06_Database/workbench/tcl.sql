 -- TCL PRACTICE


CREATE DATABASE bank_db;
USE bank_db;



CREATE TABLE accounts (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    balance INT
);



INSERT INTO accounts VALUES (1, 'Ajay', 5000);
INSERT INTO accounts VALUES (2, 'Rahul', 3000);



-- Start transaction
BEGIN;

-- Transfer money (example)
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;

-- Check result before commit
SELECT * FROM accounts;

-- Save changes permanently
COMMIT;

---------------------------------------------------------------

-- Example with ROLLBACK
BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;

-- Mistake → undo changes
ROLLBACK;

-- Check data (no change)
SELECT * FROM accounts;

---------------------------------------------------------------

-- Example with SAVEPOINT
BEGIN;

UPDATE accounts SET balance = balance - 200 WHERE id = 1;

SAVEPOINT sp1;

UPDATE accounts SET balance = balance - 300 WHERE id = 1;

ROLLBACK TO sp1;

COMMIT;

-- NOTE:

• BEGIN → start transaction  
• COMMIT → save changes  
• ROLLBACK → undo all  
• SAVEPOINT → undo partially  
---------------------------------------------------------------