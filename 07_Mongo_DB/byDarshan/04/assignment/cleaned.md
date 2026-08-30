================================================
EASY QUESTIONS (1 - 25)
================================================

1. Insert one new student: name 'Aditya', city 'Delhi', subject 'Math', marks 88

use school

school> db.students.insertOne({
  name:'Aditya',
  city:'Delhi',
  subject:'Math',
  marks:88
})


2. Insert two students in a single command:
   Kavya (Mumbai, Science, 81) and Manish (Pune, Math, 74)

school> db.students.insertMany([
  { name:'Kavya', city:'Mumbai', subject:'Science', marks:81 },
  { name:'Manish', city:'Pune', Subject:'Math', marks:74 }
])


3. Find all students in the collection

school> db.students.find()


4. Find all students from the city Delhi

school> db.students.find({
  city:'Delhi'
})


5. Find a single student whose name is 'Karan'

school> db.students.find({
  name:'Karan'
})


6. Find all students with marks greater than 80

school> db.students.find({
  marks:{ $gt:80 }

})


7. Find all students with marks less than or equal to 70

school> db.students.find({
  marks:{ $lte:70 }
})


8. Find students from Mumbai whose subject is Science

school> db.students.find({
  city:'Mumbai',
  subject:'Science'
})


9. Find all students but show only the name and marks fields,
   hiding the _id


school> db.students.find(
  {},
  { name:1, marks:1, _id:0 }
)


10. Find all students sorted by marks in ascending order

school> db.students.find().sort({
  marks:1
})


11. Find all students sorted by marks in descending order

school> db.students.find().sort({
  marks:-1
})


12. Show only the top 3 students by marks

school> db.students.find()
       .sort({ marks:-1 })
       .limit(3)


13. Skip the first 5 students and return the rest

school> db.students.find().skip(5)


14. Count how many students are in the collection

school> db.students.countDocuments()


15. List the distinct cities present in the students collection

school> db.students.distinct('city')


16. Update Neha's marks to 70

school> db.students.updateOne(
  { name:'Neha' },
  { $set:{ marks:70 } }
)


17. Add a field 'zone' set to 'North' for every student in Delhi

school> db.students.updateMany(
  { city:'Delhi' },
  { $set:{ zone:'North' } }
)


18. Delete the student named 'Vikram'

school> db.students.deleteOne({
  name:'Vikram'
})


19. Find students whose subject is either Math or English

school> db.students.find({
  subject:{ $in:['Math','English'] }
})


For Delhi students:

school> db.students.find({
  city:'Delhi',
  subject:{ $in:['Math','English'] }
})


20. Find all students whose city is NOT Delhi

school> db.students.find({
  city:{ $ne:'Delhi' }
})


21. Find all employees with a salary greater than 90000

company> db.employees.find({
  salary:{ $gt:90000 }
})


22. Find all employees in the Engineering department

company> db.employees.find({
  department:'Engineering'
})


23. Find the top 5 highest-paid employees

company> db.employees.find()
        .sort({ salary:-1 })
        .limit(5)


24. Show only the name and salary of all employees,
    hiding the _id

company> db.employees.find(
  {},
  { name:1, salary:1, _id:0 }
)


25. Find all employees whose role is 'Manager'

company> db.employees.find({
  role:'Manager'
})


================================================
MEDIUM QUESTIONS (26 - 40)
================================================

26. Find students whose marks are between 70 and 90 inclusive

school> db.students.find({
  marks:{ $gte:70, $lte:90 }
})


27. Find students who are in Delhi or Mumbai,
    using a single list operator

school> db.students.find({
  city:{ $in:['Delhi','Mumbai'] }
})


28. Find students who are NOT in Delhi or Mumbai,
    using a single list operator

school> db.students.find({
  city:{ $nin:['Delhi','Mumbai'] }
})


29. Find students whose name starts with the letter 'R'

^R  r$

school> db.students.find({
  name:{ $regex:'^R', $options:'i' }
})


30. Find students whose name ends with the letter 'a'

school> db.students.find({
  name:{ $regex:'a$', $options:'i' }
})


31. Find students whose name contains 'ar',
    ignoring case

    
school> db.students.find({
  name:{ $regex:'ar', $options:'i' }
})


32. Using a logical operator, find students in Delhi
    whose marks are at least 85

school> db.students.find({
  city:'Delhi',
  marks:{ $gte:85 }
})

OR

school> db.students.find({
  $and:[
    { city:'Delhi' },
    { marks:{ $gte:85 } }
  ]
})


33. Using a logical operator, find students whose marks
    are above 95 or below 70

school> db.students.find({
  $or:[
    { marks:{ $gt:95 } },
    { marks:{ $lt:70 } }
  ]
})


34. Find students whose marks are NOT greater than 80
    (use a negation operator)

school> db.students.find({
  marks:{ $not:{ $gt:80 } }
})


35. Find students who are neither in Delhi nor have
    marks equal to 90

school> db.students.find({
  $nor:[
    { city:'Delhi' },
    { marks:90 }
  ]
})


36. Find students where the 'marks' field exists

school> db.students.find({
  marks:{ $exists:true }
})


37. Find employees whose salary is stored as an integer type

company> db.employees.find({
  salary:{ $type:'int' }
})


38. Count how many students there are in each city

school> db.students.aggregate([
  {
    $group:{
      _id:'$city',
      count:{ $sum:1 }
    }
  }
])


39. Find the average marks for each city

school> db.students.aggregate([
  {
    $group:{
      _id:'$city',
      avgMarks:{ $avg:'$marks' }
    }
  }
])


40. Find the total salary paid out in each department

company> db.employees.aggregate([
  {
    $group:{
      _id:'$department',
      totalSalary:{ $sum:'$salary' }
    }
  }
])

41. Find the highest salary in each department

company> db.employees.aggregate([
  {
    $group: {
      _id: '$department',
      highestSalary: { $max: '$salary' }
    }
  }
])


42. Find the lowest marks for each subject

school> db.students.aggregate([
  {
    $group: {
      _id: '$subject',
      lowestMarks: { $min: '$marks' }
    }
  }
])


43. Count how many employees are in each department

company> db.employees.aggregate([
  {
    $group: {
      _id: '$department',
      count: { $sum: 1 }
    }
  }
])


44. Find the average marks per city, but only for students who scored above 80

school> db.students.aggregate([
  { $match: { marks: { $gt: 80 } } },
  {
    $group: {
      _id: '$city',
      avgMarks: { $avg: '$marks' }
    }
  }
])


45. Return all students with the field 'name' renamed to 'studentName'
    and 'marks' renamed to 'score'

school> db.students.aggregate([
  {
    $project: {
      _id: 0,
      studentName: '$name',
      score: '$marks'
    }
  }
])


46. Return each student with a new field 'bonusMarks' equal to marks plus 5

school> db.students.aggregate([
  {
    $project: {
      _id: 0,
      bonusMarks: { $add: ['$marks', 5] }
    }
  }
])


47. Add a field 'grade' that is 'A' if marks are 90 or above,
    otherwise 'B'

school> db.students.aggregate([
  {
    $project: {
      name: 1,
      marks: 1,
      grade: {
        $cond: [
          { $gte: ['$marks', 90] },
          'A',
          'B'
        ]
      }
    }
  }
])


48. Add a field 'grade': 'A' for 90+, 'B' for 80 to 89,
    otherwise 'C'

school> db.students.aggregate([
  {
    $project: {
      name: 1,
      marks: 1,
      grade: {
        $cond: [
          { $gte: ['$marks', 90] },
          'A',
          {
            $cond: [
              { $gte: ['$marks', 80] },
              'B',
              'C'
            ]
          }
        ]
      }
    }
  }
])


49. Using the aggregation pipeline, find the top 3 scorers

school> db.students.aggregate([
  { $sort: { marks: -1 } },
  { $limit: 3 }
])


50. Using the aggregation pipeline, find the 2 lowest scorers

school> db.students.aggregate([
  { $sort: { marks: 1 } },
  { $limit: 2 }
])


51. Using the aggregation pipeline, find the 3rd and 4th highest scorers

school> db.students.aggregate([
  { $sort: { marks: -1 } },
  { $skip: 2 },
  { $limit: 2 }
])


52. Show page 2 of employees with 5 employees per page
    (sorted by salary descending)

company> db.employees.aggregate([
  { $sort: { salary: -1 } },
  { $skip: 5 },
  { $limit: 5 }
])


53. Count how many employees earn more than 70000,
    using a count stage

company> db.employees.aggregate([
  { $match: { salary: { $gt: 70000 } } },
  { $count: 'result' }
])

result:3 

54. Group employees by city; show average salary and headcount,
    sorted by average salary descending

company> db.employees.aggregate([
  {
    $group: {
      _id: '$city',
      avgSalary: { $avg: '$salary' },
      headcount: { $sum: 1 }
    }
  },
  { $sort: { avgSalary: -1 } }
])


55. Find employees who are in Engineering or earn more than 100000

company> db.employees.find({
  $or: [
    { department: 'Engineering' },
    { salary: { $gt: 100000 } }
  ]
})


56. Find students whose marks are one of 85, 90, or 95

school> db.students.find({
  marks: { $in: [85, 90, 95] }
})


57. Group students by subject and produce a list of student names
    in each subject

school> db.students.aggregate([
  {
    $group: {
      _id: '$subject',
      students: { $push: '$name' }
    }
  }
])


58. Find the average salary by department, sort it, and output only
    department and average salary cleanly

company> db.employees.aggregate([
  {
    $group: {
      _id: '$department',
      avgSalary: { $avg: '$salary' }
    }
  },
  { $sort: { avgSalary: -1 } },
  {
    $project: {
      _id: 0,
      department: '$_id',
      avgSalary: 1
    }
  }
])


59. Count how many employees hold each role

company> db.employees.aggregate([
  {
    $group: {
      _id: '$role',
      count: { $sum: 1 }
    }
  }
])

manager:3 , hr: 5, dev: 7

60. Find students whose subject is Math and whose marks are at least 80

school> db.students.find({
  subject: 'Math',
  marks: { $gte: 80 }
})


==================================================
HARD LEVEL QUESTIONS
==================================================

61. Join the students collection with courses so each student shows
    their matching course(s) in an array

school> db.students.aggregate([
  {
    $lookup: {
      from: 'courses',
      localField: 'name',
      foreignField: 'studentName',
      as: 'courseDetails'
    }
  }
])


62. Join and flatten: show each student with their course as a flat
    field, dropping students who have no course

school> db.students.aggregate([
  {
    $lookup: {
      from: 'courses',
      localField: 'name',
      foreignField: 'studentName',
      as: 'courseDetails'
    }
  },
  { $unwind: '$courseDetails' }
])


63. Do the same join and flatten, but KEEP students who have no course

school> db.students.aggregate([
  {
    $lookup: {
      from: 'courses',
      localField: 'name',
      foreignField: 'studentName',
      as: 'courseDetails'
    }
  },
  {
    $unwind: {
      path: '$courseDetails',
      preserveNullAndEmptyArrays: true
    }
  }
])


64. After joining students with courses, find the total fees
    collected per city

school> db.students.aggregate([
  {
    $lookup: {
      from: 'courses',
      localField: 'name',
      foreignField: 'studentName',
      as: 'courseDetails'
    }
  },
  { $unwind: '$courseDetails' },
  {
    $group: {
      _id: '$city',
      totalFees: { $sum: '$courseDetails.fees' }
    }
  }
])


65. Find the average marks for each combination of city and subject
    (multi-field grouping)

school> db.students.aggregate([
  {
    $group: {
      _id: {
        city: '$city',
        subject: '$subject'
      },
      avgMarks: { $avg: '$marks' }
    }
  }
])


66. First find subject-wise average per city, then overall average
    per city, sorted best first

school> db.students.aggregate([
  {
    $group: {
      _id: {
        city: '$city',
        subject: '$subject'
      },
      avgPerSubject: { $avg: '$marks' }
    }
  },
  {
    $group: {
      _id: '$_id.city',
      overallAvg: { $avg: '$avgPerSubject' }
    }
  },
  { $sort: { overallAvg: -1 } }
])


67. Full pipeline: join, flatten, grade, group, sort, format, save

school> db.students.aggregate([
  {
    $lookup: {
      from: 'courses',
      localField: 'name',
      foreignField: 'studentName',
      as: 'courseDetails'
    }
  },
  { $unwind: '$courseDetails' },
  {
    $addFields: {
      course: '$courseDetails.course',
      fees: '$courseDetails.fees',
      grade: {
        $cond: {
          if: { $gte: ['$marks', 90] },
          then: 'A',
          else: {
            $cond: {
              if: { $gte: ['$marks', 80] },
              then: 'B',
              else: {
                $cond: {
                  if: { $gte: ['$marks', 70] },
                  then: 'C',
                  else: 'D'
                }
              }
            }
          }
        }
      }
    }
  },
  {
    $group: {
      _id: '$city',
      avgMarks: { $avg: '$marks' },
      maxMarks: { $max: '$marks' },
      minMarks: { $min: '$marks' },
      totalStudents: { $sum: 1 },
      totalFees: { $sum: '$fees' },
      students: {
        $push: {
          name: '$name',
          marks: '$marks',
          grade: '$grade',
          course: '$course'
        }
      }
    }
  },
  { $sort: { avgMarks: -1 } },
  {
    $project: {
      _id: 0,
      city: '$_id',
      avgMarks: 1,
      maxMarks: 1,
      minMarks: 1,
      totalStudents: 1,
      totalFees: 1,
      students: 1
    }
  },
  { $out: 'finalReport' }
])

68. City report containing student count, average marks and total
    course fees per city

school> db.students.aggregate([
  {
    $lookup: {
      from: 'courses',
      localField: 'name',
      foreignField: 'studentName',
      as: 'courseDetails'
    }
  },
  {
    $unwind: {
      path: '$courseDetails',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group: {
      _id: '$city',
      studentCount: { $sum: 1 },
      avgMarks: { $avg: '$marks' },
      totalFees: { $sum: '$courseDetails.fees' }
    }
  },
  { $out: 'cityReport' }
])


69. Find the top 3 scorers including ties

school> db.students.aggregate([
  { $sort: { marks: -1 } },
  {
    $setWindowFields: {
      sortBy: { marks: -1 },
      output: {
        rank: { $denseRank: {} }
      }
    }
  },
  { $match: { rank: { $lte: 3 } } }
])


70. Assign every student a unique sequence number ordered by marks
    descending

school> db.students.aggregate([
  {
    $setWindowFields: {
      sortBy: { marks: -1 },
      output: {
        seq: { $documentNumber: {} }
      }
    }
  }
])


71. Rank students by marks using RANK semantics

school> db.students.aggregate([
  {
    $setWindowFields: {
      sortBy: { marks: -1 },
      output: {
        rank: { $rank: {} }
      }
    }
  }
])


72. Rank students within each city and return the top scorer

school> db.students.aggregate([
  {
    $setWindowFields: {
      partitionBy: '$city',
      sortBy: { marks: -1 },
      output: {
        rank: { $rank: {} }
      }
    }
  },
  { $match: { rank: 1 } }
])


73. Find the top 2 earners in each department

company> db.employees.aggregate([
  {
    $setWindowFields: {
      partitionBy: '$department',
      sortBy: { salary: -1 },
      output: {
        rank: { $documentNumber: {} }
      }
    }
  },
  { $match: { rank: { $lte: 2 } } }
])


74. Create an index on department, then explain a query

company> db.employees.createIndex({
  department: 1
})

company> db.employees.find({
  department: 'Engineering'
}).explain('executionStats')

Before Index:
-------------
Stage: COLLSCAN
(total collection scan)

After Index:
------------
Stage: IXSCAN
(index scan)


75. Run explain('executionStats') on a salary query before any
    index exists

company> db.employees.find({
  salary: { $gt: 70000 }
}).explain('executionStats')

Expected:
---------
Stage              : COLLSCAN
totalDocsExamined  : All documents


76. Create a compound index on city ascending and marks descending

company> db.students.createIndex({
  city: 1,
  marks: -1
})

Uses Index:
-----------

db.students.find({
  city: 'Delhi'
}).sort({
  marks: -1
})

Does NOT Fully Use Index:
-------------------------

db.students.find().sort({
  marks: -1
})

Reason:
-------
Index starts with city.


77. Create a unique index on the students name field, then attempt
    to insert a duplicate name

school> db.students.createIndex(
  { name: 1 },
  { unique: true }
)

school> db.students.insertOne({
  name: 'Aarav',
  city: 'Delhi',
  subject: 'Math',
  marks: 90
})

Result:
-------
Duplicate key error


78. Create a text index on the employees name and city fields,
    then search for 'Delhi'

company> db.employees.createIndex({
  name: 'text',
  city: 'text'
})

company> db.employees.find({
  $text: {
    $search: 'Delhi'
  }
})


79. List all indexes on the employees collection, then drop the
    department index

company> db.employees.getIndexes()

company> db.employees.dropIndex({
  department: 1
})


80. A query filters employees by city and sorts the result by
    salary. Which single index would make it fast, and why?

company> db.employees.createIndex({
  city: 1,
  salary: -1
})

Reason:
-------
- city supports filtering
- salary supports sorting
- avoids COLLSCAN
- avoids in-memory sort
- query becomes much faster