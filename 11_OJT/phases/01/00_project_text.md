EventHub — OJT Project Brief
EventHub
An Event Booking & Ticketing Platform

Full-Stack Team Project · Build in Phases

Reference: Build a simplified Eventbrite.

Organizers publish events with multiple ticket tiers; attendees browse, book, and pay.

The system:

Never oversells tickets.
Confirms bookings only after payment succeeds.
SECTION 1 — The Problem Statement
What We Are Building

People constantly want to attend events such as:

Workshops
Concerts
Tech meetups
Comedy shows
Conferences

They need an easy way to:

Discover events.
Reserve a spot.

Event organizers need a simple way to:

Publish events.
Sell a limited number of tickets.
See who is attending.

The team will build EventHub, a web platform where:

Organizers
Create events.
Manage events.
Sell tickets.
Attendees
Browse events.
Book tickets.
Choose between different price tiers.
Pay online.

It is intended to be a complete, real-world full-stack application, similar to a product that exists in the market and can be demonstrated in an interview.

Important Project Note

This is a build-only project.

The entire application is developed end-to-end:

Frontend
Backend
Database
Authentication
Payments

Cloud deployment is NOT part of this project.

The goal is to have the application running locally end to end.

Real-World Reference

The clearest reference is Eventbrite.

Before starting, the team should spend some time looking at Eventbrite and notice:

How an organizer lists an event.
How different ticket types are offered.
How an attendee registers.
How an attendee pays.
How the event shows how many tickets are left.

EventHub is a simpler version of this.

Another reference suggested for the Indian events/experience style is BookMyShow.

Important

We are not cloning Eventbrite feature-for-feature.

The core loop is:

Publish an event with limited tickets

↓

Let people discover it

↓

Let them book and pay

↓

Never sell more tickets than actually exist

SECTION 2 — Technology Scope
The Stack

The project is expected to use the full-stack skills from the course.

The brief says nothing here should be outside what has already been learned.

Layer	Technology / Requirement
Frontend	React
Routing	React Router, including protected routes
State management	Redux Toolkit or Context
Forms	React forms
API calls	With loading / error / empty states
Backend	Node.js + Express REST API
Backend organization	Routes, controllers, models
Database	MongoDB recommended OR MySQL
Database data	Users, events, ticket types, bookings
Authentication	Signup/login with hashed passwords and JWT or session
Roles	Role stored on user
Payments	Stripe TEST mode
Payment	Dummy/test cards; no real money
Version control	Git + GitHub
Git workflow	Branches + Pull Requests
API testing	Postman or similar

The team should choose MongoDB or MySQL and stick with that choice. Both were taught, and the brief says team comfort and consistency are more important than the database choice.

SECTION 3 — Personas, Features & Flows

EventHub has three types of users:

Attendee
Organizer
Admin

The first two are mandatory.

Admin is optional and is only for teams that finish early.

PERSONA 1 — Attendee
Who?

The person who discovers events and books tickets.

What they care about

Finding events they like and getting a ticket with as little friction as possible.

Attendee Features

The attendee can:

Sign up and log in as an attendee.
Browse all upcoming events in a clean list or grid.
Search events by name.
Filter events by:
Category
Date
Price — free / paid
Open a single event and see:
Description
Date and time
Venue
Available ticket tiers
Ticket prices
Number of tickets remaining
Select quantities across one or more ticket tiers.

Example:

2 General + 1 VIP

Check out and pay.
Fake payment first.
Stripe test mode later.
View My Bookings, including:
Every event booked
Which tiers were booked
Amount paid
Booking confirmation
Cancel a booking.

When a booking is cancelled, those tickets return to the event's available pool.

Attendee Flow
Step 1

Lands on the home page and sees a list of upcoming events.

Step 2

Searches or filters to find events of interest.

Step 3

Opens an event and reviews:

Event details
Ticket tiers
Tickets remaining for each tier
Step 4

Chooses quantities across ticket tiers and clicks:

Book / Checkout

Step 5

If not logged in:

Prompt the user to log in.
Or sign up.
Step 6

The system verifies that enough tickets remain in each selected tier.

Step 7

Payment happens.

If payment succeeds:

Booking is confirmed.
Confirmation is shown.
Step 8

The attendee goes to My Bookings.

They can:

See their booking.
Cancel it.

Cancellation frees the tickets back up.

PERSONA 2 — Organizer
Who?

The person who creates events and sells tickets.

What they care about

Publishing events quickly and seeing how ticket sales are progressing.

Organizer Features

Organizer can:

Sign up and log in as an organizer.
Access an organizer dashboard.
Dashboard shows only their own events.
Each event shows key statistics:
Sold
Capacity
Create an event with:
Title
Description
Category
Date and time
Venue
Cover image — optional
Define one or more ticket tiers.

Each ticket tier has:

Name
Price
Capacity

Example:

General — lower price
VIP — higher price
Edit an event and its ticket tiers.
Adjust capacity.
Cancel or delete an event.
View attendee list for each event.

Attendee list should show:

Who booked
Number of tickets
Which tiers
Total sold per tier.
Organizer Flow
Step 9

Organizer logs in.

They land on their dashboard and see only their own events.

Step 10

Clicks Create Event.

Fills in:

Event details
One or more ticket tiers
Prices
Capacities
Step 11

Publishes the event.

The event now appears in the public listing that attendees browse.

Step 12

As attendees book:

The dashboard shows the sold count increasing toward capacity for each tier.

Step 13

Organizer opens an event and sees:

Attendee list
Per-tier sales
Step 14

Organizer can:

Edit the event.
Increase VIP capacity, for example.
Cancel the event.
PERSONA 3 — Admin
Status

Optional / Stretch

Only attempt this if the team finishes the mandatory functionality early.

Purpose

Platform oversight.

What Admin cares about

Keeping the platform healthy by having an overview of everything and being able to step in.

Admin Features

Admin can:

Log in as an admin.
See all events across all organizers.
Approve or reject events before they become public.
Moderate events.
Remove events.
Remove users.
See platform statistics:
Total events
Total bookings
Active users.
Admin Flow
Step 15

Admin logs in.

Sees all events:

Pending
Published
Step 16

Reviews a pending event.

Can:

Approve it → goes public.
Reject it.
Step 17

Can remove:

Any event.
Any user that violates rules.
Important

Admin should only be attempted after Attendee and Organizer experiences are fully working.

It is a bonus, not a requirement.

SECTION 4 — The Engineering Challenges
What Makes This More Than a CRUD App?

The brief makes an important distinction:

Anyone can build forms that save data into a database.

What makes EventHub a good project and a strong interview story is the real-world business logic.

These are the heart of the project, not afterthoughts.

1. Never Oversell a Ticket Tier

This is the signature rule of the whole platform.

When someone books tickets, the backend must check for each selected tier:

already sold + requested quantity <= tier capacity

If the requested booking would exceed capacity:

Reject the booking.

Example:

Capacity = 100

Already sold = 95

User requests = 6

Then:

95 + 6 = 101

Since:

101 > 100

The booking must be rejected.

This check happens separately for every selected ticket tier.

2. Confirm Only After Payment

A booking must become confirmed ONLY after payment succeeds.

If payment:

Fails
Is abandoned
Is cancelled

then tickets should not be taken.

This teaches the real:

order → pay → confirm

flow used by commerce systems.

3. Give Tickets Back on Cancellation

When a booking is cancelled:

The system must return exactly the right number of tickets to exactly the right ticket tiers.

Therefore the available ticket counts remain correct.

4. Role-Based Access

Attendees:

Cannot access organizer screens.
Cannot access organizer APIs.

Organizers:

Can only see their own events.
Can only edit their own events.

Every sensitive route must:

Be protected.
Check the user's role.
5. Live Derived Numbers

The application should calculate values such as:

Tickets left
Sold vs capacity
Percent full
Order totals across tiers

These are derived from the underlying data.

They should always be:

Correct
Up to date.
Two Questions You Must Be Able to Explain

During the final demo/code walkthrough, the team must be ready to explain:

Question 1

How do you prevent overselling?

Question 2

How is a booking confirmed only after payment?

These two questions are specifically identified as the things that distinguish a real project from a tutorial clone.

SECTION 5 — The Build Plan
Build in Layers: Simple First, Then Upgrade

The golden rule:

Get a simple version of the WHOLE app working end-to-end first.

Then upgrade the difficult parts one at a time.

Important rule

Never leave the app broken while building a big feature in isolation.

At the end of every phase, there should be a running application.

Why This Approach?

This is how professional teams reduce risk.

Payment example

First build the entire booking flow using FAKE payment.

The fake payment is simply:

A form.
User types any card details.
Payment automatically succeeds.

Only after the entire application works should this fake payment be replaced with real Stripe test mode.

The rest of the application does not have to wait for Stripe to be ready.

Upgrade Strategy

The brief specifically says:

Simple version first → whole app runs → upgrade hard parts

Examples:

Payment

Fake payment → Real Stripe

Tickets

Single ticket type → Multiple ticket tiers

Capacity

Basic capacity check → Pay-then-confirm flow

Important Phase Rule

Work through the phases in order.

The priority is understanding what is being built rather than rushing.

Move to the next phase only when the current phase genuinely works.

Mandatory parts should be solid before attempting stretch goals.

PHASE 1 — Foundation
Goal

The skeleton is in place and the team can work in parallel.

1. Plan & Design

Agree on:

Pages
Database schema
Users
Events
Ticket tiers
Bookings
API endpoints

Also draw rough wireframes.

2. Repository & Teamwork
Create GitHub repository.
Set up branches.
Set up a project board.
Split work among team members.
3. Basic Authentication

Implement:

Signup
Login
JWT or session

At this point:

Everyone is an attendee.

Roles will come later.

4. Seed Data

Put a few sample events directly into the database.

This allows the frontend to display real data before the organizer flow exists.

Phase 1 Deliverable

At the end of Phase 1:

Plan document
Repository skeleton
Working login
Seeded events visible through the API.
PHASE 2 — Thin Slice, End to End
Goal

An attendee can go from:

Browse → Book → Fake Payment

with:

ONE ticket type

The entire loop must work.

1. Browse & Detail

Build:

Events list page.
Single-event detail page.

Both read from the API.

2. Search & Filter

Support:

Name
Category
Date
Price
3. Booking — Single Tier

Attendee chooses a quantity.

Backend performs basic capacity check:

sold + quantity <= capacity

4. Fake Payment

Build a checkout form.

User:

Types any card details.
Clicks Pay.

Payment:

Always succeeds.
Booking is confirmed.

No Stripe yet.

5. My Bookings

Attendee can:

See bookings.
Cancel bookings.

Cancellation returns the tickets.

Phase 2 Deliverable

A working application running locally end-to-end with:

Browse

→ Book

→ Fake Pay

→ See Booking

→ Cancel Booking

This is described as the project's safety net.

Everything after this is an upgrade.

PHASE 3 — Upgrade to Multiple Ticket Tiers
Goal

An event can have several ticket types.

Each ticket type has its own:

Price
Capacity
Data & UI

An event now has an array of tiers:

tiers
 ├── name
 ├── price
 ├── capacity
 └── sold

The event detail page displays:

All tiers
Prices
Tickets left
Multi-Tier Booking

Attendee can select quantities across multiple tiers in one order.

Example:

General → 2
VIP     → 1

The total is summed across all selected tiers.

Per-Tier Capacity

The no-oversell check now runs per tier.

The amount charged is the sum across the selected tiers.

Important PDF Inconsistency

The PDF says:

“Deliverable at the end of Phase 4”

in the Phase 3 section.

The next section is explicitly labeled Phase 4: The Organizer.

So the document appears to contain a phase-numbering typo here. I am not silently correcting it, because you asked me to preserve the PDF content.

PHASE 4 — The Organizer
Goal

Real organizers create events, replacing the seed data.

Role-based access is introduced here.

Roles

Add the:

Organizer role

Protect routes by role.

Therefore:

Organizers can access the organizer dashboard.
Attendees cannot access it.
Create & Manage Events

Organizer can:

Create event.
Edit event.
Add ticket tiers.
Edit ticket tiers.
Cancel event.
Dashboard & Attendees

Organizer sees:

Their events.
Sold vs capacity per tier.
Attendee list for each event.
Phase 4 Deliverable

Organizers can:

Create their own events.
Manage their own events.
Use proper role-based access.
See who registered.
PHASE 5 — Real Payment, Stripe Test Mode
Goal

Replace fake payment with real Stripe test mode.

Bookings should be confirmed only after successful payment.

Stripe Checkout

Integrate Stripe in TEST mode.

When attendee checks out:

Create a Stripe Checkout session.
Send attendee to Stripe's payment page.
Attendee pays using a test card.
Confirm on Success

Booking is confirmed only when Stripe reports success.

If payment:

Fails
Is cancelled

then:

No tickets are taken.

This is the pay-then-confirm upgrade to the capacity logic.

Test Card

Use:

4242 4242 4242 4242

with:

Any future expiry.
Any CVC.

No real money is involved.

Phase 5 Deliverable

The brief says:

Booking now goes through a real Stripe test payment, and only successful payment creates a confirmed booking.

PHASE 6 — Polish, Edge Cases and Demo
Goal

Make the application:

Solid
Presentable
Demo-ready
Edge Cases

Handle:

Sold-out tiers
Cancellation
Empty states
Error messages
Invalid input
Trying to book more tickets than available
Polish

Have:

Consistent loading states.
Consistent error states.
Tidy UI.
Sensible empty screens.
README

README should contain:

Setup steps
Technologies used
Features
Test-card information
Screenshots
Demo Preparation

Each team member should be ready to:

Walk through the code they wrote.
Explain the two key engineering challenges:
No overselling
Pay-then-confirm
Stretch Features

Only if the team is ahead:

Admin persona
Reserved-seat selection
Promo codes
Email confirmations.
Phase 6 Deliverable

A:

Complete + polished + demo-ready application

with:

README
Local end-to-end functionality.
SECTION 6 — Plan at a Glance
The Six Phases
Phase	Focus	What Happens
Phase 1	Foundation	Plan, schema, repo, basic auth, seed events
Phase 2	Thin slice, end to end	Browse, book, FAKE pay, My Bookings — single tier
Phase 3	Multiple tiers	Multiple ticket tiers, per-tier capacity and totals
Phase 4	Organizer	Organizer role, create/manage events, dashboard, attendee lists
Phase 5	Real payment	Replace fake payment with Stripe test mode; confirm only after payment
Phase 6	Polish & demo	Polish, edge cases, README, demo preparation + optional stretch

DEFINITION OF DONE

The EventHub project is complete when all of the following are true.

Attendee

An attendee can:

Sign up.
Browse events.
Search events.
Book across multiple ticket tiers.
Pay with Stripe test mode.
See bookings.
Cancel bookings.
Organizer

An organizer can:

Sign up.
Create events.
Manage events.
Create/manage multiple ticket tiers.
View sales.
View attendees for their own events.
Business Logic

The system:

Never oversells any ticket tier.
Confirms a booking only after successful payment.
Roles

Roles are enforced.

Attendees and organizers see only what they are supposed to see.

UI States

The application handles:

Loading states.
Error states.
Empty states.
Git / Documentation

There is:

A clear README.
Clean Git history.
Evidence that all team members contributed.
Branches.
Pull requests.
Running Application

The complete application runs:

Locally → End to End.

The Entire Project in One Flow

If we reduce the whole PDF to the actual development journey, it is:

                    EVENTHUB
                       │
                       ▼
              Event Booking Platform
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
      ATTENDEE                  ORGANIZER
          │                         │
          ▼                         ▼
    Browse Events             Create Events
          │                         │
    Search / Filter            Add Ticket Tiers
          │                         │
          ▼                         ▼
   Event Details              Publish Event
          │                         │
          ▼                         ▼
   Select Tickets             Manage Events
          │                         │
          └────────────┬────────────┘
                       ▼
                    BOOKING
                       │
                       ▼
              Capacity Check
                       │
                       ▼
                  PAYMENT
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
       SUCCESS                   FAILURE
          │                         │
          ▼                         ▼
   Confirm Booking            No Tickets Taken
          │
          ▼
    My Bookings
          │
          ▼
       Cancel
          │
          ▼
   Tickets Returned

And the development order is:

PHASE 1
Foundation
   ↓
PHASE 2
Single-tier complete app + fake payment
   ↓
PHASE 3
Multiple ticket tiers
   ↓
PHASE 4
Organizer + role-based access
   ↓
PHASE 5
Stripe test payment
   ↓
PHASE 6
Edge cases + polish + README + demo
   ↓
DONE
The 5 most important things to keep in our head while implementing
Event → Ticket Tiers → Capacity
Attendee → Browse → Book → Pay → Confirm
Organizer → Create → Manage → See Sales/Attendees
Never oversell
Never confirm before successful payment

The PDF itself explicitly identifies overselling prevention and pay-then-confirm as the two major engineering challenges we should be prepared to explain in the interview/demo.

So now we have the complete 11-page project brief captured and organized. We can use this as the source of truth and start implementation from Phase 1, rather than jumping straight into code.