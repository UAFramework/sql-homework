# Class Database
Use DBeaver and create a new database for this homework. Give a meaningful name to it (example: "classes_db").
Then, load `setup.sql` file into DBeaver and run the whole script. This will create a bunch of tables in it.

It is based on a real data from the UK government found here: [Spend over £25,000 in Worcestershire Acute Hospitals NHS Trust](https://data.gov.uk/dataset/72eaec8e-0d32-4041-a553-87b852abee64/spend-over-25-000-in-worcestershire-acute-hospitals-nhs-trust)

## Submission

Below you will find a set of tasks for you to complete to consolidate and extend your learning from this week. 
You will find it beneficial to complete the reading tasks before attempting some of these.

To submit this homework write the correct commands after each question.

### 1. Show the date, transaction_no, description and amount for those transactions whose amount is between £30,000 and £31,000.
```sql
SELECT date, transaction_no, description, amount 
FROM spends 
WHERE amount BETWEEN 30000 AND 31000;
```

### 2. Show the date, transaction_no, supplier_inv_no, description and amount for those transactions whose description includes the word 'fee'.
```sql
select date, transaction_no, description, amount 
from spends
where description LIKE '%fee%';
```

### 3. Show the date, transaction_no, supplier_inv_no, description and amount for those transactions whose description includes the word 'Fee'.
```sql
select date, transaction_no, description, amount 
from spends
where description LIKE '%Fee%';
```

### 4. Show the date, transaction_no, supplier_inv_no, description and amount for those transactions whose description includes the word 'fee' (case insensitive). You will need to search 'https://www.postgresql.org/docs/' to solve this.
```sql
select date, transaction_no, description, amount 
from spends
where lower(description) LIKE '%fee%';
```

### 5. Show the date, transaction_no, supplier_inv_no, description and amount for those transactions whose amount is £25,000, £30,000, £35,000 or £40,000.
```sql
select date, transaction_no, description, amount 
from spends
where amount IN (25000, 30000, 35000, 40000);
```

### 6. Show the date, the supplier_id, the description and the amount for transactions with the expense area of 'Better Hospital Food'. You could do a query to get the expense_area_id first then do a query to find the dates, supplier_ids and amounts. But it would be better to do this all in one query by linking the tables together using INNER JOINs.
```sql
SELECT s.date, s.supplier_id, s.description, s.amount
FROM spends s
INNER JOIN expense_areas ea ON s.expense_area_id = ea.id
WHERE ea.expense_area = 'Better Hospital Food';
```

### 7. Show the date, supplier name, description and amount for transactions with the expense area of 'Better Hospital Food'. You will need to INNER JOIN another table to be able to do this.
```sql
select s.date, su.supplier, s.description, s.amount
FROM spends s
INNER JOIN expense_areas ea ON s.expense_area_id = ea.id
INNER JOIN suppliers su ON s.supplier_id = su.id
WHERE ea.expense_area = 'Better Hospital Food';
```

### 8. We have just received a late invoice for April! Add a new row to the spends table:
    dated 1st April 2021
    with a description of 'Computer Hardware Dell'
    transaction number is 38104091 and the supplier's inv no is '3780119655'
    the supplier is 'COMPUTACENTER (UK) LTD' (id 16)
    the expense type is 'Computer Hardware Purch' (id 7)
    the expense area is 'ICT Contingency' (id 18)
```sql
INSERT INTO spends (date, description, transaction_no, supplier_inv_no, supplier_id, expense_type_id, expense_area_id, amount)
values ('2021-04-01', 'Computer Hardware Dell', 38104091, '3780119655', 16, 7, 18, 0);
```

### 9. If you examine the dates in the data, you will see they all are dated either 1st march 2021 or 1st April 2021. So if we group on the the date, there will only be two groups. Show the date and the total amount spent on that date for these two dates by using a GROUP BY clause.
```sql
SELECT date, SUM(amount) AS total_amount
FROM spends
WHERE date IN ('2021-03-01', '2021-04-01')
GROUP BY date;
```

### 10. (optional) Great we now know the monthly spend. But it didn't look that good. So I've changed my SELECT query to output this instead:
```
   Month    | Monthly Spend 
------------+---------------
 March 2021 | £ 28,674,452
 April 2021 | £ 22,895,194
(2 rows)
```
Can you work out how to do this?

```sql
SELECT date as "Month", SUM(amount) AS "Monthly Spend"
FROM spends
WHERE date IN ('2021-03-01', '2021-04-01')
GROUP BY date;
```

