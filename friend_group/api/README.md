# API Endpoints Documentation

## Authentication
- POST /api/token/ - Get JWT token (login)
- POST /api/token/refresh/ - Refresh JWT token

## Users
- GET /api/users/ - List all users
- POST /api/users/ - Create new user
- GET /api/users/{id}/ - Get specific user
- PUT /api/users/{id}/ - Update user
- DELETE /api/users/{id}/ - Delete user

## Speakers
- GET /api/speakers/ - List all speaker profiles
- POST /api/speakers/ - Create speaker profile
- GET /api/speakers/{id}/ - Get specific speaker
- PUT /api/speakers/{id}/ - Update speaker profile
- DELETE /api/speakers/{id}/ - Delete speaker profile

## Speaker Availability
- GET /api/speaker-availability/ - List all availabilities
- POST /api/speaker-availability/ - Create availability
- GET /api/speaker-availability/{id}/ - Get specific availability
- PUT /api/speaker-availability/{id}/ - Update availability
- DELETE /api/speaker-availability/{id}/ - Delete availability

## Groups
- GET /api/groups/ - List all groups
- POST /api/groups/ - Create group
- GET /api/groups/{id}/ - Get specific group
- PUT /api/groups/{id}/ - Update group
- DELETE /api/groups/{id}/ - Delete group

## Group Memberships
- GET /api/group-memberships/ - List all memberships
- POST /api/group-memberships/ - Create membership
- GET /api/group-memberships/{id}/ - Get specific membership
- PUT /api/group-memberships/{id}/ - Update membership
- DELETE /api/group-memberships/{id}/ - Delete membership

## Events
- GET /api/events/ - List all events
- POST /api/events/ - Create event
- GET /api/events/{id}/ - Get specific event
- PUT /api/events/{id}/ - Update event
- DELETE /api/events/{id}/ - Delete event

## Event Registrations
- GET /api/event-registrations/ - List all registrations
- POST /api/event-registrations/ - Create registration
- GET /api/event-registrations/{id}/ - Get specific registration
- PUT /api/event-registrations/{id}/ - Update registration
- DELETE /api/event-registrations/{id}/ - Delete registration

## Payments
- GET /api/payments/ - List all payments
- POST /api/payments/ - Create payment
- GET /api/payments/{id}/ - Get specific payment
- PUT /api/payments/{id}/ - Update payment
- DELETE /api/payments/{id}/ - Delete payment