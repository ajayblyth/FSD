# MySQL — Skipped Topics

## 1. COALESCE — pronounced “koh-uh-LES”

**Purpose:** Returns the first non-NULL value.

SELECT COALESCE(phone, 'Not Provided')
FROM users;

If:
phone
9876543210
NULL


Result:
9876543210
Not Provided

Multiple values:

sql
COALESCE(phone, alternate_phone, 'Not Provided')

→ Takes `phone` if NOT NULL → otherwise `alternate_phone` → otherwise `'Not Provided'`.

**Generally used:** Handling NULL values when displaying data or calculating values.

---

# 2. IF

MySQL-specific conditional expression.

sql
SELECT name,
       IF(age >= 18, 'Adult', 'Minor') AS status
FROM users;


**Syntax:**


IF(condition, value_if_true, value_if_false)


**Generally used:** Simple two-way conditions.

---

# 3. CASE

Used when you have **multiple conditions**.

sql
SELECT name, marks,
       CASE
           WHEN marks >= 90 THEN 'A'
           WHEN marks >= 75 THEN 'B'
           WHEN marks >= 50 THEN 'C'
           ELSE 'F'
       END AS grade
FROM students;


Think:


IF    → simple condition
CASE  → multiple conditions


**CASE is more commonly useful in complex queries.**

---

# 4. WHERE vs HAVING

### WHERE

Filters **rows before grouping**.

sql
SELECT *
FROM employees
WHERE salary > 50000;


### HAVING

Filters **groups after GROUP BY**.

sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;

Think:


WHERE   → filter individual rows
HAVING  → filter grouped results


### Important — You can use both

sql
SELECT department, AVG(salary)
FROM employees
WHERE salary > 30000
GROUP BY department
HAVING AVG(salary) > 50000;


### Query flow


FROM
 ↓
WHERE
 ↓
GROUP BY
 ↓
HAVING
 ↓
SELECT
 ↓
ORDER BY


---

# 5. Is GROUP BY mandatory with aggregate functions?

**No.**

This is perfectly valid:

sql
SELECT AVG(salary)
FROM employees;


→ Gives the average of **all employees**.

But if you want an aggregate **for each group**, you need `GROUP BY`.

sql
SELECT department, AVG(salary)
FROM employees
GROUP BY department;


Result conceptually:


IT       65000
HR       52000
Sales    48000


### Important rule


Aggregate alone
→ entire table

Aggregate + GROUP BY
→ one result per group


---

# 6. JOINS

**Purpose:** Combine data from multiple related tables.

Example:


customers
---------
id
name

orders
------
id
customer_id
amount


### INNER JOIN

Only matching records.

sql
SELECT c.name, o.amount
FROM customers c
INNER JOIN orders o
    ON c.id = o.customer_id;


Conceptually:


Customer       Order

   1  ────────  1
   2  ────────  2


If customer `3` has no order → **not shown**.

### LEFT JOIN

Everything from the **left table**, matching data from the right.

sql
SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o
    ON c.id = o.customer_id;


Customer without orders still appears, with `NULL` order data.

### RIGHT JOIN

Everything from the **right table**.

sql
SELECT c.name, o.amount
FROM customers c
RIGHT JOIN orders o
    ON c.id = o.customer_id;


Less commonly used because you can usually rewrite it as a `LEFT JOIN` by switching table order.

### CROSS JOIN

Every row combines with every other row.

If:


A = 3 rows
B = 4 rows


Result:


3 × 4 = 12 rows

SELECT s.student, c.course
FROM students s
CROSS JOIN courses c;

### SELF JOIN

A table joins with itself.

Common example: **employee → manager**.

sql
SELECT e.name AS employee,
       m.name AS manager
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.id;


 Why is it a SELF JOIN?
Because the employees table is used twice:

**Generally used:** Whenever related information is stored in different tables — extremely common in relational databases.

### JOIN quick memory


INNER → only matching
LEFT  → everything from left
RIGHT → everything from right
CROSS → every combination
SELF  → table joined with itself


---

# 7. SET OPERATIONS

Used to combine results of multiple `SELECT` queries.

### UNION

Combines results and **removes duplicates**.

sql
SELECT email FROM customers
UNION
SELECT email FROM employees;


### UNION ALL

Combines results **without removing duplicates**.

sql
SELECT email FROM customers
UNION ALL
SELECT email FROM employees;


Usually:


UNION ALL → faster, keeps duplicates
UNION     → removes duplicates


### Important requirement

Both queries should have compatible:


Number of columns
Corresponding data types


Example:

sql
SELECT name, age FROM students
UNION
SELECT name, age FROM employees;


---

# 8. NORMALIZATION

8. NORMALIZATION

Purpose: Reduce duplicate data and avoid data inconsistency.

Normalization is the process of organizing data in a database into multiple related tables to reduce data redundancy and improve data integrity.

The main idea is:

Store each piece of information in the appropriate place and connect related data using keys instead of repeatedly storing the same data.

Why do we need it?

Without normalization, the same information may be repeated across many rows. This can cause:

Data redundancy → same data stored multiple times.
Update anomaly → changing data in one place but forgetting other places.
Insert anomaly → unable to insert some information without unrelated information.
Delete anomaly → deleting one record accidentally removes other useful information.
Data inconsistency → different rows can contain different versions of the same

8. NORMALIZATION

Purpose: Reduce duplicate data and avoid data inconsistency.

Interview theory / concept

Normalization is the process of organizing data in a database into multiple related tables to reduce data redundancy and improve data integrity.

The main idea is:

Store each piece of information in the appropriate place and connect related data using keys instead of repeatedly storing the same data.

Why do we need it?

Without normalization, the same information may be repeated across many rows. This can cause:

Data redundancy → same data stored multiple times.
Update anomaly → changing data in one place but forgetting other places.
Insert anomaly → unable to insert some information without unrelated information.
Delete anomaly → deleting one record accidentally removes other useful information.
Data inconsistency → different rows can contain different versions of the same.

Anomaly means an unexpected/problematic situation in data caused by poor database design, especially due to duplicated data.
Imagine:


student
------------------------
student_id
student_name
course1
course2
course3


Bad design.

Instead:


students
---------
student_id
student_name

courses
-------
course_id
course_name

student_course
--------------
student_id
course_id


NOTE: Many-to-Many → create a junction table.
students                    courses
---------                   ---------
student_id PK               course_id PK
student_name                course_name
     │                           │
     └──────────┬────────────────┘
                ↓
        student_course
        --------------
        student_id FK
        course_id  FK
        PK(student_id, course_id)

---


## 1NF — First Normal Form

**Rule:** No repeating groups / each cell contains a single value.

Bad:

student_id | courses
1          | SQL, Java, React

Good:

student_id | course
1          | SQL
1          | Java
1          | React


Think:


1NF = Atomic values


---

## 2NF — Second Normal Form

Must already be **1NF**  and every non-key column depends on the entire primary key, not just part of it.
Example:


Simple way

2NF mainly matters when you have a composite primary key.

1NF
 ↓
Remove partial dependency
 ↓
2NF

Partial dependency = a column depends on only part of a composite key.

*A composite key is a primary key made using 2 or more columns together.

Example
student_course
-------------------------
student_id   ← PK part
course_id    ← PK part
student_name
course_name

Primary key:

(student_id, course_id)

But:

student_name → depends only on student_id
course_name  → depends only on course_id

They don't depend on the whole (student_id, course_id).

❌ Not 2NF.

So separate them:

students
--------
student_id PK
student_name

courses
-------
course_id PK
course_name

student_course
--------------
student_id FK
course_id FK
PK(student_id, course_id)

✅ Now 2NF.

Interview definition:

“2NF means the table is in 1NF and every non-key attribute is fully dependent on the whole primary key, eliminating partial dependency.”

Think:


2NF = No partial dependency


---

## 3NF — Third Normal Form
Definition:

A table is in 3NF if it is in 2NF and no non-key column depends on another non-key column.

In simple words:

2NF
 ↓
Remove transitive dependency
 ↓
3NF
Example
employees
-------------------------------
employee_id PK
employee_name
department_id
department_name

Here:

employee_id → department_id
department_id → department_name

So indirectly:

employee_id → department_name

department_name depends on another non-key column (department_id), not directly on the primary key.

❌ Not 3NF.

Convert to 3NF
employees
----------------
employee_id PK
employee_name
department_id FK


departments
----------------
department_id PK
department_name

Now:

employee_id → employee_name
employee_id → department_id

department_id → department_name

Each non-key attribute depends on the key, the whole key, and nothing but the key.

Think:


1NF → Atomic
2NF → No partial dependency
3NF → No transitive dependency


**Generally used:** Database design to reduce duplication and prevent update/insert/delete anomalies.

---

# 9. DENORMALIZATION

Basically the **opposite approach**.

> Intentionally storing some duplicate data to make reading faster.

Instead of:


orders + customers
→ JOIN every time


you might store:


orders
-------------------------
order_id
customer_id
customer_name
amount


`customer_name` is duplicated.

Why?


More storage
    ↓
Less JOIN work
    ↓
Potentially faster reads


**Generally used:** Performance-heavy systems/reporting where reads are much more frequent than updates.


but trade-off is 

Denormalization
     ↓
More duplicated data
     ↓
More storage
     ↓
Need to keep duplicate values consistent
     ↓
Potential update anomalies
---

# 10. VIEWS

A View is a saved SQL query that behaves like a virtual table.

CREATE VIEW:
CREATE VIEW employee_details AS
SELECT name, department, salary
FROM employees
WHERE salary > 50000;

→ View stores the query definition, not normally a separate copy of the result.

USE VIEW:
SELECT *
FROM employee_details;

You can also query it like a table:
SELECT name, salary
FROM employee_details
WHERE salary > 70000;


SEE ALL VIEWS:
SHOW FULL TABLES
WHERE Table_type = 'VIEW';


SEE VIEW DEFINITION:
SHOW CREATE VIEW employee_details;


MODIFY / REPLACE VIEW:
CREATE OR REPLACE VIEW employee_details AS
SELECT name, department, salary
FROM employees
WHERE salary > 60000;


DELETE VIEW:
DROP VIEW employee_details;

→ Deletes the VIEW, NOT the original table/data.


WHY USE VIEWS?

→ Hide complex queries
→ Reuse common queries
→ Simplify reporting
→ Restrict access to specific columns/rows
→ Provide controlled access to underlying data


EXAMPLE — RESTRICT COLUMNS:

Actual table:
employees
-------------------------------
id | name | salary | password

View:
CREATE VIEW employee_public AS
SELECT name, salary
FROM employees;

Then:
SELECT * FROM employee_public;

→ Users accessing this view don't get the password column.


FLOW:

Actual Tables
      ↓
Saved SQL Query
      ↓
    VIEW
      ↓
SELECT * FROM view
      ↓
Data from underlying tables


VIEW vs NORMAL TABLE:

Normal Table → Stores actual data
View         → Stores SQL query/definition and retrieves data from underlying tables


MUST REMEMBER:

CREATE VIEW        → Create view
SELECT FROM view   → Use view
SHOW FULL TABLES   → See views
SHOW CREATE VIEW   → See definition
CREATE OR REPLACE  → Modify view
DROP VIEW          → Delete view


INTERVIEW DEFINITION:

“A view is a virtual table based on a saved SQL query. It is commonly used to simplify complex queries, reuse queries, reporting, and control access to specific data.”
---

# 11. INDEXES

An index helps MySQL **find rows faster**.

### Without index


Search
  ↓
Check row 1
  ↓
Check row 2
  ↓
Check row 3
  ↓
...


### With index


Index
  ↓
Find location quickly
  ↓
Get row


Example:

sql
CREATE INDEX idx_email
ON users(email);


Now:

sql
SELECT *
FROM users
WHERE email = 'abc@gmail.com';


can search using the index.

### Important

Indexes improve:


SELECT / search


but have costs for:


INSERT
UPDATE
DELETE


because indexes also need to be maintained.

**Generally used:** Columns frequently used in `WHERE`, `JOIN`, `ORDER BY`, etc.

**Don't blindly index every column.**

---

# 12. TRANSACTIONS

A transaction is a **group of operations treated as one unit of work**.

Classic example: transferring ₹1,000.


Account A → -₹1000
Account B → +₹1000


Both should happen, **or neither should happen**.

sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE id = 2;

COMMIT;


If something goes wrong:

sql
ROLLBACK;


### Important commands


START TRANSACTION
COMMIT
ROLLBACK
SAVEPOINT


### ACID


A → Atomicity
C → Consistency
I → Isolation
D → Durability


**Generally used:** Payments, bookings, money transfers, inventory updates — whenever multiple database operations must remain consistent.

---

# 13. TRIGGERS

A trigger **automatically executes when a specific database event happens**.

Example:

sql
CREATE TRIGGER before_user_insert
BEFORE INSERT ON users
FOR EACH ROW
SET NEW.created_at = NOW();


Now when:

sql
INSERT INTO users(name)
VALUES ('Ajay');


the trigger automatically sets `created_at`.

### Common events


BEFORE INSERT
AFTER INSERT

BEFORE UPDATE
AFTER UPDATE

BEFORE DELETE
AFTER DELETE


**Generally used:** Automatic auditing, timestamps, maintaining derived data, etc.

**Important:** Don't overuse triggers because they can make application behavior harder to understand/debug.

---

# 14. CTE — Common Table Expression

A **temporary named result used within one query**.

### Syntax

sql
WITH high_salary AS (
    SELECT *
    FROM employees
    WHERE salary > 50000
)
SELECT *
FROM high_salary;


Instead of putting everything into one complicated query, you can break it into logical steps.

### Example

sql
WITH dept_avg AS (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
)
SELECT *
FROM dept_avg
WHERE avg_salary > 60000;


**Generally used:** Making complex queries easier to read and organize.

### Recursive CTE

A CTE can refer to itself.

Common use:


Employee
   ↓
Manager
   ↓
Manager's manager
   ↓
...


Useful for hierarchical data such as organization structures/categories.

---

# 15. WINDOW FUNCTIONS

**Important.**

A window function calculates something across related rows **without collapsing them into one row**.

Example:

sql
SELECT
    name,
    department,
    salary,
    AVG(salary) OVER(PARTITION BY department) AS dept_avg
FROM employees;


Result:


name   department   salary   dept_avg
A      IT           60000    65000
B      IT           70000    65000
C      HR           50000    55000
D      HR           60000    55000


Notice:


GROUP BY
→ combines rows

WINDOW FUNCTION
→ keeps individual rows


---

## ROW_NUMBER()

sql
SELECT name, salary,
       ROW_NUMBER() OVER(ORDER BY salary DESC) AS row_num
FROM employees;


Assigns a unique sequential number.

---

## RANK()

sql
RANK() OVER(ORDER BY salary DESC)


If salaries:


100
100
90


Ranks:


1
1
3


---

## DENSE_RANK()

Same example:


100
100
90


Ranks:


1
1
2


Difference:


RANK       → 1, 1, 3
DENSE_RANK → 1, 1, 2


---

## PARTITION BY

Creates groups **without collapsing them**.

sql
SUM(salary) OVER(
    PARTITION BY department
)


Think:


GROUP BY
→ Group + collapse

PARTITION BY
→ Group + keep rows


**Generally used:** Rankings, top-N problems, running totals, comparisons with group averages, previous/next row calculations.

### Most important window functions to know


ROW_NUMBER()
RANK()
DENSE_RANK()
LAG()
LEAD()
SUM() OVER()
AVG() OVER()


---

# BIG PICTURE


COALESCE
   ↓
IF / CASE
   ↓
WHERE / HAVING / GROUP BY
   ↓
JOINS
   ↓
SET OPERATIONS
   ↓
NORMALIZATION
   ↓
DENORMALIZATION
   ↓
VIEWS
   ↓
INDEXES
   ↓
TRANSACTIONS
   ↓
TRIGGERS
   ↓
CTEs
   ↓
WINDOW FUNCTIONS


### Ultra-quick revision


COALESCE   → first non-NULL
IF         → simple condition
CASE       → multiple conditions

WHERE      → filter rows
HAVING     → filter groups
GROUP BY   → create groups

JOIN       → combine related tables
UNION      → combine SELECT results + remove duplicates
UNION ALL  → combine SELECT results + keep duplicates

1NF        → Atomic
2NF        → No partial dependency
3NF        → No transitive dependency

DENORMALIZE → duplicate data for faster reads
VIEW        → saved query / virtual table
INDEX       → faster lookup, extra write cost

TRANSACTION → operations as one unit
ACID        → Atomicity, Consistency, Isolation, Durability

TRIGGER     → automatic DB action
CTE         → temporary named result within query
WINDOW      → calculate across rows without collapsing them

