mongo db atlas intro and steps to use....
--------
use mongo connect to store session online
write steps
and how to installconfigure
Create a new connection from a MongoDB connection string

MongoDB connection strings are the best way to configure a new connection. For advanced
usage, more options can be configured with mongoOptions property.

// Basic usage
app.use(session({
store: MongoStore. create({ mongoUrl: 'mongodb://localhost/test-app' })
}));

// Advanced usage
app.use(session({
store: MongoStore. create({
mongoUr1: 'mongodb://user12345:foobar@localhost/test-app?authSource=admin&w=1
mongoOptions: advancedOptions // See below for details
})
}));

============
dahboard render...how touse and why