Based on the uploaded project document, here is the cleaned/frozen DB design + relationships + validations/business rules + application high-level flow. I’m keeping this limited to what you asked for—no folder structure, API list, Git strategy, or implementation yet.

1. Database Design — MongoDB

We will use MongoDB + Mongoose with 4 main collections:

MongoDB
│
├── users
├── events
├── bookings
└── promoCodes
Important design decision

Ticket tiers will NOT have a separate collection.

They will be embedded inside events, because tiers belong directly to an event and are normally retrieved with that event.

2. users Collection

Stores both attendees and organizers.

Field	MongoDB Type	Required	Description
_id	ObjectId	Auto	Unique user ID
name	String	Yes	User name
email	String	Yes	Login email
password	String	Yes	Hashed password
role	String / Enum	Yes	attendee / organizer
createdAt	Date	Auto	Account creation
updatedAt	Date	Auto	Last update
Role values
attendee
organizer

Admin is not required initially.

3. events Collection

One document represents one event.

Field	MongoDB Type	Required	Description
_id	ObjectId	Auto	Event ID
organizer	ObjectId	Yes	Reference → users._id
title	String	Yes	Event name
description	String	Yes	Event details
category	String	Yes	Music, Tech, Comedy, etc.
date	Date	Yes	Event date/time
venue	String	Yes	Event location
coverImage	String	No	Image URL/path
ticketTiers	Array	Yes	Embedded ticket tiers
status	String / Enum	Yes	published / cancelled
createdAt	Date	Auto	Creation time
updatedAt	Date	Auto	Last update

ticketTiers[] — embedded subdocuments
Field	MongoDB Type	Required	Description
_id	ObjectId	Auto	Tier ID
name	String	Yes	General / VIP
price	Number	Yes	Price per ticket
capacity	Number	Yes	Maximum tickets
sold	Number	Yes	Currently sold tickets

Example:

Event
 └── ticketTiers[]
      ├── General
      │    ├── price: 500
      │    ├── capacity: 100
      │    └── sold: 30
      │
      └── VIP
           ├── price: 1500
           ├── capacity: 50
           └── sold: 10

4. bookings Collection

Stores every booking/order made by an attendee.

Field	MongoDB Type	Required	Description
_id	ObjectId	Auto	Booking ID
user	ObjectId	Yes	Reference → users._id
event	ObjectId	Yes	Reference → events._id
tickets	Array	Yes	Purchased ticket details
totalAmount	Number	Yes	Final amount
promoCode	String	No	Applied promo code
discountAmount	Number	No	Discount amount
paymentStatus	String / Enum	Yes	pending / paid / failed
bookingStatus	String / Enum	Yes	confirmed / cancelled
paymentMethod	String	No	card initially; gateway later
createdAt	Date	Auto	Booking time
updatedAt	Date	Auto	Last update

tickets[] — embedded booking snapshot
Field	MongoDB Type	Required	Description
tierId	ObjectId	Yes	Original event tier ID
tierName	String	Yes	Snapshot of tier name
quantity	Number	Yes	Number purchased
price	Number	Yes	Price at purchase time
subtotal	Number	Yes	quantity × price

Example:

tickets[]
 ├── tierId: ObjectId
 ├── tierName: "General"
 ├── quantity: 2
 ├── price: 500
 └── subtotal: 1000

The tierName and price are intentionally stored as a historical snapshot. If an organizer later changes VIP from ₹1500 to ₹2000, an old booking must still show ₹1500.

5. promoCodes Collection

Simple promo-code system only.

Field	MongoDB Type	Required	Description
_id	ObjectId	Auto	Promo ID
code	String	Yes	Example: EVENT10
discountPercentage	Number	Yes	Example: 10
isActive	Boolean	Yes	Whether usable
expiresAt	Date	No	Expiry date
createdAt	Date	Auto	Creation date

Example:

EVENT10   → 10%
WELCOME10 → 10%
SAVE20    → 20%

No complicated coupon campaigns, user-specific coupons, referral system, or usage-limit system initially.

6. Database Relationships

MongoDB doesn't have SQL-style foreign keys, but we maintain relationships using ObjectId references.

                    USERS
                      │
             ┌────────┴────────┐
             │                 │
        Organizer           Attendee
             │                 │
             ▼                 ▼
          EVENTS ◄──────── BOOKINGS
             │                 │
             │                 │
             ▼                 ▼
       ticketTiers[]        tickets[]
        (embedded)          (embedded)
Exact relationships
users._id
   │
   ├──────────► events.organizer
   │
   └──────────► bookings.user




events._id
   │
   └──────────► bookings.event




events.ticketTiers[]._id
   │
   └──────────► bookings.tickets[].tierId
Cardinality
User 1 ──────── * Events
User 1 ──────── * Bookings
Event 1 ──────── * Bookings
Event 1 ──────── * Ticket Tiers
Booking 1 ────── * Purchased Tickets
7. Important Validations / Business Rules

These are more important than just Mongoose field validation.

A. User validation
name       → required
email      → required + unique + valid email format
password   → required + stored hashed
role       → only attendee / organizer
B. Event validation
title       → required
description → required
category    → required
date        → required
venue       → required
ticketTiers → required
status      → published / cancelled

For each ticket tier:

name      → required
price     → >= 0
capacity  → > 0
sold      → >= 0
sold      → cannot exceed capacity

The document explicitly relies on capacity, sold, and the calculation:

ticketsLeft = capacity - sold

8. Most Important Booking Validation — Prevent Overselling

The backend must perform the availability check.

Example:

VIP
capacity = 50
sold     = 47


User requests = 4

Backend:

47 + 4 <= 50
51 <= 50 ❌

Therefore:

Booking rejected
No booking created

For multiple tiers, check each tier separately.

General: 80 + 2 <= 100 ✅
VIP:      45 + 3 <= 50  ✅

Only when all requested tiers pass should the booking continue.

9. Cancellation Rule

When a booking is cancelled:

Booking
   ↓
bookingStatus = cancelled
   ↓
For each purchased ticket
   ↓
Find corresponding event.ticketTier
   ↓
Decrease tier.sold by quantity

Example:

Before:
capacity = 100
sold     = 50


Booking = 2 tickets


After cancellation:
sold = 48

Therefore:

ticketsLeft = capacity - sold
            = 100 - 48
            = 52

10. Booking Amount Validation

For every purchased ticket:

subtotal = quantity × price

Then:

subtotal of all tiers
        ↓
      discount
        ↓
   final totalAmount

Example:

General: 2 × ₹500  = ₹1000
VIP:     1 × ₹1500 = ₹1500
                       ─────
Subtotal              ₹2500


EVENT10 = 10%
Discount              ₹250


Final amount           ₹2250

The booking stores the final amount and discount.

11. Promo Code Validation

When a user enters a promo code:

Enter code
   ↓
Find promo code
   ↓
Does it exist?
   ↓
IsActive?
   ↓
Has it expired?
   ↓
Calculate discount
   ↓
Calculate final amount

Example:

Subtotal = ₹2000
EVENT10  = 10%


Discount = ₹200
Final    = ₹1800

12. Payment Data Rule

For the initial version, payment is fake/simple.

We can have:

Card Number
Expiry
CVV
   ↓
Basic validation
   ↓
Pretend payment succeeds
   ↓
Create confirmed booking

But:

Never store card number or CVV in MongoDB.

Only store something like:

paymentMethod: "card"
paymentStatus: "paid"

Later the fake payment section can be replaced by Stripe Test Mode.

13. Application High-Level Architecture
┌──────────────────────────────┐
│       React + TypeScript     │
│          Frontend            │
│                              │
│  React Router                │
│  Redux Toolkit               │
│  Components / Pages          │
│  API Services                │
└──────────────┬───────────────┘
               │
             Axios
               │
               ▼
┌──────────────────────────────┐
│       Node.js + Express      │
│           Backend            │
│                              │
│  Routes                      │
│      ↓                       │
│  Controllers                 │
│      ↓                       │
│  Models / Business Logic     │
│      ↓                       │
│  Middleware                  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      MongoDB + Mongoose      │
│                              │
│  users                       │
│  events                      │
│  bookings                    │
│  promoCodes                  │
└──────────────────────────────┘

The frontend uses React + TypeScript + Redux Toolkit, with no Context API for application state.

14. Application High-Level Flow
Attendee Flow
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
Login if required
  ↓
Check Ticket Availability
  ↓
Enter Card Details
  ↓
Payment
  ↓
Booking Confirmed
  ↓
My Bookings

Organizer Flow
Organizer Login
       ↓
Organizer Dashboard
       ↓
Create Event
       ↓
Add Ticket Tiers
       ↓
Publish Event
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

15. Booking Backend Flow

This is the core business flow:

POST /bookings
      ↓
Authenticate User
      ↓
Find Event
      ↓
Validate Ticket Tiers
      ↓
Check Availability
      ↓
Calculate Subtotal
      ↓
Validate Promo Code
      ↓
Calculate Discount
      ↓
Calculate Final Amount
      ↓
Payment
      ↓
Payment Successful?
     / \
   NO   YES
   ↓     ↓
 Fail   Update sold
          ↓
     Create Booking
          ↓
   bookingStatus =
      confirmed

16. Authentication Flow
Signup
  ↓
Hash Password
  ↓
Save User
  ↓
Login
  ↓
Verify Password
  ↓
Generate JWT
  ↓
Frontend receives token
  ↓
Redux stores auth state
  ↓
Protected request
  ↓
JWT sent with request
  ↓
Auth Middleware
  ↓
Verify JWT
  ↓
Role Middleware
  ↓
Controller

For example, creating an event:

POST /events
     ↓
JWT valid?
     ↓ Yes
Role = organizer?
     ↓ Yes
Create Event

An attendee attempting the same operation gets:

JWT valid?       ✅
Role organizer?  ❌
                 ↓
              403



Final Frozen DB Model


USERS
├── _id
├── name
├── email
├── password
├── role
└── timestamps


        │
        │
        ├──────────────┐
        │              │
        ▼              ▼
     EVENTS         BOOKINGS
     ├── _id        ├── _id
     ├── organizer  ├── user
     ├── title      ├── event
     ├── description├── tickets[]
     ├── category   ├── totalAmount
     ├── date       ├── promoCode
     ├── venue      ├── discountAmount
     ├── coverImage ├── paymentStatus
     ├── status     ├── bookingStatus
     ├── ticketTiers[] └── paymentMethod
     └── timestamps
          │
          └── ticketTiers[]
              ├── _id
              ├── name
              ├── price
              ├── capacity
              └── sold


PROMOCODES
├── _id
├── code
├── discountPercentage
├── isActive
├── expiresAt
└── createdAt

This is the core design we can freeze before implementation: 4 collections, embedded ticket tiers, ObjectId references, booking snapshots, backend availability validation, cancellation restoring inventory, simple promo codes, and fake payment initially with real payment integration later.


=======================================================================
Overall Application Flow
                         ┌──────────────────┐
                         │   USER VISITS    │
                         │    WEBSITE       │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  React Frontend  │
                         │ React + TS       │
                         │ Redux Toolkit    │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
              ┌───────────┐               ┌─────────────┐
              │  Attendee │               │  Organizer  │
              └─────┬─────┘               └──────┬──────┘
                    │                              │
                    ▼                              ▼
             Browse Events                  Organizer Login
                    │                              │
                    ▼                              ▼
             Search / Filter                Dashboard
                    │                              │
                    ▼                              ▼
            Event Details                  Create Event
                    │                              │
                    ▼                              ▼
          Select Ticket Tier              Add Ticket Tiers
                    │                              │
                    ▼                              ▼
                Checkout                    Publish Event
                    │                              │
                    ▼                              │
             Login / JWT                         │
                    │                              │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                         ┌──────────────────┐
                         │  Express Backend │
                         │     Node.js      │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
                 Routes      Middleware     Controllers
                                  │
                           JWT + Role Check
                                  │
                                  ▼
                              Models
                                  │
                                  ▼
                         MongoDB / Mongoose
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
                  Users         Events       Bookings
                                                │
                                                ▼
                                           Promo Code










Complete Attendee Flow
Home
 ↓
Browse Events
 ↓
Search / Filter
 ↓
Select Event
 ↓
View Event Details
 ↓
Select Ticket Tier + Quantity
 ↓
Checkout
 ↓
Login / Signup if required
 ↓
Backend validates JWT
 ↓
Check ticket availability
 ↓
Calculate subtotal
 ↓
Validate promo code
 ↓
Calculate discount + final amount
 ↓
Fake Card Payment
 ↓
Payment successful
 ↓
Update ticket `sold`
 ↓
Create Booking
 ↓
Booking Confirmed
 ↓
My Bookings














Organizer Flow
Login
 ↓
JWT Authentication
 ↓
Role = Organizer
 ↓
Organizer Dashboard
 ↓
Create Event
 ↓
Add Ticket Tiers
 │
 ├── General
 │    ├── Price
 │    ├── Capacity
 │    └── Sold
 │
 └── VIP
      ├── Price
      ├── Capacity
      └── Sold
 ↓
Publish Event
 ↓
Event becomes available to attendees
 ↓
Attendees book tickets
 ↓
Organizer Dashboard
 ↓
View bookings / attendees
 ↓
Monitor sold vs capacity




Booking + Cancellation Flow
                    BOOKING
                       │
                       ▼
                Check Availability
                       │
              ┌────────┴────────┐
              │                 │
         Available          Not Available
              │                 │
              ▼                 ▼
       Calculate Total       Reject Booking
              │
              ▼
        Promo Validation
              │
              ▼
         Fake Payment
              │
              ▼
        Payment Success
              │
              ▼
        Increase `sold`
              │
              ▼
       Create Booking
              │
              ▼
          Confirmed

If the user later cancels:

Confirmed Booking
       ↓
Cancel Booking
       ↓
bookingStatus = cancelled
       ↓
Restore purchased quantity
       ↓
Decrease event.ticketTier.sold
       ↓
Tickets become available again

The source specifically defines the attendee, organizer, booking, cancellation, authentication, and backend flows this way.

In one line

React UI → Redux state → API → Express Routes → JWT/Role Middleware → Controller → Mongoose Model → MongoDB → Response → Redux → UI