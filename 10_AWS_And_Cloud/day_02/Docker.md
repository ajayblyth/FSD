What Is Docker?
A container bundles your app + all its dependencies

Container = one bundle: app + dependencies > runs the same on any machine, any OS

Portable

Move between machines & OSes - behaves
identically

Lightweight
Shares the host OS kernel - starts in seconds

One laptop -> Container A (Node v20) + Container B (Node v24) - at once, no conflict

==========================
Image vs Container
Blueprint vs running instance

IMG

RUN

Image

A read-only template / blueprint.
Like a class, or an .exe file.
Built once, shared.

Container

A running instance of an image.
Like an object.
One image > many containers.