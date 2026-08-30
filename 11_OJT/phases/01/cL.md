Good — pure MongoDB now, and a few of your constraints change the schema shape a bit (embedded tiers become even more natural in Mongo, promo code stays a flat lookup, payment stays fake-first). Here's the full structure.

Collections & Schemas
1. users
Field	Type	Notes
_id	ObjectId	auto
name	String	required
email	String	required, unique, indexed
passwordHash	String	required, bcrypt
role	String, enum: ['attendee','organizer','admin']	default 'attendee'
createdAt / updatedAt	Date	timestamps: true in schema options
2. events (tiers embedded — not a separate collection)
Field	Type	Notes
_id	ObjectId	auto
organizer	ObjectId, ref: 'User'	required
title	String	required
description	String	
category	String	for filtering
venue	String	
eventDateTime	Date	required
coverImageUrl	String	optional
status	String, enum: ['pending','published','cancelled','rejected']	default 'published'
tiers	Array of subdocuments (below)	embedded
createdAt / updatedAt	Date	

Embedded tiers[] subdocument:

Field	Type	Notes
_id	ObjectId	Mongoose auto-generates one per subdoc — this is what you reference from bookings
name	String	"General", "VIP"
price	Number	required
capacity	Number	required
sold	Number	default 0

Add a virtual for ticketsLeft (capacity - sold) rather than storing it — same reasoning as before, don't let a derived number drift from the source.

Why embed tiers instead of a separate TicketTier collection? Tiers are always read and written together with their event, never queried independently. Embedding means your organizer dashboard's "sold vs capacity" comes straight off the Event document — no join needed at all. This is one place Mongo is genuinely simpler than the relational version.

3. bookings
Field	Type	Notes
_id	ObjectId	auto
user	ObjectId, ref: 'User'	required — the attendee
event	ObjectId, ref: 'Event'	required
items	Array (below)	embedded — one entry per tier chosen
subtotal	Number	sum before discount
promoCode	String	optional, uppercase, e.g. "SAVE10"
discountAmount	Number	default 0
totalAmount	Number	subtotal - discountAmount
status	String, enum: ['pending','confirmed','failed','cancelled']	default 'pending'
payment	Object (below)	embedded
createdAt, confirmedAt, cancelledAt	Date	

Embedded items[]:

Field	Type	Notes
tierId	ObjectId	matches an _id inside event.tiers
tierName	String	snapshot — so it still reads correctly even if the organizer renames/deletes the tier later
quantity	Number	
priceAtBooking	Number	snapshot, protects against future price edits

Embedded payment object (fake for now, real gateway plugs into the same shape later):

Field	Type	Notes
method	String, enum: ['fake','razorpay','stripe']	default 'fake'
cardHolderName	String	
cardLast4	String	only last 4 digits stored, even in fake mode — good habit to carry into the real integration
transactionId	String	empty for now, filled once Razorpay/Stripe is wired in
paidAt	Date	
4. promocodes (deliberately simple — no usage limits, no per-user redemption tracking)
Field	Type	Notes
_id	ObjectId	auto
code	String	required, unique, uppercase
discountPercent	Number	e.g. 10 for 10% off
isActive	Boolean	default true
createdAt	Date	
Relationships (Mongo-style — reference vs embed)
Relationship	Type	How
User → Event	1 : N	event.organizer references User._id
User → Booking	1 : N	booking.user references User._id
Event → tiers	1 : N	embedded array, not referenced
Event → Booking	1 : N	booking.event references Event._id
Booking ↔ tiers	M : N	resolved via booking.items[], each item pointing at a tierId that lives inside the event doc
Booking → payment	1 : 1	embedded object, not a separate collection (for now)
Booking → PromoCode	loose reference	by code string, not ObjectId — matches "keep it simple," no need to populate a whole promo document

Mongo has no real foreign keys — every one of these is enforced in your controllers, not the database. That's worth saying out loud in your demo: it's a deliberate trade-off vs. MySQL.

"Joins" → Mongoose .populate()

My Bookings page:

js
Booking.find({ user: userId })
  .populate('event', 'title eventDateTime venue')
  .sort({ createdAt: -1 });

Note you don't need to populate into event.tiers for tier name/price — items[] already snapshots tierName and priceAtBooking, so the booking is self-contained even if the event later changes.

Organizer's attendee list:

js
Booking.find({ event: eventId, status: 'confirmed' })
  .populate('user', 'name email');
The No-Oversell Check (the part that actually matters)

Do this inside a Mongoose session/transaction, not a bare updateOne, at least while you're learning it — it's much easier to reason about than the atomic array-filter trick:

js
const session = await mongoose.startSession();
session.startTransaction();
try {
  const event = await Event.findById(eventId).session(session);
  const tier = event.tiers.id(tierId);

  if (tier.sold + qty > tier.capacity) {
    throw new Error('Not enough tickets left in this tier');
  }
  tier.sold += qty;
  await event.save({ session });

  const booking = await Booking.create([{ /* booking doc */ }], { session });

  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}

⚠️ Heads up for local dev: MongoDB transactions require a replica set, even a single-node one. A plain standalone mongod won't support startSession()/transactions. If you're running MongoDB locally without this, you'll hit an error the first time you try it — worth setting up early in Phase 1, not discovering it in Phase 3.

Cancellation (tickets go back up)

Same transaction pattern, reversed:

js
const session = await mongoose.startSession();
session.startTransaction();
try {
  const booking = await Booking.findById(bookingId).session(session);
  if (booking.status !== 'confirmed') throw new Error('Cannot cancel this booking');

  const event = await Event.findById(booking.event).session(session);
  booking.items.forEach(item => {
    const tier = event.tiers.id(item.tierId);
    tier.sold -= item.quantity;
  });

  booking.status = 'cancelled';
  booking.cancelledAt = new Date();

  await event.save({ session });
  await booking.save({ session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;
} finally {
  session.endSession();
}
Fake Payment (collect details, just move on)

Keep the controller boundary clean now so swapping in Razorpay later doesn't touch anything else:

Frontend checkout form collects cardHolderName, card number, expiry, CVC — store only cardLast4, discard the rest (don't persist full card numbers even though it's fake; builds the right habit).
POST /api/bookings/:id/pay → no real gateway call, just:
validate the fields are present
set booking.status = 'confirmed'
set payment.method = 'fake', payment.cardLast4, payment.paidAt = now
Design tip: wrap this in a small paymentProvider module with one function, e.g. chargeBooking(booking, cardDetails). Right now it just resolves immediately. When you add Razorpay, you swap the internals of that one function — the route, controller, and rest of the app don't change at all.
Promo Code (deliberately not a coupon system)
POST /api/promo/validate → looks up PromoCode by code, checks isActive
If valid: discountAmount = subtotal * discountPercent / 100, totalAmount = subtotal - discountAmount
Store promoCode and discountAmount directly on the booking — no usage limits, no per-user redemption tracking, no expiry logic unless you want to add it later as a stretch.
Suggested Folder Structure
backend/
  src/
    models/          → User.ts, Event.ts, Booking.ts, PromoCode.ts
    controllers/      → authController, eventController, bookingController,
                         organizerController, promoController
    routes/           → authRoutes, eventRoutes, bookingRoutes,
                         organizerRoutes, promoRoutes
    middleware/        → auth.ts (JWT verify), role.ts (role check)
    config/            → db.ts
    server.ts

frontend/
  src/
    app/               → store.ts (Redux Toolkit store)
    features/
      auth/authSlice.ts
      events/eventsSlice.ts
      bookings/bookingsSlice.ts
      organizer/organizerSlice.ts
    api/               → RTK Query API slices (recommended over manual thunks —
                          pairs naturally with Redux Toolkit and gives you
                          loading/error states almost for free, which the
                          brief explicitly asks for)
    pages/
    components/


Git Branching (as you described it)
main — always in a working, demoable state
Feature branches per chunk of work: feature/auth, feature/event-crud, feature/booking-flow, feature/organizer-dashboard, feature/promo-code, feature/payment-integration
Work happens on the feature branch → tested locally → PR into main once it's genuinely working, not mid-build
This maps naturally onto the phases: Phase 1–2 work can live on feature/auth + feature/booking-flow, Phase 3 on a tiers-upgrade branch, Phase 4 on feature/organizer-dashboard, Phase 5 on feature/payment-integration when you swap fake → Razorpay/Stripe.
Overall Flow (Mongo version)

Attendee:

GET /api/events (public, filters via query params) — browse/search
GET /api/events/:id — detail page, tiers come back embedded, ticketsLeft virtual computed per tier
Redux slice holds selected quantities per tier as a local "cart" — nothing hits the backend until checkout
Optional: POST /api/promo/validate → discount applied client-side to the running total
POST /api/bookings → creates booking status: 'pending', runs the transaction-based capacity check per tier
POST /api/bookings/:id/pay → fake payment confirms it → status: 'confirmed'
GET /api/bookings/my → My Bookings page
POST /api/bookings/:id/cancel → transaction reverses sold on each tier, status: 'cancelled'

Organizer:

GET /api/organizer/events — filtered by organizer from the JWT, never a client-supplied id
POST /api/organizer/events — create event + tiers in one document
Dashboard sold/capacity — read straight off the event doc, no aggregation needed since tiers are embedded
GET /api/organizer/events/:id/attendees — the populate query above, filtered to confirmed
PATCH / DELETE on own events only — ownership check in the controller, backed by the role middleware

One open decision worth locking down before you start Phase 2, same as before but now more relevant since payment is instant/fake: do you increment sold at booking creation (before "payment") or only after payment confirms? Since fake payment is synchronous and instant, either works fine right now — but decide it deliberately, document it, because it becomes a real question again the moment you swap in Razorpay and there's a genuine gap between "checkout started" and "payment confirmed."

Want me to draft the actual Mongoose schema files (TypeScript interfaces + schema definitions) for these four models next, or the Redux Toolkit slice + RTK Query setup for the booking flow?

==========================
Got it — scoping this down to just the schema + relations + flow, keeping the earlier instructions in mind (MongoDB, promo code not coupons, fake payment first, cancel restores tickets).

Collections, Fields & Data Types
1. users
Field	Type	Notes
_id	ObjectId	auto
name	String	required
email	String	required, unique, indexed
passwordHash	String	required
role	String (enum: attendee, organizer, admin)	default attendee
createdAt, updatedAt	Date	timestamps
2. events (ticket tiers embedded)
Field	Type	Notes
_id	ObjectId	auto
organizer	ObjectId → ref: User	required
title	String	required
description	String	
category	String	for filters
venue	String	
eventDateTime	Date	required
coverImageUrl	String	optional
status	String (enum: pending, published, cancelled, rejected)	default published
tiers	Array of subdocuments	embedded, see below
createdAt, updatedAt	Date	timestamps

tiers[] subdocument (embedded, not a separate collection):

Field	Type	Notes
_id	ObjectId	auto-generated per subdoc, referenced by bookings
name	String	e.g. "General", "VIP"
price	Number	required
capacity	Number	required
sold	Number	default 0

ticketsLeft = capacity - sold, kept as a virtual, never stored.

3. bookings
Field	Type	Notes
_id	ObjectId	auto
user	ObjectId → ref: User	required, the attendee
event	ObjectId → ref: Event	required
items	Array of subdocuments	embedded, one per tier chosen
subtotal	Number	before discount
promoCode	String	optional, plain string, not a reference
discountAmount	Number	default 0
totalAmount	Number	subtotal - discountAmount
status	String (enum: pending, confirmed, failed, cancelled)	default pending
payment	Object	embedded, see below
createdAt, confirmedAt, cancelledAt	Date	

items[] subdocument:

Field	Type	Notes
tierId	ObjectId	matches an _id inside event.tiers
tierName	String	snapshot at booking time
quantity	Number	
priceAtBooking	Number	snapshot at booking time

payment embedded object:

Field	Type	Notes
method	String (enum: fake, razorpay)	default fake
cardHolderName	String	
cardLast4	String	only last 4 digits stored
transactionId	String	empty until real gateway wired in
paidAt	Date	
4. promocodes
Field	Type	Notes
_id	ObjectId	auto
code	String	required, unique, uppercase
discountPercent	Number	e.g. 10
isActive	Boolean	default true
createdAt	Date	
Relations / Dependencies
Relation	Type	How it's linked
User → Event	1 : N	event.organizer references User._id
User → Booking	1 : N	booking.user references User._id
Event → tiers	1 : N	embedded array inside event.tiers, no separate collection
Event → Booking	1 : N	booking.event references Event._id
Booking ↔ tiers	M : N	resolved via booking.items[], each item's tierId points into event.tiers
Booking → payment	1 : 1	embedded object, not referenced
Booking → PromoCode	loose	matched by code string at validation time, not stored as ObjectId reference

No real foreign keys exist in Mongo — every one of these is enforced in the controllers (checking ownership, checking the referenced tier exists, etc.), not by the database itself.

Overall Flow

Attendee:

Browse/search events → reads events collection with filters (public route)
Open event detail → single event returned with tiers[] embedded, ticketsLeft computed per tier
Pick quantities per tier (held in Redux state as a local cart, nothing hits backend yet)
Optional: validate promo code → discount applied to running total
Checkout → creates a booking doc with status: pending, items[] snapshotted; backend checks per-tier capacity (sold + qty <= capacity) and increments sold on the matching tier inside event.tiers
Fake payment step → collects card details, doesn't call any gateway → flips booking.status to confirmed, fills payment object
My Bookings → lists user's bookings via user reference
Cancel → reverses sold on each tier in items[], sets booking.status = cancelled

Organizer:

Login → dashboard → own events only, filtered by organizer from the JWT (never trusted from the client)
Create event → one document with tiers[] included directly
Sold-vs-capacity per tier → read straight off the event document, no join/aggregation needed since tiers are embedded
Attendee list per event → bookings filtered by event + status: confirmed, populated with user name/email
Edit/cancel event → same ownership check every time

Auth layer (applies to every protected route): JWT carries userId + role → middleware checks role before controller runs → this is what actually enforces "attendee can't reach organizer routes," not just hiding buttons in the UI.

One thing to lock down before Phase 2: whether sold gets incremented at booking-creation (before fake payment) or only after payment confirms. With fake payment being instant, either works right now — but decide and document it, since it matters again once Razorpay adds a real gap between those two steps.