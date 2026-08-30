Why $ ?

MongoDB uses $ to identify operators (special commands).
Without $, MongoDB treats the word as a normal field name.
$gt means "MongoDB's greater-than operator".
gt would mean a field named "gt".
So $ avoids confusion between operators and user-defined fields.

-------------

db.students.find({
  city: 'Mumbai',
  subject: 'Science'
}) //Yes, ✅ it is correct.


MongoDB automatically treats multiple conditions in the same object as AND.

So this is equivalent to:

db.students.find({
  $and: [
    { city: 'Mumbai' },
    { subject: 'Science' }
  ]
})

=====================
find(filter, projection)

1st argument -> Which documents?
2nd argument -> Which fields?

db.students.find(
  {},   //no filter
  { name: 1, marks: 1, _id: 0 }
)

=========================

COUNT vs COUNTDOCUMENTS
-----------------------

db.students.count()
- Older/legacy method.
- May use metadata/indexes.
- Can be less reliable in some cases.

db.students.countDocuments()
- Modern recommended method.
- Actually counts matching documents.
- More accurate and predictable.

Example:
db.students.countDocuments({ city: 'Delhi' })

=================
db.students.aggregate([
  {
    $group: {
      _id: '$city',
      count: { $sum: 1 }
    }
  }
])

Why '$city' and not 'city'?

In aggregation stages, '$fieldName' means:
"Take the value from this field."

$city = value of the city field
city  = the literal string "city"

==========================
Good question.

countDocuments() and $sum: 1 solve different problems.

countDocuments()
----------------
Counts documents in a collection.

Example:
db.students.countDocuments({ city: 'Delhi' })

Output:
3


$sum: 1 inside $group
---------------------
Counts documents within each group.

Example:

db.students.aggregate([
  {
    $group: {
      _id: '$city',
      count: { $sum: 1 }
    }
  }
])

Output:

Delhi    3
Mumbai   2
Pune     2


Why not countDocuments() here?

countDocuments() gives ONE total count.

$sum: 1 gives a count for EACH group.

So:

countDocuments() -> "How many documents?"
$sum: 1 in $group -> "How many documents per category/group?"

==================
$add is an Aggregation Expression Operator.

Example:
bonusMarks: { $add: ['$marks', 5] }   //"take these values and add them together."

It calculates values during aggregation.

Common Expression Operators:
$add        -> addition
$subtract   -> subtraction
$multiply   -> multiplication
$divide     -> division
$concat     -> join strings
$avg, $sum  -> calculations
$cond       -> if-else logic

=================================================
LOOKUP vs LOOKUP + UNWIND
=========================


Sample Data
-----------

students

{ name:'Aarav', city:'Delhi', marks:85 }
{ name:'Neha',  city:'Delhi', marks:67 }

courses

{ studentName:'Aarav', course:'Web Development' }
{ studentName:'Aarav', course:'Data Science' }


1. $lookup Only
---------------
$lookup is an aggregation stage used to join documents from another collection based on a matching field. It adds the matching documents as an array field in the output.

Use case: For example, joining orders with customers to get customer details for each order.


db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  }
])

----

db.students.aggregate([
{
  $lookup:{
    from:'courses',
    localField:'name',
    foreignField:'studentName',
    as:'courseDetails'
  }
}
])

Output

{
  name:'Aarav',
  city:'Delhi',
  marks:85,
  courseDetails:[
    { studentName:'Aarav', course:'Web Development' },
    { studentName:'Aarav', course:'Data Science' }
  ]
}

{
  name:'Neha',
  city:'Delhi',
  marks:67,
  courseDetails:[]
}

Observations

✓ 1 student = 1 document
✓ Matching courses stored in an array
✓ Students without courses are kept
✓ Similar to SQL LEFT JOIN


2. $lookup + $unwind
--------------------
$lookup + $unwind

$unwind deconstructs an array and creates a separate document for each array element. 
When used after $lookup, it converts the joined array into an individual embedded document.

We use $unwind when we need to deconstruct the array so that each element can be processed as an individual document in subsequent pipeline stages.

Think:

db.students.aggregate([
{
  $lookup:{
    from:'courses',
    localField:'name',
    foreignField:'studentName',
    as:'courseDetails'
  }
},
{
  $unwind:'$courseDetails'
}
])

Output

{
  name:'Aarav',
  city:'Delhi',
  marks:85,
  courseDetails:{
    studentName:'Aarav',
    course:'Web Development'
  }
}

{
  name:'Aarav',
  city:'Delhi',
  marks:85,
  courseDetails:{
    studentName:'Aarav',
    course:'Data Science'
  }
}

Observations

✓ Array is flattened
✓ 1 course = 1 document
✓ Aarav appears twice
✓ Neha disappears because courseDetails was empty


Summary
-------

$lookup Only

Aarav -> [Course1, Course2]
Neha  -> []

$lookup + $unwind

Aarav -> Course1
Aarav -> Course2
Neha  -> removed


Think of $unwind
----------------

Before

courseDetails = [A, B, C]

After

courseDetails = A
courseDetails = B
courseDetails = C

Rule:
$lookup creates arrays.
$unwind breaks array elements into separate documents.
======================================================

$setWindowFields
----------------
Aggregation stage used for ranking, numbering,
running totals, moving averages, etc.

running total : Amount     Running Total
100        → 100
200        → 300   (100 + 200)
300        → 600   (100 + 200 + 300)
400        → 1000  (100 + 200 + 300 + 400)

{
  $setWindowFields: {
    sortBy: { marks: -1 },
    output: {
      rank: { $denseRank: {} }
    }
  }
}

Breakdown
---------

sortBy
------
MongoDB keyword/property

Defines the order before ranking.

sortBy: { marks: -1 }

= Highest marks first


output
------
MongoDB keyword/property

Defines new calculated fields to add.

output: {
  rank: { $denseRank:{} }
}


rank
----
Custom field name (you choose it)

Can be anything:

rank
studentRank
position
myRank


$denseRank
----------
MongoDB window operator

Assigns ranks without gaps.

95 -> Rank 1
95 -> Rank 1
90 -> Rank 2
85 -> Rank 3


Example
-------

output:{
  studentRank:{ $denseRank:{} }
}

Result:

{
  name:'Tarun',
  marks:95,
  studentRank:1
}

Summary
-------

$setWindowFields -> Aggregation stage
sortBy           -> MongoDB keyword
output           -> MongoDB keyword
rank             -> Your custom field name
$denseRank       -> MongoDB window operator
==============================
Why the empty {} ?

MongoDB operators always take an argument object.

{$rank:{}}
{$denseRank:{}}
{$documentNumber:{}}

These operators don't need any settings/options, but MongoDB still expects an object.

Think of it as:

function rank(options) {}

No options to pass:

rank({})

Examples:

rank:{$rank:{}}
rank:{$denseRank:{}}
seq:{$documentNumber:{}}

All three use {} because the operator requires an argument object, even though it's empty.

=======================
# $setWindowFields — INTERVIEW REVISION
======================================================================

$setWindowFields
→ Aggregation stage used to perform calculations across a defined
  window of documents while keeping each original document in the output.

Common use cases:
→ Running totals
→ Ranking
→ Moving averages
→ Previous/next document comparison
→ Time-series analysis


----------------------------------------------------------------------
[
  { employee: "A", month: 1, amount: 100 },
  { employee: "A", month: 2, amount: 200 },
  { employee: "A", month: 3, amount: 300 },
  { employee: "B", month: 1, amount: 500 },
  { employee: "B", month: 2, amount: 100 }
]

# BASIC STRUCTURE

db.sales.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$employee",
      sortBy: { month: 1 },
      output: {
        runningTotal: {
          $sum: "$amount",
          window: {
            documents: ["unbounded", "current"]
          }
        }
      }
    }
  }
])


{ employee: "A", month: 1, amount: 100, runningTotal: 100 }
{ employee: "A", month: 2, amount: 200, runningTotal: 300 }
{ employee: "A", month: 3, amount: 300, runningTotal: 600 }

{ employee: "B", month: 1, amount: 500, runningTotal: 500 }
{ employee: "B", month: 2, amount: 100, runningTotal: 600 }


why?
partitionBy: "$employee" means calculate separately for each employee.


partitionBy
→ Divides documents into separate groups/partitions.
→ Window calculations are performed independently within each partition.

Example:
partitionBy: "$department"

→ Java employees form one partition
→ HR employees form another partition


sortBy
→ Defines the order of documents inside each partition.
→ Important for ranking, running totals, $first/$last, $shift, etc.

sortBy: { amount: -1 }
→ Highest amount first.


output
→ Defines the calculated field(s) added to each document.


window
→ Defines which documents are included in the calculation.


----------------------------------------------------------------------

# RANKING

$rank
→ Assigns ranks based on sort order.
→ Ties get the same rank and the next rank is skipped.

Scores:
100 → 1
90  → 2
90  → 2
80  → 4

Example:

output: {
  rank: {
    $rank: {}
  }
}


$denseRank
→ Assigns ranks based on sort order.
→ Ties get the same rank but the next rank is NOT skipped.

Scores:
100 → 1
90  → 2
90  → 2
80  → 3

Example:

output: {
  rank: {
    $denseRank: {}
  }
}


$documentNumber
→ Assigns a unique sequential number to every document.
→ Ties do not receive the same number.

Scores:
100 → 1
90  → 2
90  → 3
80  → 4


⭐ RANK DIFFERENCE

$rank
→ 1, 2, 2, 4

$denseRank
→ 1, 2, 2, 3

$documentNumber
→ 1, 2, 3, 4


----------------------------------------------------------------------

# RUNNING TOTAL

$sum with a window
→ Calculates a cumulative/running total while keeping each document.

Example:

{ month: 1, amount: 100 }
{ month: 2, amount: 200 }
{ month: 3, amount: 300 }

Result:

month 1 → 100
month 2 → 300
month 3 → 600

Example:

runningTotal: {
  $sum: "$amount",
  window: {
    documents: ["unbounded", "current"]
  }
}

unbounded
→ Start from the beginning of the partition.

current
→ Include the current document.


----------------------------------------------------------------------

# $shift

$shift
→ Accesses a value from a previous or following document.

Example:

previousAmount: {
  $shift: {
    output: "$amount",
    by: -1
  }
}

by: -1
→ Previous document.

by: 1
→ Next document.

Real use:
→ Compare current month's sales with previous month's sales.


----------------------------------------------------------------------

# MOVING AVERAGE

$avg
→ Can calculate an average over a defined window.

Real use:
→ Calculate the average sales of the current month and previous
  few months to identify trends.

Example:

movingAverage: {
  $avg: "$amount",
  window: {
    documents: [-2, "current"]
  }
}

→ Uses the previous 2 documents + current document.


----------------------------------------------------------------------

# $expMovingAvg

$expMovingAvg
→ Calculates an exponential moving average where recent values
  have greater influence.

Real use:
→ Time-series trend analysis.


----------------------------------------------------------------------

# $locf

$locf
→ Last Observation Carried Forward.
→ Fills missing values using the previous available value.

Real use:
→ Time-series data where some dates have missing measurements.


----------------------------------------------------------------------

# $linearFill

$linearFill
→ Fills missing values using linear interpolation between
  surrounding known values.

Example:

Day 1 → 100
Day 2 → missing
Day 3 → 200

Possible filled value:

Day 2 → 150

Real use:
→ Filling missing values in time-series data.


----------------------------------------------------------------------

# $group vs $setWindowFields

$group
→ Groups documents and produces one result per group.
→ Original individual documents are collapsed.

$setWindowFields
→ Calculates across related documents but keeps each document.

Example:

$group:
Java students → one result

$setWindowFields:
Student A → result + calculation
Student B → result + calculation
Student C → result + calculation


--------
# $out

$out
→ Writes the aggregation pipeline result to a collection.
→ If the target collection already exists, it is replaced by the
  pipeline result.

Example:

db.orders.aggregate([
  { $group: {
      _id: "$customerId",
      total: { $sum: "$amount" }
  }},
  { $out: "customerTotals" }
])

Result:
→ Creates/replaces the customerTotals collection with the result.

Real use:
→ Store processed/reporting data for later querying.

IMPORTANT:
$out must be the final stage of the pipeline.


----------------------------------------------------------------------

# $merge

$merge
→ Writes aggregation results into a collection and can insert,
  update, replace, or merge with existing documents.

Example:

db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      total: { $sum: "$amount" }
    }
  },
  {
    $merge: {
      into: "customerTotals"
    }
  }
])

Real use:
→ Update a reporting/summary collection without replacing
  the entire collection.

⭐ $out vs $merge

$out
→ Replace/create target collection with pipeline results.

$merge
→ Merge pipeline results into an existing collection.


----------------------------------------------------------------------

# IMPORTANT WINDOW CONCEPTS

partitionBy
→ Which documents belong together.

sortBy
→ Order of documents within each partition.

window
→ Which documents around the current document are included.

output
→ What calculated field is added.


Example:

$setWindowFields: {
  partitionBy: "$department",
  sortBy: { salary: -1 },
  output: {
    rank: {
      $rank: {}
    }
  }
}

Meaning:

1. Separate employees by department.
2. Sort employees by salary descending.
3. Rank employees within each department.


----------------------------------------------------------------------

# COMMON INTERVIEW QUESTIONS

Q: What is $setWindowFields?

A:
It performs calculations over a defined window of documents while
preserving individual documents in the output.


Q: What is partitionBy?

A:
It divides documents into partitions, and window calculations are
performed independently within each partition.


Q: Why is sortBy important?

A:
It determines the order of documents within each partition and is
important for ranking, running totals, first/last, and previous/next
document calculations.


Q: Difference between $rank and $denseRank?

A:
$rank skips ranks after ties; $denseRank does not.

100, 90, 90, 80

$rank      → 1, 2, 2, 4
$denseRank → 1, 2, 2, 3


Q: Difference between $group and $setWindowFields?

A:
$group collapses documents into groups, while $setWindowFields
calculates across documents while keeping each document.


Q: When would you use $shift?

A:
When you need to access a previous or next document, such as
comparing current sales with previous sales.


Q: What is $out?

A:
It writes the aggregation result to a collection and replaces the
target collection with the pipeline result.


Q: Difference between $out and $merge?

A:
$out replaces/creates the target collection, while $merge can
insert, update, replace, or merge results into an existing collection.


----------------------------------------------------------------------

# EASY MEMORY

$setWindowFields
→ CALCULATE ACROSS DOCUMENTS WITHOUT COLLAPSING THEM

partitionBy
→ WHO BELONGS TOGETHER?

sortBy
→ IN WHAT ORDER?

window
→ WHICH DOCUMENTS ARE INCLUDED?

$rank
→ TIES + SKIP

$denseRank
→ TIES + NO SKIP

$documentNumber
→ UNIQUE NUMBER

$shift
→ PREVIOUS / NEXT

$out
→ REPLACE TARGET COLLECTION

$merge
→ MERGE INTO TARGET COLLECTION
==============================================================

=======

#  WINDOW — $setWindowFields

window
→ Defines which documents are included in the calculation for the
  current document.

It is used inside the `output` expression of `$setWindowFields`.

Basic structure:

window: {
  documents: [lowerBound, upperBound]
}


----------------------------------------------------------------------

# DOCUMENT WINDOW

`documents` defines the window using the position of documents
relative to the CURRENT document.

Example:

window: {
  documents: ["unbounded", "current"]
}

Meaning:

"Start from the first document in the partition and include documents
up to the current document."

Used for:
→ Running totals
→ Cumulative calculations


Example:

Amounts:

100
200
300

Running total:

100
300
600


----------------------------------------------------------------------

# IMPORTANT WINDOW BOUNDARIES

"unbounded"
→ No limit in that direction.

"current"
→ The current document.

A positive number
→ Documents AFTER the current document.

A negative number
→ Documents BEFORE the current document.


Examples:

documents: ["unbounded", "current"]
→ From first document → current


documents: [-2, "current"]
→ Previous 2 documents + current


documents: ["current", 2]
→ Current + next 2 documents


documents: [-1, 1]
→ Previous 1 + current + next 1


----------------------------------------------------------------------

# EXAMPLE — MOVING AVERAGE

window: {
  documents: [-2, "current"]
}

If the current document is position 5:

→ positions 3, 4, 5 are included.

So:

previous 2 + current
→ calculate average over those 3 documents.


----------------------------------------------------------------------

# RANGE WINDOW

`range` defines the window based on the VALUE of the sort field,
rather than the document's position.

Example:

window: {
  range: [-10, 0]
}

If the current sort value is 50:

→ includes documents whose sort values fall within the defined range
  relative to 50.


IMPORTANT:

documents
→ based on document POSITION

range
→ based on sort-field VALUE


----------------------------------------------------------------------

# DOCUMENTS vs RANGE

documents: [-2, "current"]

→ "Give me the previous 2 documents and the current document."

range: [-2, 0]

→ "Give me documents whose sort-field values fall within this
   numeric range relative to the current value."


----------------------------------------------------------------------

# WINDOW + sortBy

For document-based windows, `sortBy` determines the order used to
identify previous/current/next documents.

Example:

sortBy: { month: 1 }

documents: [-1, "current"]

Meaning:

→ Sort by month
→ Take previous month + current month


Without the appropriate sort order, "previous" and "next" may not
represent what you logically intend.


----------------------------------------------------------------------

# WINDOW + partitionBy

The window operates within each partition.

Example:

partitionBy: "$employee"

Employee A:

100
200
300

Employee B:

500
100

With:

documents: ["unbounded", "current"]

A:
100 → 100
200 → 300
300 → 600

B:
500 → 500
100 → 600

The window does NOT cross from employee A into employee B.


----------------------------------------------------------------------

# COMMON WINDOW USE CASES

Running total:
documents: ["unbounded", "current"]

Previous + current:
documents: [-1, "current"]

Previous 3 + current:
documents: [-3, "current"]

Current + next 2:
documents: ["current", 2]

Previous + current + next:
documents: [-1, 1]


----------------------------------------------------------------------

# INTERVIEW QUESTIONS

Q: What is a window in $setWindowFields?

A:
A window defines the set of documents considered when calculating
the output for the current document.


Q: What does ["unbounded", "current"] mean?

A:
Start from the first document in the partition and continue through
the current document. It is commonly used for running totals.


Q: What does [-2, "current"] mean?

A:
Include the previous 2 documents and the current document.


Q: Difference between documents and range?

A:
`documents` defines the window by document position, while `range`
defines it based on the values of the sort field.


Q: Does a window cross partitions?

A:
No. The window operates within the partition created by `partitionBy`.


----------------------------------------------------------------------

# EASY MEMORY

documents
→ POSITION

range
→ VALUE

"unbounded"
→ NO LIMIT

"current"
→ CURRENT DOCUMENT

-1
→ PREVIOUS 1

-2
→ PREVIOUS 2

1
→ NEXT 1

["unbounded", "current"]
→ RUNNING TOTAL

[-1, 1]
→ PREVIOUS + CURRENT + NEXT
======================================================================