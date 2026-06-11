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
bonusMarks: { $add: ['$marks', 5] }

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