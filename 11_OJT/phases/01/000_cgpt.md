1. Overall Database Design

We will use MongoDB with these main collections:

MongoDB
│
├── users
│
├── events
│
├── bookings
│
└── promoCodes       ← simple/random promo codes
Important design decision

We will not create a separate ticketTiers collection initially.

Instead, ticket tiers will be embedded inside the events document:

Event
 ├── title
 ├── description
 ├── organizer
 ├── category
 ├── date
 ├── venue
 ├── coverImage
 └── ticketTiers[]
       ├── name
       ├── price
       ├── capacity
       └── sold

This is a good fit for MongoDB because ticket tiers belong directly to an event and are normally read together with the event.

2. Collection 1 — users

This stores both attendees and organizers.

Structure
Field	MongoDB Type	Required	Purpose
_id	ObjectId	Auto	Unique user ID
name	String	Yes	User's name
email	String	Yes	Login email
password	String	Yes	Hashed password
role	String/Enum	Yes	attendee / organizer
createdAt	Date	Auto	Account creation
updatedAt	Date	Auto	Last update
Example
{
  _id: ObjectId("..."),
  name: "Ajay Sharma",
  email: "ajay@example.com",
  password: "$2b$10$hashedPassword...",
  role: "attendee",
  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
Role

Initially:

attendee
organizer

Admin is optional according to the project brief, so we don't need to build it initially.

3. Collection 2 — events

This is the main collection.

One document represents one event.

Structure
Field	MongoDB Type	Required	Purpose
_id	ObjectId	Auto	Event ID
organizer	ObjectId	Yes	Reference to users
title	String	Yes	Event name
description	String	Yes	Event details
category	String	Yes	Music, Tech, Comedy etc.
date	Date	Yes	Event date/time
venue	String	Yes	Event location
coverImage	String	No	Image URL/path
ticketTiers	Array	Yes	Ticket types
status	String/Enum	Yes	Published/cancelled
createdAt	Date	Auto	Creation date
updatedAt	Date	Auto	Last update
4. ticketTiers Inside Event

Each event can contain multiple ticket tiers.

For example:

Event
│
├── General
│    ├── price: ₹500
│    ├── capacity: 100
│    └── sold: 30
│
└── VIP
     ├── price: ₹1500
     ├── capacity: 50
     └── sold: 10
Ticket Tier Structure
Field	MongoDB Type	Required	Purpose
_id	ObjectId	Auto	Tier ID
name	String	Yes	General / VIP
price	Number	Yes	Price per ticket
capacity	Number	Yes	Maximum tickets
sold	Number	Yes	Tickets currently sold
Example event
{
  _id: ObjectId("event123"),


  organizer: ObjectId("user123"),


  title: "Bangalore Tech Meetup",


  description: "A meetup for developers.",


  category: "Technology",


  date: ISODate("2026-09-15T18:00:00Z"),


  venue: "Bangalore",


  coverImage: "https://...",


  ticketTiers: [
    {
      _id: ObjectId("tier001"),
      name: "General",
      price: 500,
      capacity: 100,
      sold: 30
    },
    {
      _id: ObjectId("tier002"),
      name: "VIP",
      price: 1500,
      capacity: 50,
      sold: 10
    }
  ],


  status: "published",


  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}

This directly supports the brief's requirement that an event can have multiple tiers, each with its own price, capacity and sold count.

5. Why Keep sold in the Ticket Tier?

This is important.

We could calculate:

sold = total confirmed bookings

every time.

But keeping:

sold: 30

makes it much easier to display:

General
30 / 100 sold


70 tickets left

And:

VIP
10 / 50 sold


40 tickets left

The project specifically expects live values such as:

Tickets left
Sold vs capacity
Percent full

to remain correct and up to date.

So we will treat sold as a maintained value.

6. Collection 3 — bookings

This stores every booking/order made by an attendee.

Structure
Field	MongoDB Type	Required	Purpose
_id	ObjectId	Auto	Booking ID
user	ObjectId	Yes	Attendee reference
event	ObjectId	Yes	Event reference
tickets	Array	Yes	Selected ticket tiers
totalAmount	Number	Yes	Final amount
promoCode	String	No	Applied random promo code
discountAmount	Number	No	Discount
paymentStatus	String/Enum	Yes	Pending/paid/failed
bookingStatus	String/Enum	Yes	Confirmed/cancelled
paymentMethod	String	No	Card/Razorpay/Stripe later
createdAt	Date	Auto	Booking date
updatedAt	Date	Auto	Last update
7. Booking tickets Array

This is where we store exactly what the attendee bought.

Example:

tickets: [
  {
    tierId: ObjectId("tier001"),
    tierName: "General",
    quantity: 2,
    price: 500,
    subtotal: 1000
  },
  {
    tierId: ObjectId("tier002"),
    tierName: "VIP",
    quantity: 1,
    price: 1500,
    subtotal: 1500
  }
]

So:

2 × ₹500 = ₹1000
1 × ₹1500 = ₹1500


Total = ₹2500
Why store tierName and price in booking?

Because these are historical booking details.

Suppose today:

VIP = ₹1500

User books it.

Later organizer changes:

VIP = ₹2000

The old booking should still show:

VIP
₹1500
1 ticket

It should not suddenly become ₹2000.

So the booking stores a snapshot of the purchased ticket information.

8. Booking Example
{
  _id: ObjectId("booking123"),


  user: ObjectId("user123"),


  event: ObjectId("event123"),


  tickets: [
    {
      tierId: ObjectId("tier001"),
      tierName: "General",
      quantity: 2,
      price: 500,
      subtotal: 1000
    },
    {
      tierId: ObjectId("tier002"),
      tierName: "VIP",
      quantity: 1,
      price: 1500,
      subtotal: 1500
    }
  ],


  totalAmount: 2500,


  promoCode: "EVENT10",


  discountAmount: 250,


  paymentStatus: "paid",


  bookingStatus: "confirmed",


  paymentMethod: "card",


  createdAt: ISODate("..."),
  updatedAt: ISODate("...")
}
9. Collection 4 — promoCodes

Since you said:

Don't use coupons, just random promo code. Keep it simple.

We'll keep this extremely simple.

Structure
Field	Type	Purpose
_id	ObjectId	Promo ID
code	String	Example: EVENT10
discountPercentage	Number	Example: 10
isActive	Boolean	Whether usable
createdAt	Date	Creation date
expiresAt	Date	Optional expiry

Example:

{
  _id: ObjectId("promo123"),
  code: "EVENT10",
  discountPercentage: 10,
  isActive: true,
  createdAt: ISODate("..."),
  expiresAt: ISODate("2026-12-31")
}

Initially we can even seed a few codes manually:

EVENT10
WELCOME10
SAVE20

No complicated coupon system.

10. Relationships

MongoDB does not use SQL-style foreign keys, but we can maintain references using ObjectId.

The relationship looks like this:

                    USERS
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
      Organizer              Attendee
          │                     │
          │                     │
          ▼                     ▼
       EVENTS  ◄──────────── BOOKINGS
          │                     │
          │                     │
          ▼                     ▼
    Ticket Tiers             Tickets
    (embedded)              (embedded)

More specifically:

users._id
    │
    ├──────────────► events.organizer
    │
    └──────────────► bookings.user


events._id
    │
    └──────────────► bookings.event

And:

events.ticketTiers[]. _id
          │
          └──────────────► bookings.tickets[].tierId
11. Complete Relationship Diagram
┌─────────────────────┐
│       USERS         │
├─────────────────────┤
│ _id                 │
│ name                │
│ email               │
│ password            │
│ role                │
└─────────┬───────────┘
          │
          │ 1
          │
          │
          │ many
          ▼
┌─────────────────────┐
│       EVENTS        │
├─────────────────────┤
│ _id                 │
│ organizer ──────────┼────► users._id
│ title               │
│ description         │
│ category            │
│ date                │
│ venue               │
│ coverImage          │
│ status              │
│                     │
│ ticketTiers[]       │
│   ├─ _id            │
│   ├─ name            │
│   ├─ price           │
│   ├─ capacity        │
│   └─ sold            │
└─────────┬───────────┘
          │
          │ 1
          │
          │ many
          ▼
┌─────────────────────┐
│      BOOKINGS       │
├─────────────────────┤
│ _id                 │
│ user ───────────────┼────► users._id
│ event ──────────────┼────► events._id
│ tickets[]           │
│   ├─ tierId         │
│   ├─ tierName       │
│   ├─ quantity       │
│   ├─ price           │
│   └─ subtotal       │
│ totalAmount         │
│ promoCode           │
│ discountAmount      │
│ paymentStatus       │
│ bookingStatus       │
│ paymentMethod       │
└─────────────────────┘
12. Cancellation Logic

This is one of the important business rules from the PDF.

Suppose:

General capacity = 100
General sold = 50

User has a booking:

General × 2

After cancellation:

General sold = 48

Therefore:

Tickets left
= capacity - sold


= 100 - 48


= 52

So cancellation does:

Booking
   ↓
bookingStatus = cancelled
   ↓
for every ticket in booking
   ↓
find event.ticketTiers[tierId]
   ↓
decrease sold by quantity

The brief explicitly requires cancelled tickets to return to the available pool.

13. Important Overselling Logic

This is probably the most important backend logic in the whole project.

Suppose:

VIP capacity = 50
VIP sold = 47

User requests:

VIP × 4

Backend checks:

47 + 4 <= 50

Result:

51 <= 50 ❌

Therefore:

Booking rejected

No booking should be created.

14. Multi-Tier Booking

Suppose:

General
capacity = 100
sold = 80


VIP
capacity = 50
sold = 45

User requests:

General = 2
VIP = 3

Backend checks separately:

General:
80 + 2 <= 100 ✅


VIP:
45 + 3 <= 50 ✅

Therefore booking can continue.

Then:

General sold = 82
VIP sold = 48

This matches the project's requirement that the capacity check runs per tier.

15. High-Level Application Architecture

Our application will look like:

                 ┌──────────────────┐
                 │   React + TS     │
                 │    Frontend      │
                 └────────┬─────────┘
                          │
                    Axios / API
                          │
                          ▼
                 ┌──────────────────┐
                 │ Express + Node   │
                 │     Backend      │
                 └────────┬─────────┘
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
         Routes      Controllers     Models
                          │
                          ▼
                    MongoDB / Mongoose

Frontend:

React
  │
  ├── React Router
  │
  ├── Redux Toolkit
  │
  ├── Components
  │
  └── API services

Backend:

Express
  │
  ├── Routes
  ├── Controllers
  ├── Models
  ├── Middleware
  ├── Utils
  └── Config
16. Backend Folder Structure

I recommend this:

backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── eventController.ts
│   │   ├── bookingController.ts
│   │   └── promoCodeController.ts
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Event.ts
│   │   ├── Booking.ts
│   │   └── PromoCode.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── eventRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   └── promoCodeRoutes.ts
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   └── errorMiddleware.ts
│   │
│   ├── utils/
│   │   ├── generateToken.ts
│   │   └── calculateTotal.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
└── tsconfig.json

This follows the project's requested organization around routes, controllers and models.

17. Frontend Folder Structure

Since we're using TypeScript + Redux Toolkit:

frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── EventCard/
│   │   ├── TicketTier/
│   │   └── Loading/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── EventDetails/
│   │   ├── MyBookings/
│   │   ├── Checkout/
│   │   ├── OrganizerDashboard/
│   │   ├── CreateEvent/
│   │   └── EditEvent/
│   │
│   ├── redux/
│   │   ├── store.ts
│   │   │
│   │   ├── auth/
│   │   │   └── authSlice.ts
│   │   │
│   │   ├── events/
│   │   │   └── eventSlice.ts
│   │   │
│   │   └── bookings/
│   │       └── bookingSlice.ts
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── event.ts
│   │   └── booking.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .env
├── package.json
└── tsconfig.json
State management

We will use:

Redux Toolkit as the major state-management solution.

We will not use Context API for application state.

18. API Structure

At a high level:

Authentication
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
Events
GET    /api/events
GET    /api/events/:id


POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id

Organizer-specific operations will be protected by authentication + role.

Bookings
POST   /api/bookings
GET    /api/bookings/my-bookings
GET    /api/bookings/:id
PATCH  /api/bookings/:id/cancel
Promo Codes
GET    /api/promo-codes/:code

Initially we don't need a complicated promo-code management system.

19. Authentication Flow
Signup
  ↓
Backend
  ↓
Hash password
  ↓
Save User
  ↓
Login
  ↓
Verify password
  ↓
Generate JWT
  ↓
Frontend receives token
  ↓
Redux stores authentication state
  ↓
Protected API requests include token
  ↓
Backend auth middleware verifies JWT
  ↓
Request continues

Role is stored in the user:

user.role
   │
   ├── attendee
   │
   └── organizer

Then:

JWT
 ↓
authMiddleware
 ↓
roleMiddleware
 ↓
Controller

For example:

POST /api/events


JWT valid?
   ↓ yes
Is role organizer?
   ↓ yes
Create event

Attendee:

POST /api/events


JWT valid? ✅
Role organizer? ❌


403 Forbidden

This directly implements the project's role-based access requirement.

20. Application High-Level Flow
Attendee
Home
 ↓
Browse Events
 ↓
Search / Filter
 ↓
Event Details
 ↓
Select Ticket Quantities
 ↓
Checkout
 ↓
Login if necessary
 ↓
Validate availability
 ↓
Enter card details
 ↓
Payment
 ↓
Booking Confirmed
 ↓
My Bookings

The project's initial development approach specifically allows a fake payment step first, before integrating real Stripe test mode.

21. Organizer Flow
Organizer Login
      ↓
Organizer Dashboard
      ↓
Create Event
      ↓
Event Details
      ↓
Add Ticket Tiers
      ↓
Publish
      ↓
Public Event Listing
      ↓
Attendees Book
      ↓
Dashboard Updates
      ↓
Sold / Capacity
      ↓
View Attendees
22. Booking Flow — Backend

This is the flow I recommend we implement:

POST /api/bookings
        ↓
Authenticate user
        ↓
Find event
        ↓
Validate ticket tiers
        ↓
Check availability
        ↓
Calculate subtotal
        ↓
Apply promo code if valid
        ↓
Calculate final amount
        ↓
Payment step
        ↓
Payment successful?
      /   \
    NO     YES
    ↓       ↓
Fail     Update sold
            ↓
       Create booking
            ↓
       bookingStatus
        = confirmed

Later, Stripe/Razorpay can replace only the payment portion.

That is important because the PDF explicitly recommends building fake payment first and upgrading it later, rather than making the whole application wait for payment integration.

23. Payment — Initial Version

Your instruction is:

Just collect card details and move on initially.

For the initial development version, we can keep payment simple:

Checkout
 ↓
Card Number
Expiry
CVV
 ↓
Basic validation
 ↓
Pretend payment succeeds
 ↓
Create confirmed booking
But important security point

We should not store card number or CVV in MongoDB.

The booking should only store something like:

paymentMethod: "card"
paymentStatus: "paid"

No:

cardNumber
cvv

in our database.

Then later:

Fake Payment
     ↓
Stripe Test Mode

or, if Stripe proves unnecessarily heavy for the project's scope:

Fake Payment
     ↓
Razorpay Test Mode

The PDF specifies Stripe test mode, so Stripe should remain the default target unless the team explicitly decides to substitute Razorpay.

24. Promo Code Flow

Keep this simple.

Example:

EVENT10

means:

10% discount

Checkout:

Subtotal
   ↓
Promo Code entered
   ↓
Find promo code
   ↓
Is it active?
   ↓
Is it valid?
   ↓
Calculate discount
   ↓
Final Amount

Example:

Subtotal = ₹2000


EVENT10
= 10%


Discount = ₹200


Final = ₹1800

No complicated:

Coupon campaigns
User-specific coupons
Usage limits
Referral systems
Complex promotion rules

for now.

25. Git Branch Strategy

Your instruction here is very important.

We should not have everyone directly working on main.

Use:

main
 │
 ├── feature/auth
 ├── feature/events
 ├── feature/bookings
 ├── feature/organizer
 ├── feature/frontend
 └── feature/payment

Example:

main
  │
  └── feature/auth
          ↓
       develop
          ↓
        main

Or, if keeping it simpler:

main
  ↑
feature/auth
Rule

Developer works on:

feature/auth

Then:

code
 ↓
test
 ↓
fix
 ↓
commit
 ↓
push feature branch
 ↓
Pull Request
 ↓
review
 ↓
merge into main

Only working code should reach main.

26. Suggested Feature Branches

I'd organize the project roughly like this:

feature/project-setup


feature/database-models


feature/authentication


feature/event-crud


feature/event-search-filter


feature/booking


feature/cancellation


feature/promo-code


feature/organizer-dashboard


feature/payment


feature/ui-polish

We don't necessarily need every tiny feature to have a separate branch.

The important rule is:

Develop → Test → Push feature branch → Review → Merge into main.

27. Development Order I Recommend

Based on the PDF and your instructions, I would actually implement it in this order:

1. Project setup
       ↓
2. MongoDB + Mongoose
       ↓
3. User model
       ↓
4. Authentication + JWT
       ↓
5. Event model
       ↓
6. Seed events
       ↓
7. Event APIs
       ↓
8. React event listing
       ↓
9. Event details
       ↓
10. Search + filters
       ↓
11. Booking model
       ↓
12. Single-tier booking
       ↓
13. Fake card payment
       ↓
14. My Bookings
       ↓
15. Cancellation
       ↓
16. Multiple ticket tiers
       ↓
17. Organizer role
       ↓
18. Organizer dashboard
       ↓
19. Create/edit events
       ↓
20. Promo codes
       ↓
21. Payment integration
       ↓
22. Edge cases
       ↓
23. UI polish
       ↓
24. README + final demo

This still follows the PDF's core principle:

Simple whole application first → upgrade hard parts one at a time.

28. Things We Should Keep in Mind
Database
MongoDB + Mongoose.
Use ObjectId references.
Embed ticket tiers inside events.
Don't unnecessarily create separate collections.
Keep booking data as a historical snapshot.
Backend
Node.js + Express.
TypeScript.
Routes → Controllers → Models.
Middleware for authentication.
Middleware for role authorization.
Central error handling.
Frontend
React + TypeScript.
React Router.
Redux Toolkit.
No Context API for application state.
Proper loading/error/empty states.

The PDF explicitly requires proper loading/error/empty states on the frontend.

Authentication
JWT authentication
+
role-based authorization
Booking

The backend—not the frontend—must decide whether tickets are available.

Cancellation
cancel booking
 ↓
restore ticket quantity
 ↓
decrease event tier.sold
Payment

Initially:

Fake/simple card flow

Later:

Stripe TEST mode

Potential alternative:

Razorpay TEST mode
Promo

Keep it simple:

random promo code
→ percentage discount
→ active/inactive
Git

Never treat main as the development branch.

feature branch
 ↓
test
 ↓
PR
 ↓
review
 ↓
main
Scope

Don't build Admin, seat selection, email notifications, complex coupons, etc. until the mandatory attendee + organizer flow is solid. The PDF explicitly marks these as stretch functionality.

The Core Data Model We Will Actually Build

If we reduce everything above to the four MongoDB collections:

USERS
│
├── _id
├── name
├── email
├── password
├── role
└── timestamps




EVENTS
│
├── _id
├── organizer → User
├── title
├── description
├── category
├── date
├── venue
├── coverImage
├── status
├── ticketTiers[]
│    ├── _id
│    ├── name
│    ├── price
│    ├── capacity
│    └── sold
└── timestamps




BOOKINGS
│
├── _id
├── user → User
├── event → Event
├── tickets[]
│    ├── tierId
│    ├── tierName
│    ├── quantity
│    ├── price
│    └── subtotal
├── totalAmount
├── promoCode
├── discountAmount
├── paymentStatus
├── bookingStatus
├── paymentMethod
└── timestamps




PROMOCODES
│
├── _id
├── code
├── discountPercentage
├── isActive
├── expiresAt
└── createdAt

This is the database design I would recommend we freeze before starting implementation. It is simple enough to build quickly, but it already supports the project's important interview-level logic: roles, multiple tiers, capacity, cancellation, booking history, promo codes, and later payment integration.