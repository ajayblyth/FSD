Microsoft Windows [Version 10.0.26200.8655]
(c) Microsoft Corporation. All rights reserved.

C:\Users\ajayb>mongosh
Current Mongosh Log ID: 6a2aad285e886dd3d13682d0
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.8.2
Using MongoDB:          8.2.7
Using Mongosh:          2.8.2
mongosh 2.8.3 is available for download: https://www.mongodb.com/try/download/shell

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

------
   The server generated these startup warnings when booting
   2026-06-11T16:16:33.918+05:30: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> use school
switched to db school
school> show collections
courses
students
school> db.students.aggregate([
| {$lookup: {
| from: 'courses',
| localfield: 'name',
| foreignField:'studentName', as 'courseDetails'}}
Uncaught:
SyntaxError: Unexpected token, expected "," (5:31)

  3 | from: 'courses',
  4 | localfield: 'name',
> 5 | foreignField:'studentName', as 'courseDetails'}}
    |                                ^
  6 |

school> db.students.aggregate([ {$lookup: { from: 'courses', localfield: 'name', foreignField:'studentName', as 'courseDetails'}}])
Uncaught:
SyntaxError: Unexpected token, expected "," (1:104)

> 1 | db.students.aggregate([ {$lookup: { from: 'courses', localfield: 'name', foreignField:'studentName', as 'courseDetails'}}])
    |                                                                                                         ^
  2 |

school> db.students.aggregate([ {$lookup: { from: 'courses', localField: 'name', foreignField:'studentName', as: 'courseDetails'}}])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682ed'),
        studentName: 'Aarav',
        course: 'Web Development',
        duration: '6 months',
        fees: 15000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 67,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682ee'),
        studentName: 'Rohan',
        course: 'Data Science',
        duration: '8 months',
        fees: 25000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f4'),
        studentName: 'Priya',
        course: 'Web Development',
        duration: '6 months',
        fees: 15000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682ef'),
        studentName: 'Karan',
        course: 'Machine Learning',
        duration: '10 months',
        fees: 30000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e4'),
    name: 'Vikram',
    city: 'Bangalore',
    subject: 'Math',
    marks: 69,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f0'),
        studentName: 'Divya',
        course: 'Web Development',
        duration: '6 months',
        fees: 15000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f1'),
        studentName: 'Meera',
        course: 'Cloud Computing',
        duration: '5 months',
        fees: 20000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f2'),
        studentName: 'Tarun',
        course: 'Data Science',
        duration: '8 months',
        fees: 25000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f3'),
        studentName: 'Riya',
        course: 'App Development',
        duration: '7 months',
        fees: 18000
      }
    ]
  }
]
school> db.school.getIndexes()
MongoServerError[NamespaceNotFound]: ns does not exist: school.school
school> db.students.getIndexes()
[ { v: 2, key: { _id: 1 }, name: '_id_' } ]
school> show collections
courses
students
school> db.students.insertOne{name:'Aditya', city: 'Delhi', subject: 'Math', marks: 88}
Uncaught:
SyntaxError: Missing semicolon. (1:21)

> 1 | db.students.insertOne{name:'Aditya', city: 'Delhi', subject: 'Math', marks: 88}
    |                      ^
  2 |

school> db.students.insertOne({name:'Aditya', city: 'Delhi', subject: 'Math', marks: 88})
{
  acknowledged: true,
  insertedId: ObjectId('6a2ac0175e886dd3d13682d1')
}
school> db.students.insertMany([
| {name:'Kavya', city: 'Mumbai', subject: 'Science', marks: 81},
| {name: 'Manish',city:'Pune', Subject: 'Math', marks: 74}])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a2ac1575e886dd3d13682d2'),
    '1': ObjectId('6a2ac1575e886dd3d13682d3')
  }
}
school> db.students.find()
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 67
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e4'),
    name: 'Vikram',
    city: 'Bangalore',
    subject: 'Math',
    marks: 69
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> db.students.find({city: 'Delhi'})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 67
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88
  }
]
school> db.students.find({name:'Karan'})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  }
]
school> db.students.find({marks: {$gt: 80}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  }
]
school> db.students.find({marks: {$lte:70}})
|
[
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 67
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e4'),
    name: 'Vikram',
    city: 'Bangalore',
    subject: 'Math',
    marks: 69
  }
]
school> db.students.find({ city:'Mumbai'}, {subject:'Science'}})
Uncaught:
SyntaxError: Unexpected token, expected "," (1:54)

> 1 | db.students.find({ city:'Mumbai'}, {subject:'Science'}})
    |                                                       ^
  2 |

school> db.students.find({ city:'Mumbai', subject:'Science'})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  }
]
school> db.students.find({name:1, marks:1, _id:0})

school> db.students.find({}, {name:1, marks:1, _id:0})
[
  { name: 'Aarav', marks: 85 },
  { name: 'Neha', marks: 67 },
  { name: 'Rohan', marks: 90 },
  { name: 'Priya', marks: 78 },
  { name: 'Karan', marks: 97 },
  { name: 'Sneha', marks: 88 },
  { name: 'Vikram', marks: 69 },
  { name: 'Divya', marks: 93 },
  { name: 'Anita', marks: 72 },
  { name: 'Rahul', marks: 80 },
  { name: 'Meera', marks: 91 },
  { name: 'Sanjay', marks: 84 },
  { name: 'Pooja', marks: 76 },
  { name: 'Tarun', marks: 95 },
  { name: 'Riya', marks: 89 },
  { name: 'Aditya', marks: 88 },
  { name: 'Kavya', marks: 81 },
  { name: 'Manish', marks: 74 }
]
school> db.students.find({marks: -1})

school> db.students.find().sort({marks:1})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 67
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e4'),
    name: 'Vikram',
    city: 'Bangalore',
    subject: 'Math',
    marks: 69
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  }
]
school> db.students.find().sort{marks: -1}.limit(3)
Uncaught:
SyntaxError: Missing semicolon. (1:23)

> 1 | db.students.find().sort{marks: -1}.limit(3)
    |                        ^
  2 |

school> db.students.find().sort({marks: -1}).limit(3)
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  }
]
school> db.students.find().skip(5)
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e4'),
    name: 'Vikram',
    city: 'Bangalore',
    subject: 'Math',
    marks: 69
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> db.students.find().countDocuments()
TypeError: db.students.find().countDocuments is not a function
school> db.students.countDocuments()
18
school> db.students.distinct('city')
[
  'Bangalore',
  'Chennai',
  'Delhi',
  'Kolkata',
  'Mumbai',
  'Noida',
  'Pune'
]
school> db.students.updateOne({name:'Neha'}, $set{marks: 70})
Uncaught:
SyntaxError: Unexpected token, expected "," (1:41)

> 1 | db.students.updateOne({name:'Neha'}, $set{marks: 70})
    |                                          ^
  2 |

school> db.students.updateOne({name:'Neha'}, {$set{marks: 70}})
Uncaught:
SyntaxError: Unexpected token, expected "," (1:42)

> 1 | db.students.updateOne({name:'Neha'}, {$set{marks: 70}})
    |                                           ^
  2 |

school> db.students.updateOne({name:'Neha'}, {$set:{marks: 70}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
school> db.students.updateMany({city:'Delhi'}, {$set:{zone:'North'}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 4,
  modifiedCount: 4,
  upsertedCount: 0
}
school> db.students.deleteOne({name:'Vikram'})
{ acknowledged: true, deletedCount: 1 }
school> db.students.find({subject:{$in: ['Math','English']}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  }
]
school> db.students.find({city: {$nin:{city: 'Delhi'}}}0
Uncaught:
SyntaxError: Unexpected token, expected "," (1:47)

> 1 | db.students.find({city: {$nin:{city: 'Delhi'}}}0
    |                                                ^
  2 |

school> db.students.find({city: {$nin:{city: 'Delhi'}}})
MongoServerError[BadValue]: $nin needs an array
school> db.students.find({city: {$ne:'Delhi'}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> use company
switched to db company
company> show dbs
admin              40.00 KiB
airbnbclone        80.00 KiB
company            40.00 KiB
config             72.00 KiB
local              76.00 KiB
school            112.00 KiB
userManagementDB   96.00 KiB
company> show collections
employees
company> db.employees.find({salary: {$gt:90000}})
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682f6'),
    name: 'Priya Patel',
    age: 34,
    city: 'Mumbai',
    role: 'Manager',
    salary: 95000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f9'),
    name: 'Vikram Singh',
    age: 42,
    city: 'Mumbai',
    role: 'Manager',
    salary: 110000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fb'),
    name: 'Karan Mehta',
    age: 38,
    city: 'Delhi',
    role: 'Lead',
    salary: 105000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fd'),
    name: 'Arjun Verma',
    age: 45,
    city: 'Chennai',
    role: 'Director',
    salary: 150000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368300'),
    name: 'Meera Kapoor',
    age: 36,
    city: 'Mumbai',
    role: 'Manager',
    salary: 98000,
    department: 'HR'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368301'),
    name: 'Sanjay Pillai',
    age: 40,
    city: 'Chennai',
    role: 'Lead',
    salary: 102000,
    department: 'Sales'
  }
]
company> db.employees.find({department: 'Engineering'})
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682f5'),
    name: 'Aarav Sharma',
    age: 28,
    city: 'Delhi',
    role: 'Developer',
    salary: 75000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f6'),
    name: 'Priya Patel',
    age: 34,
    city: 'Mumbai',
    role: 'Manager',
    salary: 95000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f7'),
    name: 'Rahul Kumar',
    age: 25,
    city: 'Delhi',
    role: 'Developer',
    salary: 60000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fb'),
    name: 'Karan Mehta',
    age: 38,
    city: 'Delhi',
    role: 'Lead',
    salary: 105000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fc'),
    name: 'Divya Nair',
    age: 29,
    city: 'Bangalore',
    role: 'Developer',
    salary: 72000,
    department: 'Engineering'
  }
]
company> db.employees.find().sort({salary: -1}).limit(5)
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682fd'),
    name: 'Arjun Verma',
    age: 45,
    city: 'Chennai',
    role: 'Director',
    salary: 150000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f9'),
    name: 'Vikram Singh',
    age: 42,
    city: 'Mumbai',
    role: 'Manager',
    salary: 110000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fb'),
    name: 'Karan Mehta',
    age: 38,
    city: 'Delhi',
    role: 'Lead',
    salary: 105000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368301'),
    name: 'Sanjay Pillai',
    age: 40,
    city: 'Chennai',
    role: 'Lead',
    salary: 102000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368300'),
    name: 'Meera Kapoor',
    age: 36,
    city: 'Mumbai',
    role: 'Manager',
    salary: 98000,
    department: 'HR'
  }
]
company> db.employees.find()
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682f5'),
    name: 'Aarav Sharma',
    age: 28,
    city: 'Delhi',
    role: 'Developer',
    salary: 75000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f6'),
    name: 'Priya Patel',
    age: 34,
    city: 'Mumbai',
    role: 'Manager',
    salary: 95000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f7'),
    name: 'Rahul Kumar',
    age: 25,
    city: 'Delhi',
    role: 'Developer',
    salary: 60000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f8'),
    name: 'Sneha Reddy',
    age: 30,
    city: 'Bangalore',
    role: 'Designer',
    salary: 70000,
    department: 'Marketing'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f9'),
    name: 'Vikram Singh',
    age: 42,
    city: 'Mumbai',
    role: 'Manager',
    salary: 110000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fa'),
    name: 'Ananya Iyer',
    age: 27,
    city: 'Pune',
    role: 'Analyst',
    salary: 65000,
    department: 'Finance'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fb'),
    name: 'Karan Mehta',
    age: 38,
    city: 'Delhi',
    role: 'Lead',
    salary: 105000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fc'),
    name: 'Divya Nair',
    age: 29,
    city: 'Bangalore',
    role: 'Developer',
    salary: 72000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fd'),
    name: 'Arjun Verma',
    age: 45,
    city: 'Chennai',
    role: 'Director',
    salary: 150000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fe'),
    name: 'Pooja Joshi',
    age: 31,
    city: 'Pune',
    role: 'Analyst',
    salary: 68000,
    department: 'Finance'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682ff'),
    name: 'Rohan Gupta',
    age: 26,
    city: 'Delhi',
    role: 'Designer',
    salary: 58000,
    department: 'Marketing'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368300'),
    name: 'Meera Kapoor',
    age: 36,
    city: 'Mumbai',
    role: 'Manager',
    salary: 98000,
    department: 'HR'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368301'),
    name: 'Sanjay Pillai',
    age: 40,
    city: 'Chennai',
    role: 'Lead',
    salary: 102000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368302'),
    name: 'Neha Bhatt',
    age: 24,
    city: 'Pune',
    role: 'Intern',
    salary: 35000,
    department: 'HR'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368303'),
    name: 'Tarun Saxena',
    age: 33,
    city: 'Bangalore',
    role: 'Developer',
    salary: 78000,
    department: 'Marketing'
  }
]
company> db.employees.find({},{name:1, salary:1, _id:0)
Uncaught:
SyntaxError: Unexpected token, expected "," (1:45)

> 1 | db.employees.find({},{name:1, salary:1, _id:0)
    |                                              ^
  2 |

company> db.employees.find({},{name:1, salary:1, _id:0})
[
  { name: 'Aarav Sharma', salary: 75000 },
  { name: 'Priya Patel', salary: 95000 },
  { name: 'Rahul Kumar', salary: 60000 },
  { name: 'Sneha Reddy', salary: 70000 },
  { name: 'Vikram Singh', salary: 110000 },
  { name: 'Ananya Iyer', salary: 65000 },
  { name: 'Karan Mehta', salary: 105000 },
  { name: 'Divya Nair', salary: 72000 },
  { name: 'Arjun Verma', salary: 150000 },
  { name: 'Pooja Joshi', salary: 68000 },
  { name: 'Rohan Gupta', salary: 58000 },
  { name: 'Meera Kapoor', salary: 98000 },
  { name: 'Sanjay Pillai', salary: 102000 },
  { name: 'Neha Bhatt', salary: 35000 },
  { name: 'Tarun Saxena', salary: 78000 }
]
company> db.employees.find({role:'Manager'})
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682f6'),
    name: 'Priya Patel',
    age: 34,
    city: 'Mumbai',
    role: 'Manager',
    salary: 95000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f9'),
    name: 'Vikram Singh',
    age: 42,
    city: 'Mumbai',
    role: 'Manager',
    salary: 110000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368300'),
    name: 'Meera Kapoor',
    age: 36,
    city: 'Mumbai',
    role: 'Manager',
    salary: 98000,
    department: 'HR'
  }
]
company> use school
switched to db school
school> db.students.find({marks: {$gte:70, $lte:90}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> db.students.find({city: {$in:['Delhi', 'Mumbai']}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  }
]
school> school> db.students.find({city: {$nin:['Delhi', 'Mumbai']}})
ReferenceError: school is not defined
school> db.students.find({city: {$nin:['Delhi', 'Mumbai']}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> db.students.find({name: {$regex: '^R', options: 'i'}})
MongoServerError[BadValue]: unknown operator: options
school> db.students.find({name: {$regex: '^R', $options: 'i'}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  }
]
school> db.students.find({name: {$regex: 'a$', $options: 'i'}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  }
]
school> db.students.find({name: {$regex: 'ar', $options: 'i'}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  }
]
school> db.students.find({city: 'Delhi', marks: {$gte:85}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North'
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  }
]
school> db.students.find({ $or: [{marks: {$gt:95}},{marks: {$lt:70}}]})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  }
]
school> db.students.find({
|   $or: [
|     { marks: { $gt: 95 } },
|     { marks: { $lt: 70 } }
|   ]
| })
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  }
]
school> db.students.find({marks: {$not: {$gt:80}}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> db.students.find({ $nor: [{city: 'Delhi'}, {marks: {$not: {$eq:90}}}]})

school> db.students.find({
|   $nor: [
|     { city: 'Delhi' },
|     { marks: 90 }
|   ]
| })
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> db.students.find({ $nor: [{city: 'Delhi'}, {marks: 90}]})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> db.students.find({marks: {$exists:true}})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school> use employee
switched to db employee
employee> db.employees.find({salary: {$type: 'int'}})

employee> db.employees.find({
|   salary: { $type: 'int' }
| })

employee> db.employees.aggregate([
|   {
|     $project: {
|       salary: 1,
|       type: { $type: "$salary" }
|     }
|   }
| ])

employee> use employees
switched to db employees
employees> use employee
switched to db employee
employee> db.employee.drop()
true
employee> use employees
switched to db employees
employees> db.employees.find({salary: {$type: 'int'}})

employees> db.employees.find({salary: {$type: 'int'}})

employees> db.employees.aggregate([
|   {
|     $project: {
|       salary: 1,
|       type: { $type: "$salary" }
|     }
|   }
| ])

employees> db.employees.drop()
true
employees> use company
switched to db company
company> db.employees.find({salary: {$type: 'int'}})
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682f5'),
    name: 'Aarav Sharma',
    age: 28,
    city: 'Delhi',
    role: 'Developer',
    salary: 75000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f6'),
    name: 'Priya Patel',
    age: 34,
    city: 'Mumbai',
    role: 'Manager',
    salary: 95000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f7'),
    name: 'Rahul Kumar',
    age: 25,
    city: 'Delhi',
    role: 'Developer',
    salary: 60000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f8'),
    name: 'Sneha Reddy',
    age: 30,
    city: 'Bangalore',
    role: 'Designer',
    salary: 70000,
    department: 'Marketing'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f9'),
    name: 'Vikram Singh',
    age: 42,
    city: 'Mumbai',
    role: 'Manager',
    salary: 110000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fa'),
    name: 'Ananya Iyer',
    age: 27,
    city: 'Pune',
    role: 'Analyst',
    salary: 65000,
    department: 'Finance'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fb'),
    name: 'Karan Mehta',
    age: 38,
    city: 'Delhi',
    role: 'Lead',
    salary: 105000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fc'),
    name: 'Divya Nair',
    age: 29,
    city: 'Bangalore',
    role: 'Developer',
    salary: 72000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fd'),
    name: 'Arjun Verma',
    age: 45,
    city: 'Chennai',
    role: 'Director',
    salary: 150000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fe'),
    name: 'Pooja Joshi',
    age: 31,
    city: 'Pune',
    role: 'Analyst',
    salary: 68000,
    department: 'Finance'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682ff'),
    name: 'Rohan Gupta',
    age: 26,
    city: 'Delhi',
    role: 'Designer',
    salary: 58000,
    department: 'Marketing'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368300'),
    name: 'Meera Kapoor',
    age: 36,
    city: 'Mumbai',
    role: 'Manager',
    salary: 98000,
    department: 'HR'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368301'),
    name: 'Sanjay Pillai',
    age: 40,
    city: 'Chennai',
    role: 'Lead',
    salary: 102000,
    department: 'Sales'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368302'),
    name: 'Neha Bhatt',
    age: 24,
    city: 'Pune',
    role: 'Intern',
    salary: 35000,
    department: 'HR'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368303'),
    name: 'Tarun Saxena',
    age: 33,
    city: 'Bangalore',
    role: 'Developer',
    salary: 78000,
    department: 'Marketing'
  }
]
company> use school
switched to db school
school> db.students.aggregate([
| {$group: {
| _id:'$city',count: {$sum:1}}}])
[
  { _id: 'Chennai', count: 2 },
  { _id: 'Mumbai', count: 4 },
  { _id: 'Delhi', count: 4 },
  { _id: 'Bangalore', count: 1 },
  { _id: 'Pune', count: 3 },
  { _id: 'Kolkata', count: 2 },
  { _id: 'Noida', count: 1 }
]
school> db.students.aggregate([
| {$group: {_id: '$city', avgMarks: {$avg: '$marks'}}}])
[
  { _id: 'Pune', avgMarks: 83 },
  { _id: 'Bangalore', avgMarks: 93 },
  { _id: 'Delhi', avgMarks: 83.25 },
  { _id: 'Mumbai', avgMarks: 86 },
  { _id: 'Kolkata', avgMarks: 85.5 },
  { _id: 'Noida', avgMarks: 89 },
  { _id: 'Chennai', avgMarks: 76 }
]
school> use company
switched to db company
company> db.employees.aggregate([{
| $group:{_id = '$department'}, {totalSalary: {$salary: {$sum:1}}}}])
Uncaught:
SyntaxError: Unexpected token (2:30)

  1 | db.employees.aggregate([{
> 2 | $group:{_id = '$department'}, {totalSalary: {$salary: {$sum:1}}}}])
    |                               ^
  3 |

company> db.employees.aggregate([{ $group:{_id: '$department'}, {totalSalary: {$salary: {$sum:1}}}}])
Uncaught:
SyntaxError: Unexpected token (1:55)

> 1 | db.employees.aggregate([{ $group:{_id: '$department'}, {totalSalary: {$salary: {$sum:1}}}}])
    |                                                        ^
  2 |

company> db.employees.aggregate([{ $group:{_id: '$department'}, {totalSalary: {$sum: '$salary'}}}])
Uncaught:
SyntaxError: Unexpected token (1:55)

> 1 | db.employees.aggregate([{ $group:{_id: '$department'}, {totalSalary: {$sum: '$salary'}}}])
    |                                                        ^
  2 |

company> db.employees.aggregate([{ $group:{_id: '$department', totalSalary: {$sum: '$salary'}}}])
[
  { _id: 'Marketing', totalSalary: 206000 },
  { _id: 'Engineering', totalSalary: 407000 },
  { _id: 'Sales', totalSalary: 362000 },
  { _id: 'HR', totalSalary: 133000 },
  { _id: 'Finance', totalSalary: 133000 }
]
company> company> db.employees.aggregate([{ $group:{_id: '$department',co
company> company> db.employees.aggregate([{ $group:{_id: '$department', highestSalary: {$max
company> company> db.employees.aggregate([{ $group:{_id: '$department',company> db.employees.aggregate([{ $group:{_id: '$department', highestScompany> db.employees.aggregate([ {
| $group: {
| _id: '$department', highestSalary: {$max: '$salary'}}}])
[
  { _id: 'Finance', highestSalary: 68000 },
  { _id: 'Sales', highestSalary: 150000 },
  { _id: 'Engineering', highestSalary: 105000 },
  { _id: 'Marketing', highestSalary: 78000 },
  { _id: 'HR', highestSalary: 98000 }
]
company> use school
switched to db school
school> db.students.aggregate([{
| $group: {_id: subject, lowestMarks:{$min: '$marks'}}}])
ReferenceError: subject is not defined
school> db.students.aggregate([{
| | $group: {_id: '$subject', lowestMarks:{$min: '$marks'}}}])
Uncaught:
SyntaxError: Unexpected token (2:0)

  1 | db.students.aggregate([{
> 2 | | $group: {_id: '$subject', lowestMarks:{$min: '$marks'}}}])
    | ^
  3 |

school> db.students.aggregate([{  $group: {_id: '$subject', lowestMarks:{$min: '$marks'}}}])
[
  { _id: 'Science', lowestMarks: 70 },
  { _id: 'Math', lowestMarks: 80 },
  { _id: 'English', lowestMarks: 72 },
  { _id: null, lowestMarks: 74 }
]
school> use employees
switched to db employees
employees> db.employees.aggregate([{ $group:{_id: '$department', count:{$sum:1}}}])

employees> db.dropDatabase()
{ ok: 1, dropped: 'employees' }
employees> use company
switched to db company
company> db.employees.aggregate([{ $group:{_id: '$department', count:{$$sum:1}}}])
[
  { _id: 'Finance', count: 2 },
  { _id: 'Marketing', count: 3 },
  { _id: 'Engineering', count: 5 },
  { _id: 'Sales', count: 3 },
  { _id: 'HR', count: 2 }
]
company> use school
switched to db school
school> db.students.aggregate([{
| $match: {
| marks: {$gt: 80}}}
| $group:{_id: '$city' ,avgMarks: {$avg: '$marks'}},
Uncaught:
SyntaxError: Unexpected token, expected "," (4:0)

  2 | $match: {
  3 | marks: {$gt: 80}}}
> 4 | $group:{_id: '$city' ,avgMarks: {$avg: '$marks'}},
    | ^
  5 |

school>  db.students.aggregate([{
| | $match: {
| | marks: {$gt: 80}}}
| | {$group:{_id: '$city' ,avgMarks: {$avg: '$marks'}}}])
Uncaught:
SyntaxError: Unexpected token (2:0)

  1 |  db.students.aggregate([{
> 2 | | $match: {
    | ^
  3 | | marks: {$gt: 80}}}
  4 | | {$group:{_id: '$city' ,avgMarks: {$avg: '$marks'}}}])
  5 |

school>
| school>  db.students.aggregate([{ $match: { marks: {$gt: 80}}}, {$group:{_id: '$city' ,avgMarks: {$avg: '$marks'}}}])
ReferenceError: school is not defined
school> db.students.aggregate([{ $match: { marks: {$gt: 80}}}, {$group:{_id: '$city' ,avgMarks: {$avg: '$marks'}}}])
[
  { _id: 'Pune', avgMarks: 87.5 },
  { _id: 'Bangalore', avgMarks: 93 },
  { _id: 'Delhi', avgMarks: 87.66666666666667 },
  { _id: 'Mumbai', avgMarks: 88.66666666666667 },
  { _id: 'Kolkata', avgMarks: 95 },
  { _id: 'Noida', avgMarks: 89 }
]
school> db.students.aggregate([{ $project:{_id:0, studentName: '$name', score: '$marks'}}])
[
  { studentName: 'Aarav', score: 85 },
  { studentName: 'Neha', score: 70 },
  { studentName: 'Rohan', score: 90 },
  { studentName: 'Priya', score: 78 },
  { studentName: 'Karan', score: 97 },
  { studentName: 'Sneha', score: 88 },
  { studentName: 'Divya', score: 93 },
  { studentName: 'Anita', score: 72 },
  { studentName: 'Rahul', score: 80 },
  { studentName: 'Meera', score: 91 },
  { studentName: 'Sanjay', score: 84 },
  { studentName: 'Pooja', score: 76 },
  { studentName: 'Tarun', score: 95 },
  { studentName: 'Riya', score: 89 },
  { studentName: 'Aditya', score: 88 },
  { studentName: 'Kavya', score: 81 },
  { studentName: 'Manish', score: 74 }
]
school> db.students.aggregate([{ $project:{_id:0, bonusMarks:{ $add: ['$marks',5]}}}])
[
  { bonusMarks: 90 },  { bonusMarks: 75 },
  { bonusMarks: 95 },  { bonusMarks: 83 },
  { bonusMarks: 102 }, { bonusMarks: 93 },
  { bonusMarks: 98 },  { bonusMarks: 77 },
  { bonusMarks: 85 },  { bonusMarks: 96 },
  { bonusMarks: 89 },  { bonusMarks: 81 },
  { bonusMarks: 100 }, { bonusMarks: 94 },
  { bonusMarks: 93 },  { bonusMarks: 86 },
  { bonusMarks: 79 }
]
school> db.students.aggregate([{
| $project: {
| name:1,marks:1, grade: { $cond: [{ $gte:['$marks', 90], 'A', {$cond [{ '$gte':
Uncaught:
SyntaxError: Unexpected token (3:59)

  1 | db.students.aggregate([{
  2 | $project: {
> 3 | name:1,marks:1, grade: { $cond: [{ $gte:['$marks', 90], 'A', {$cond [{ '$gte':
    |                                                            ^
  4 |

school> db.students.aggregate([{ $project: { name:1,marks:1, grade: { $cond: [{ $gte:['$marks', 90]}, 'A', {$cond: [{ '$gte: ['$marks',80]}], 'B' , 'C'}]}}])
Uncaught:
SyntaxError: Unexpected token (1:119)

> 1 | db.students.aggregate([{ $project: { name:1,marks:1, grade: { $cond: [{ $gte:['$marks', 90]}, 'A', {$cond: [{ '$gte: ['$marks',80]}], 'B' , 'C'}]}}])
    |                                                                                                                        ^
  2 |

school> db.students.aggregate([{ $project: { name:1,marks:1, grade: { $cond: [{ $gte:['$marks', 90]}, 'A', {$cond: [{$gte: ['$marks',80]}, 'B' , 'C']}]}}}])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    marks: 85,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    marks: 70,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    marks: 90,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    marks: 78,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    marks: 97,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    marks: 88,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    marks: 93,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    marks: 72,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    marks: 80,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    marks: 91,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    marks: 84,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    marks: 76,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    marks: 95,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    marks: 89,
    grade: 'B'
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    marks: 88,
    grade: 'B'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    marks: 81,
    grade: 'B'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    marks: 74,
    grade: 'C'
  }
]
school> db.students.aggregate([{ $project: { name:1, marks:1, grade: { $cond: [{ $gte:['$marks',90] }, 'A', { $cond: [{ $gte:['$marks',80] }, 'B', 'C'] } ] } } }])
|
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    marks: 85,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    marks: 70,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    marks: 90,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    marks: 78,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    marks: 97,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    marks: 88,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    marks: 93,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    marks: 72,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    marks: 80,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    marks: 91,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    marks: 84,
    grade: 'B'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    marks: 76,
    grade: 'C'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    marks: 95,
    grade: 'A'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    marks: 89,
    grade: 'B'
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    marks: 88,
    grade: 'B'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    marks: 81,
    grade: 'B'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    marks: 74,
    grade: 'C'
  }
]
school> db.students.aggregate([ {$sort: {marks: -1}}, {$limit:3}])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  }
]
school> school> db.students.aggregate([ {$sort: {marks: -1}}, {$limit:3school> db.students.aggregate([ {$sort: {marks: 1}}, {$limit:2}])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  }
]
school> school> db.students.aggregate([ {$sort: {marks: 1}}, {$limit:2}school> db.students.aggregate([ {$sort: {marks: -1}},{$skip:2}, {$limit:2}])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91
  }
]
school> db.employees.aggregate([{
| $sort:{salary:-1}},{$skip:2},{$limit:5}])

school> db.employees.aggregate([{ $sort:{salary:-1}},{$skip:2},{$limit:5}])

school> db.employees.aggregate([{
| | $sort:{salary:-1}},{$skip:5},{$limit:5}])
Uncaught:
SyntaxError: Unexpected token (2:0)

  1 | db.employees.aggregate([{
> 2 | | $sort:{salary:-1}},{$skip:5},{$limit:5}])
    | ^
  3 |

school> db.employees.aggregate([{ db.employees.aggregate([{ $sort:{salaschool> use company
switched to db company
company> db.employees.aggregate([{
| | $sort:{salary:-1}},{$skip:2},{$limit:5}])
Uncaught:
SyntaxError: Unexpected token (2:0)

  1 | db.employees.aggregate([{
> 2 | | $sort:{salary:-1}},{$skip:2},{$limit:5}])
    | ^
  3 |

company> db.employees.aggregate([{$sort:{salary:-1}},{$skip:5},{$limit:5}])
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682f6'),
    name: 'Priya Patel',
    age: 34,
    city: 'Mumbai',
    role: 'Manager',
    salary: 95000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368303'),
    name: 'Tarun Saxena',
    age: 33,
    city: 'Bangalore',
    role: 'Developer',
    salary: 78000,
    department: 'Marketing'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f5'),
    name: 'Aarav Sharma',
    age: 28,
    city: 'Delhi',
    role: 'Developer',
    salary: 75000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fc'),
    name: 'Divya Nair',
    age: 29,
    city: 'Bangalore',
    role: 'Developer',
    salary: 72000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f8'),
    name: 'Sneha Reddy',
    age: 30,
    city: 'Bangalore',
    role: 'Designer',
    salary: 70000,
    department: 'Marketing'
  }
]
company> db.employees.aggregate([{
| $match: { salary: {$gt:70000}}}, {
| $count: 'result'}}])
Uncaught:
SyntaxError: Unexpected token, expected "," (3:17)

  1 | db.employees.aggregate([{
  2 | $match: { salary: {$gt:70000}}}, {
> 3 | $count: 'result'}}])
    |                  ^
  4 |

company> db.employees.aggregate([{ $match: { salary: {$gt:70000}}}, { $count: 'result'}])
[ { result: 9 } ]
company> db.employees.aggregate([
|   {  $group: {
|      _id: '$city',avgSalary: { $avg: '$salary' },headcount: { $sum: 1 }}},{   $sort: {avgSalary: -1 }}])
|
[
  { _id: 'Chennai', avgSalary: 126000, headcount: 2 },
  { _id: 'Mumbai', avgSalary: 101000, headcount: 3 },
  { _id: 'Delhi', avgSalary: 74500, headcount: 4 },
  { _id: 'Bangalore', avgSalary: 73333.33333333333, headcount: 3 },
  { _id: 'Pune', avgSalary: 56000, headcount: 3 }
]
company> use school
switched to db school
school> db.students.aggregate([
|   {
|     $group: {
|       _id: '$subject',
|       students: { $push: '$name' }
|     }
|   }
| ])
[
  { _id: null, students: [ 'Manish' ] },
  {
    _id: 'Science',
    students: [
      'Neha',  'Priya',
      'Sneha', 'Divya',
      'Meera', 'Tarun',
      'Kavya'
    ]
  },
  {
    _id: 'Math',
    students: [
      'Aarav',  'Rohan',
      'Karan',  'Rahul',
      'Sanjay', 'Riya',
      'Aditya'
    ]
  },
  { _id: 'English', students: [ 'Anita', 'Pooja' ] }
]
school> db.students.aggregate([ { $group: {
|  _id: '$subject', students: { $push: '$name' }}}])
[
  { _id: 'English', students: [ 'Anita', 'Pooja' ] },
  {
    _id: 'Math',
    students: [
      'Aarav',  'Rohan',
      'Karan',  'Rahul',
      'Sanjay', 'Riya',
      'Aditya'
    ]
  },
  {
    _id: 'Science',
    students: [
      'Neha',  'Priya',
      'Sneha', 'Divya',
      'Meera', 'Tarun',
      'Kavya'
    ]
  },
  { _id: null, students: [ 'Manish' ] }
]
school> use company
switched to db company
company> db.employees.aggregate([
|   {$group: { _id: '$department',
|  avgSalary: { $avg: '$salary' }  } },
|   {  $sort: {
|  avgSalary: -1 }},
| {$project: {
|  _id: 0, department: '$_id', avgSalary: 1 } }])
[
  { avgSalary: 120666.66666666667, department: 'Sales' },
  { avgSalary: 81400, department: 'Engineering' },
  { avgSalary: 68666.66666666667, department: 'Marketing' },
  { avgSalary: 66500, department: 'Finance' },
  { avgSalary: 66500, department: 'HR' }
]
company> db.employees.aggregate([{$group: {_id: '$role',count: { $sum: 1 } }}])
[
  { _id: 'Analyst', count: 2 },
  { _id: 'Manager', count: 3 },
  { _id: 'Developer', count: 4 },
  { _id: 'Designer', count: 2 },
  { _id: 'Director', count: 1 },
  { _id: 'Lead', count: 2 },
  { _id: 'Intern', count: 1 }
]
company> use school
switched to db school
school> db.students.find({subject: 'Math',marks: { $gte: 80 }})
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  }
]
school> db.students.aggregate([{ $lookup:{
| from: 'courses',
| localField: 'name',
| foreignField: 'studentName', as:'courseDetails'}}])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North',
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682ed'),
        studentName: 'Aarav',
        course: 'Web Development',
        duration: '6 months',
        fees: 15000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North',
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North',
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682ee'),
        studentName: 'Rohan',
        course: 'Data Science',
        duration: '8 months',
        fees: 25000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f4'),
        studentName: 'Priya',
        course: 'Web Development',
        duration: '6 months',
        fees: 15000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682ef'),
        studentName: 'Karan',
        course: 'Machine Learning',
        duration: '10 months',
        fees: 30000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f0'),
        studentName: 'Divya',
        course: 'Web Development',
        duration: '6 months',
        fees: 15000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f1'),
        studentName: 'Meera',
        course: 'Cloud Computing',
        duration: '5 months',
        fees: 20000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76,
    courseDetails: []
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f2'),
        studentName: 'Tarun',
        course: 'Data Science',
        duration: '8 months',
        fees: 25000
      }
    ]
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89,
    courseDetails: [
      {
        _id: ObjectId('6a29d1a355f75da4733682f3'),
        studentName: 'Riya',
        course: 'App Development',
        duration: '7 months',
        fees: 18000
      }
    ]
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North',
    courseDetails: []
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81,
    courseDetails: []
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74,
    courseDetails: []
  }
]
school> db.students.aggregate([{ $lookup:{
| | from: 'courses',
| | localField: 'name',
| | foreignField: 'studentName', as:'courseDetails'}} { $unwind: '$courseDetails' }])
Uncaught:
SyntaxError: Unexpected token (2:0)

  1 | db.students.aggregate([{ $lookup:{
> 2 | | from: 'courses',
    | ^
  3 | | localField: 'name',
  4 | | foreignField: 'studentName', as:'courseDetails'}} { $unwind: '$courseDetails' }])
  5 |

school> db.students.aggregate([{ $lookup:{
school> db.students.aggregate([{ $lookup:{ from: 'courses',
| localField: 'name',foreignField: 'studentName', as:'courseDetails'}} { $unwind: '$courseDetails' }])
Uncaught:
SyntaxError: Unexpected token, expected "," (2:69)

  1 | db.students.aggregate([{ $lookup:{ from: 'courses',
> 2 | localField: 'name',foreignField: 'studentName', as:'courseDetails'}} { $unwind: '$courseDetails' }])
    |                                                                      ^
  3 |

school> db.students.aggregate([{ $lookup:{ from: 'courses',
| localField: 'name',foreignField: 'studentName', as:'courseDetails'}} ,{ $unwind: '$courseDetails' }])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North',
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682ed'),
      studentName: 'Aarav',
      course: 'Web Development',
      duration: '6 months',
      fees: 15000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North',
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682ee'),
      studentName: 'Rohan',
      course: 'Data Science',
      duration: '8 months',
      fees: 25000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f4'),
      studentName: 'Priya',
      course: 'Web Development',
      duration: '6 months',
      fees: 15000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682ef'),
      studentName: 'Karan',
      course: 'Machine Learning',
      duration: '10 months',
      fees: 30000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f0'),
      studentName: 'Divya',
      course: 'Web Development',
      duration: '6 months',
      fees: 15000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f1'),
      studentName: 'Meera',
      course: 'Cloud Computing',
      duration: '5 months',
      fees: 20000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f2'),
      studentName: 'Tarun',
      course: 'Data Science',
      duration: '8 months',
      fees: 25000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f3'),
      studentName: 'Riya',
      course: 'App Development',
      duration: '7 months',
      fees: 18000
    }
  }
]
school> db.students.aggregate([{
| $lookup: {
| from:'course',
| localField: 'name',
| foreignField: 'studentName' , as: 'courseDetails'},{
Uncaught:
SyntaxError: Unexpected token (5:51)

  3 | from:'course',
  4 | localField: 'name',
> 5 | foreignField: 'studentName' , as: 'courseDetails'},{
    |                                                    ^
  6 |

school> db.students.aggregate([{ $lookup: { from:'course', localField: 'name', foreignField: 'studentName' , as: 'courseDetails'},{ $unwind: {'$courseDetails'}
Uncaught:
SyntaxError: Unexpected token (1:122)

> 1 | db.students.aggregate([{ $lookup: { from:'course', localField: 'name', foreignField: 'studentName' , as: 'courseDetails'},{ $unwind: {'$courseDetails'}
    |                                                                                                                           ^
  2 |

school> db.students.aggregate([{ $lookup: { from:'course', localField: 'name', foreignField: 'studentName' , as: 'courseDetails'},{ $unwind: {path:'$courseDetails',preserveNullAndEmptyArrays:true}}])
Uncaught:
SyntaxError: Unexpected token (1:122)

> 1 | db.students.aggregate([{ $lookup: { from:'course', localField: 'name', foreignField: 'studentName' , as: 'courseDetails'},{ $unwind: {path:'$courseDetails',preserveNullAndEmptyArrays:true}}])
    |                                                                                                                           ^
  2 |

school> db.students.aggregate([
| {  $lookup: {
|   from: 'courses',
|   localField: 'name',
|  foreignField: 'studentName',  as: 'courseDetails'}}, {
|     $unwind: {path: '$courseDetails',preserveNullAndEmptyArrays: true}}])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North',
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682ed'),
      studentName: 'Aarav',
      course: 'Web Development',
      duration: '6 months',
      fees: 15000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North'
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North',
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682ee'),
      studentName: 'Rohan',
      course: 'Data Science',
      duration: '8 months',
      fees: 25000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f4'),
      studentName: 'Priya',
      course: 'Web Development',
      duration: '6 months',
      fees: 15000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682ef'),
      studentName: 'Karan',
      course: 'Machine Learning',
      duration: '10 months',
      fees: 30000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f0'),
      studentName: 'Divya',
      course: 'Web Development',
      duration: '6 months',
      fees: 15000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f1'),
      studentName: 'Meera',
      course: 'Cloud Computing',
      duration: '5 months',
      fees: 20000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f2'),
      studentName: 'Tarun',
      course: 'Data Science',
      duration: '8 months',
      fees: 25000
    }
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89,
    courseDetails: {
      _id: ObjectId('6a29d1a355f75da4733682f3'),
      studentName: 'Riya',
      course: 'App Development',
      duration: '7 months',
      fees: 18000
    }
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North'
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74
  }
]
school>  db.students.aggregate([{$lookup: {
| from: 'courses', localField: 'name',foreignField: 'studentName',as: 'courseDetails' }},
|   { $unwind: '$courseDetails' },
|   { $group: { _id: '$city',totalFees: { $sum: '$courseDetails.fees' }}}])
[
  { _id: 'Mumbai', totalFees: 45000 },
  { _id: 'Delhi', totalFees: 40000 },
  { _id: 'Bangalore', totalFees: 15000 },
  { _id: 'Kolkata', totalFees: 25000 },
  { _id: 'Noida', totalFees: 18000 },
  { _id: 'Pune', totalFees: 20000 }
]
school> db.students.aggregate([
|   { $group: {_id: {city: '$city',subject: '$subject'},avgMarks: { $av$avg: '$marks' }}}])
[
  { _id: { city: 'Mumbai', subject: 'Math' }, avgMarks: 97 },
  {
    _id: { city: 'Mumbai', subject: 'Science' },
    avgMarks: 82.33333333333333
  },
  {
    _id: { city: 'Delhi', subject: 'Math' },
    avgMarks: 87.66666666666667
  },
  { _id: { city: 'Delhi', subject: 'Science' }, avgMarks: 70 },
  { _id: { city: 'Bangalore', subject: 'Science' }, avgMarks: 93 },
  { _id: { city: 'Chennai', subject: 'English' }, avgMarks: 72 },
  { _id: { city: 'Chennai', subject: 'Math' }, avgMarks: 80 },
  { _id: { city: 'Pune', subject: 'Math' }, avgMarks: 84 },
  { _id: { city: 'Kolkata', subject: 'English' }, avgMarks: 76 },
  { _id: { city: 'Pune' }, avgMarks: 74 },
  { _id: { city: 'Kolkata', subject: 'Science' }, avgMarks: 95 },
  { _id: { city: 'Noida', subject: 'Math' }, avgMarks: 89 },
  { _id: { city: 'Pune', subject: 'Science' }, avgMarks: 91 }
]
school> db.students.aggregate([{
| $group:{_id: '$subject' , averagePerSubject: {$avg:'$subject'}},school> db.students.aggregate([
| |   { $group: {_id: {city: '$city',subject: '$subject'},avgMarks: { $$av$avg: '$marks' }}}])node:internal/readline/emitKeypressEvents:74
            throw err;
            ^

TypeError: Cannot read properties of undefined (reading 'length')
    at [_multilineMove] (node:internal/readline/interface:1104:36)
    at [_moveUpOrHistoryPrev] (node:internal/readline/interface:1161:27)
    at [_ttyWrite] [as _ttyWrite] (node:internal/readline/interface:1510:37)
    at REPLServer.self._ttyWrite (node:repl:988:9)
    at LineByLineInput.onkeypress (node:internal/readline/interface:284:20)
    at LineByLineInput.emit (node:events:520:35)
    at LineByLineInput.emit (node:domain:489:12)
    at emitKeys (node:internal/readline/utils:371:14)
    at emitKeys.next (<anonymous>)
    at LineByLineInput.onData (node:internal/readline/emitKeypressEvents:64:36)
    at LineByLineInput.emit (node:events:508:28)
    at LineByLineInput.emit (node:domain:489:12)
    at addChunk (node:internal/streams/readable:563:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:514:3)
    at LineByLineInput.push (node:internal/streams/readable:394:5)
    at LineByLineInput.push (eval at <anonymous> (node:lib-boxednode/mongosh:103:20), <anonymous>:145:947333)
    at LineByLineInput._flush (eval at <anonymous> (node:lib-boxednode/mongosh:103:20), <anonymous>:145:947072)
    at LineByLineInput._forwardAndBlockOnNewline (eval at <anonymous> (node:lib-boxednode/mongosh:103:20), <anonymous>:145:946635)
    at LineByLineInput._onData (eval at <anonymous> (node:lib-boxednode/mongosh:103:20), <anonymous>:145:945364)
    at ReadStream.eval (eval at <anonymous> (node:lib-boxednode/mongosh:103:20), <anonymous>:145:945979)
    at ReadStream.emit (node:events:508:28)
    at ReadStream.emit (node:domain:489:12)
    at addChunk (node:internal/streams/readable:563:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:514:3)
    at ReadStream.push (node:internal/streams/readable:394:5)
    at TTY.onStreamRead (node:internal/stream_base_commons:189:23)
    at TTY.callbackTrampoline (node:internal/async_hooks:130:17)

Node.js v24.14.1

C:\Users\ajayb>mongosh
Current Mongosh Log ID: 6a2b138e47872763853682d0
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.8.2
Using MongoDB:          8.2.7
Using Mongosh:          2.8.2
mongosh 2.8.3 is available for download: https://www.mongodb.com/try/download/shell

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/

------
   The server generated these startup warnings when booting
   2026-06-11T16:16:33.918+05:30: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
------

test> use school
switched to db school
school> db.students.aggregate([{
| $group:{_id: {city: '$city', subject: '$subject'}, avgPerSubject: {$avg:'$marks'}}}, {$group: {_id: '$_id.city', overallAvg:{$avg: '$avgPerSubject'}}}, {$sort:{overallAvg:-1}])
Uncaught:
SyntaxError: Unexpected token, expected "," (2:174)

  1 | db.students.aggregate([{
> 2 | $group:{_id: {city: '$city', subject: '$subject'}, avgPerSubject: {$avg:'$marks'}}}, {$group: {_id: '$_id.city', overallAvg:{$avg: '$avgPerSubject'}}}, {$sort:{overallAvg:-1}])
    |                                                                                                                                                                               ^
  3 |

school> db.students.aggregate([
| {$group:{_id:{city:'$city',subject:'$subject'},avgPerSubject:{$avg:'$marks'}}},
| {$group:{_id:'$_id.city',overallAvg:{$avg:'$avgPerSubject'}}},
| {$sort:{overallAvg:-1}}
| ])
[
  { _id: 'Bangalore', overallAvg: 93 },
  { _id: 'Mumbai', overallAvg: 89.66666666666666 },
  { _id: 'Noida', overallAvg: 89 },
  { _id: 'Kolkata', overallAvg: 85.5 },
  { _id: 'Pune', overallAvg: 83 },
  { _id: 'Delhi', overallAvg: 78.83333333333334 },
  { _id: 'Chennai', overallAvg: 76 }
]
school> db.students.aggregate([
| {$lookup:{from:'courses',localField:'name',foreignField:'studentName',as:'courseDetails'}},
| {$unwind:'$courseDetails'},
| {$addFields:{course:'$courseDetails.course',fees:'$courseDetails.fees',grade:{$cond:{if:{$gte:['$marks',90]},then:'A',else:{$cond:{if:{$gte:['$marks',80]},then:'B',else:{$cond:{if:{$gte:['$marks',70]},then:'C',eelse:'D'}}}}}}}},
| {$group:{_id:'$city',avgMarks:{$avg:'$marks'},maxMarks:{$max:'$marks'},minMarks:{$min:'$marks'},totalStudents:{$sum:1},totalFees:{$sum:'$fees'},students:{$push:{name:'$name',marks:'$marks',grade:'$grade',course:'$course'}}}},
| {$sort:{avgMarks:-1}},
| {$project:{_id:0,city:'$_id',avgMarks:1,maxMarks:1,minMarks:1,totalSttotalStudents:1,totalFees:1,students:1}},
| {$out:'finalReport'}
| ])

school> db.finalReport.find()
|
[
  {
    _id: ObjectId('6a2b1750e34df053de017bae'),
    avgMarks: 95,
    maxMarks: 95,
    minMarks: 95,
    totalStudents: 1,
    totalFees: 25000,
    students: [ { name: 'Tarun', marks: 95, grade: 'A', course: 'Data Science' } ],
    city: 'Kolkata'
  },
  {
    _id: ObjectId('6a2b1750e34df053de017baf'),
    avgMarks: 93,
    maxMarks: 93,
    minMarks: 93,
    totalStudents: 1,
    totalFees: 15000,
    students: [ { name: 'Divya', marks: 93, grade: 'A', course: 'Web Development' } ],
    city: 'Bangalore'
  },
  {
    _id: ObjectId('6a2b1750e34df053de017bb0'),
    avgMarks: 91,
    maxMarks: 91,
    minMarks: 91,
    totalStudents: 1,
    totalFees: 20000,
    students: [ { name: 'Meera', marks: 91, grade: 'A', course: 'Cloud Computing' } ],
    city: 'Pune'
  },
  {
    _id: ObjectId('6a2b1750e34df053de017bb1'),
    avgMarks: 89,
    maxMarks: 89,
    minMarks: 89,
    totalStudents: 1,
    totalFees: 18000,
    students: [ { name: 'Riya', marks: 89, grade: 'B', course: 'App Development' } ],
    city: 'Noida'
  },
  {
    _id: ObjectId('6a2b1750e34df053de017bb2'),
    avgMarks: 87.5,
    maxMarks: 97,
    minMarks: 78,
    totalStudents: 2,
    totalFees: 45000,
    students: [
      { name: 'Priya', marks: 78, grade: 'C', course: 'Web Development' },
      { name: 'Karan', marks: 97, grade: 'A', course: 'Machine Learning' }
    ],
    city: 'Mumbai'
  },
  {
    _id: ObjectId('6a2b1750e34df053de017bb3'),
    avgMarks: 87.5,
    maxMarks: 90,
    minMarks: 85,
    totalStudents: 2,
    totalFees: 40000,
    students: [
      { name: 'Aarav', marks: 85, grade: 'B', course: 'Web Development' },
      { name: 'Rohan', marks: 90, grade: 'A', course: 'Data Science' }
    ],
    city: 'Delhi'
  }
]
school> db.students.aggregate([
| {$lookup:{from:'courses',localField:'name',foreignField:'studentName',as:'courseDetails'}},
| {$unwind:{path:'$courseDetails',preserveNullAndEmptyArrays:true}},
| {$group:{_id:'$city',studentCount:{$sum:1},avgMarks:{$avg:'$marks'},totalFees:{$sum:'$courseDetails.fees'}}},
| {$out:'cityReport'}
| ])

school> db.students.aggregate([
| {$setWindowFields:{sortBy:{marks:-1},output:{rank:{$denseRank:{}}}}},
| {$match:{rank:{$lte:3}}}
| ])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    rank: 2
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    rank: 3
  }
]
school> db.students.aggregate([
| {$setWindowFields:{sortBy:{marks:-1},output:{seq:{$documentNumber:{}}}}}
| ])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    seq: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    seq: 2
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    seq: 3
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91,
    seq: 4
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North',
    seq: 5
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89,
    seq: 6
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88,
    seq: 7
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North',
    seq: 8
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North',
    seq: 9
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84,
    seq: 10
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81,
    seq: 11
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80,
    seq: 12
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78,
    seq: 13
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76,
    seq: 14
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74,
    seq: 15
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72,
    seq: 16
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North',
    seq: 17
  }
]
school> db.students.aggregate([
| {$setWindowFields:{sortBy:{marks:-1},output:{rank:{$rank:{}}}}}
| ])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    rank: 2
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    rank: 3
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91,
    rank: 4
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North',
    rank: 5
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89,
    rank: 6
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e3'),
    name: 'Sneha',
    city: 'Mumbai',
    subject: 'Science',
    marks: 88,
    rank: 7
  },
  {
    _id: ObjectId('6a2ac0175e886dd3d13682d1'),
    name: 'Aditya',
    city: 'Delhi',
    subject: 'Math',
    marks: 88,
    zone: 'North',
    rank: 7
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682de'),
    name: 'Aarav',
    city: 'Delhi',
    subject: 'Math',
    marks: 85,
    zone: 'North',
    rank: 9
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e9'),
    name: 'Sanjay',
    city: 'Pune',
    subject: 'Math',
    marks: 84,
    rank: 10
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d2'),
    name: 'Kavya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 81,
    rank: 11
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80,
    rank: 12
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e1'),
    name: 'Priya',
    city: 'Mumbai',
    subject: 'Science',
    marks: 78,
    rank: 13
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ea'),
    name: 'Pooja',
    city: 'Kolkata',
    subject: 'English',
    marks: 76,
    rank: 14
  },
  {
    _id: ObjectId('6a2ac1575e886dd3d13682d3'),
    name: 'Manish',
    city: 'Pune',
    Subject: 'Math',
    marks: 74,
    rank: 15
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e6'),
    name: 'Anita',
    city: 'Chennai',
    subject: 'English',
    marks: 72,
    rank: 16
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682df'),
    name: 'Neha',
    city: 'Delhi',
    subject: 'Science',
    marks: 70,
    zone: 'North',
    rank: 17
  }
]
school> db.students.aggregate([
| {$setWindowFields:{partitionBy:'$city',sortBy:{marks:-1},output:rank:{$rank:{}}}}},
| {$match:{rank:1}}
| ])
[
  {
    _id: ObjectId('6a29d18f55f75da4733682e5'),
    name: 'Divya',
    city: 'Bangalore',
    subject: 'Science',
    marks: 93,
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e7'),
    name: 'Rahul',
    city: 'Chennai',
    subject: 'Math',
    marks: 80,
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e0'),
    name: 'Rohan',
    city: 'Delhi',
    subject: 'Math',
    marks: 90,
    zone: 'North',
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682eb'),
    name: 'Tarun',
    city: 'Kolkata',
    subject: 'Science',
    marks: 95,
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e2'),
    name: 'Karan',
    city: 'Mumbai',
    subject: 'Math',
    marks: 97,
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682ec'),
    name: 'Riya',
    city: 'Noida',
    subject: 'Math',
    marks: 89,
    rank: 1
  },
  {
    _id: ObjectId('6a29d18f55f75da4733682e8'),
    name: 'Meera',
    city: 'Pune',
    subject: 'Science',
    marks: 91,
    rank: 1
  }
]
school> db.employees.aggregate([
| {$setWindowFields:{partitionBy:'$department',sortBy:{salary:-1},output:{rank:{$documentNumber:{}}}}},
| {$match:{rank:{$lte:2}}}
| ])

school> db.employees.aggregate([
| {$setWindowFields:{partitionBy:'$department',sortBy:{salary:-1},output:{rank:{$documentNumber:{}}}}},
| {$match:{rank:{$lte:2}}}
| ])

school> use company
switched to db company
company> db.employees.aggregate([
| {$setWindowFields:{partitionBy:'$department',sortBy:{salary:-1},output:{rank:{$documentNumber:{}}}}},
| {$match:{rank:{$lte:2}}}
| ])
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682fb'),
    name: 'Karan Mehta',
    age: 38,
    city: 'Delhi',
    role: 'Lead',
    salary: 105000,
    department: 'Engineering',
    rank: 1
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f6'),
    name: 'Priya Patel',
    age: 34,
    city: 'Mumbai',
    role: 'Manager',
    salary: 95000,
    department: 'Engineering',
    rank: 2
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fe'),
    name: 'Pooja Joshi',
    age: 31,
    city: 'Pune',
    role: 'Analyst',
    salary: 68000,
    department: 'Finance',
    rank: 1
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fa'),
    name: 'Ananya Iyer',
    age: 27,
    city: 'Pune',
    role: 'Analyst',
    salary: 65000,
    department: 'Finance',
    rank: 2
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368300'),
    name: 'Meera Kapoor',
    age: 36,
    city: 'Mumbai',
    role: 'Manager',
    salary: 98000,
    department: 'HR',
    rank: 1
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368302'),
    name: 'Neha Bhatt',
    age: 24,
    city: 'Pune',
    role: 'Intern',
    salary: 35000,
    department: 'HR',
    rank: 2
  },
  {
    _id: ObjectId('6a29d1ee55f75da473368303'),
    name: 'Tarun Saxena',
    age: 33,
    city: 'Bangalore',
    role: 'Developer',
    salary: 78000,
    department: 'Marketing',
    rank: 1
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f8'),
    name: 'Sneha Reddy',
    age: 30,
    city: 'Bangalore',
    role: 'Designer',
    salary: 70000,
    department: 'Marketing',
    rank: 2
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fd'),
    name: 'Arjun Verma',
    age: 45,
    city: 'Chennai',
    role: 'Director',
    salary: 150000,
    department: 'Sales',
    rank: 1
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f9'),
    name: 'Vikram Singh',
    age: 42,
    city: 'Mumbai',
    role: 'Manager',
    salary: 110000,
    department: 'Sales',
    rank: 2
  }
]
company> db.employees.createIndex({department:1})
|
| db.employees.find({department:'Engineering'})
| .explain('executionStats')
{
  explainVersion: '1',
  queryPlanner: {
    namespace: 'company.employees',
    parsedQuery: { department: { '$eq': 'Engineering' } },
    indexFilterSet: false,
    queryHash: 'EB9C5E66',
    planCacheShapeHash: 'EB9C5E66',
    planCacheKey: '3847D2F7',
    optimizationTimeMillis: 0,
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: { department: 1 },
        indexName: 'department_1',
        isMultiKey: false,
        multiKeyPaths: { department: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { department: [ '["Engineering", "Engineering"]' ] }
      }
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 5,
    executionTimeMillis: 15,
    totalKeysExamined: 5,
    totalDocsExamined: 5,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 5,
      executionTimeMillisEstimate: 7,
      works: 6,
      advanced: 5,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 5,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 5,
        executionTimeMillisEstimate: 7,
        works: 6,
        advanced: 5,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { department: 1 },
        indexName: 'department_1',
        isMultiKey: false,
        multiKeyPaths: { department: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { department: [ '["Engineering", "Engineering"]' ] },
        keysExamined: 5,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  queryShapeHash: 'C3BC93A9D2272722C8E04F305906BCA27B315590A9F139D03A11A50D8D6E108B',
  command: {
    find: 'employees',
    filter: { department: 'Engineering' },
    '$db': 'company'
  },
  serverInfo: {
    host: 'AjBlyth',
    port: 27017,
    version: '8.2.7',
    gitVersion: '8f6785264a643d2eeb5e4046f7876a23e40e1a09'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}
company> db.employees.find({
|   salary: { $gt: 70000 }
| }).explain('executionStats')
|
{
  explainVersion: '1',
  queryPlanner: {
    namespace: 'company.employees',
    parsedQuery: { salary: { '$gt': 70000 } },
    indexFilterSet: false,
    queryHash: '99489BFE',
    planCacheShapeHash: '99489BFE',
    planCacheKey: '4F613FDA',
    optimizationTimeMillis: 0,
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: { salary: { '$gt': 70000 } },
      direction: 'forward'
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 9,
    executionTimeMillis: 0,
    totalKeysExamined: 0,
    totalDocsExamined: 15,
    executionStages: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: { salary: { '$gt': 70000 } },
      nReturned: 9,
      executionTimeMillisEstimate: 0,
      works: 16,
      advanced: 9,
      needTime: 6,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 15
    }
  },
  queryShapeHash: 'CF848472F362831E6C62445212F757CF221199DCEC28CC330082CD6AED58760F',
  command: {
    find: 'employees',
    filter: { salary: { '$gt': 70000 } },
    '$db': 'company'
  },
  serverInfo: {
    host: 'AjBlyth',
    port: 27017,
    version: '8.2.7',
    gitVersion: '8f6785264a643d2eeb5e4046f7876a23e40e1a09'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}
company> db.students.createIndex({
|   city:1,
|   marks:-1
| })
city_1_marks_-1
company> use school
switched to db school
school> db.students.createIndex({name:1},{unique:true})
|
name_1
school> db.students.insertOne({name:'Aarav',city:'Delhi',subject:'Math',marks:90})
MongoServerError: E11000 duplicate key error collection: school.students index: name_1 dup key: { name: "Aarav" }
school> use company
switched to db company
company> db.employees.createIndex({name:'text',city:'text'})
|
name_text_city_text
company> db.employees.find({$text:{$search:'Delhi'}})
[
  {
    _id: ObjectId('6a29d1ee55f75da4733682ff'),
    name: 'Rohan Gupta',
    age: 26,
    city: 'Delhi',
    role: 'Designer',
    salary: 58000,
    department: 'Marketing'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682fb'),
    name: 'Karan Mehta',
    age: 38,
    city: 'Delhi',
    role: 'Lead',
    salary: 105000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f7'),
    name: 'Rahul Kumar',
    age: 25,
    city: 'Delhi',
    role: 'Developer',
    salary: 60000,
    department: 'Engineering'
  },
  {
    _id: ObjectId('6a29d1ee55f75da4733682f5'),
    name: 'Aarav Sharma',
    age: 28,
    city: 'Delhi',
    role: 'Developer',
    salary: 75000,
    department: 'Engineering'
  }
]
company> company> db.employees.createIndex({city: 1,salary: -1})
|
ReferenceError: company is not defined
company> db.employees.createIndex({city: 1,salary: -1})
|
city_1_salary_-1
company>