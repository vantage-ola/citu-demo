# citu-demo assessment

A web application that enables friend groups to reconnect and learn together by organizing educational events and workshops.

## Features
- User Authentication(Group Members and Speakers)
- Group Management
- Event Management
- Speaker Profiles and Availability Management
- Mock Payment System

## Prequisites
- Docker and Docker Compose
- Git

## Project Structure
```
friend_group/
├── api/               # Django Backend
├── web/               # React Frontend (Vite + TypeScript + Material UI)
├── Dockerfile.backend
├── Dockerfile.frontend
└── docker-compose.yml
```

## Quick Start

1. Clone the repository
``` git clone git@github.com:vantage-ola/citu-demo.git
    cd friend_group
```
2. Start the application using Docker
```
docker compose up --build
```
The services will be available at:

Frontend: http://localhost:5173
Backend API: http://localhost:8000
Admin Interface: http://localhost:8000/admin
Swagger Documentation: http://localhost:8000/api/docs/

## Development Setup Without Docker
### Backend Setup
1. Navigate to the backend directory:
```
cd friend_group/api
```
2. Create and activate a virtual environment:
```
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
3. Install dependencies:
```
pip install -r requirements.txt
```
4. Run migrations:
```
python3 manage.py migrate
```
5. Create a superuser:
```
python3 manage.py createsuperuser
```
6. Start the development server:
```
python3 manage.py runserver
```
7. Run test:
```
python3 pytest
```
### Frontend Setup
1. Navigate to the frontend directory
```
cd friend_group/web
```
2. Install dependencies
```
npm install
```
3. Start the development server
```
npm run dev
```
4. Run tests
```
npm test
```

## Testing the API
Test using curl or a tool like Postman
1. Get an authentication token:
```
curl -X POST http://localhost:8000/api/token/ \
     -H "Content-Type: application/json" \
     -d '{"username": "your_username", "password": "your_password"}'
```
2. Use the token to acesss protected endpoints:
```
curl -X GET http://localhost:8000/api/events/ \
     -H "Authorization: Bearer your_token_here"
```

## API DOCUMENTATION
After staring the server, go to the url below to access the swagger documentation
```
http://localhost:8000/api/docs/
```
## API Endpoints

### Authentication
- POST /api/token/ - Get JWT token (login)
- POST /api/token/refresh/ - Refresh JWT token

### Users
- GET /api/users/ - List all users
- POST /api/users/ - Create new user
- GET /api/users/{id}/ - Get specific user
- PUT /api/users/{id}/ - Update user
- DELETE /api/users/{id}/ - Delete user

### Speakers
- GET /api/speakers/ - List all speaker profiles
- POST /api/speakers/ - Create speaker profile
- GET /api/speakers/{id}/ - Get specific speaker
- PUT /api/speakers/{id}/ - Update speaker profile
- DELETE /api/speakers/{id}/ - Delete speaker profile

### Speaker Availability
- GET /api/speaker-availability/ - List all availabilities
- POST /api/speaker-availability/ - Create availability
- GET /api/speaker-availability/{id}/ - Get specific availability
- PUT /api/speaker-availability/{id}/ - Update availability
- DELETE /api/speaker-availability/{id}/ - Delete availability

### Groups
- GET /api/groups/ - List all groups
- POST /api/groups/ - Create group
- GET /api/groups/{id}/ - Get specific group
- PUT /api/groups/{id}/ - Update group
- DELETE /api/groups/{id}/ - Delete group

### Group Memberships
- GET /api/group-memberships/ - List all memberships
- POST /api/group-memberships/ - Create membership
- GET /api/group-memberships/{id}/ - Get specific membership
- PUT /api/group-memberships/{id}/ - Update membership
- DELETE /api/group-memberships/{id}/ - Delete membership

### Events
- GET /api/events/ - List all events
- POST /api/events/ - Create event
- GET /api/events/{id}/ - Get specific event
- PUT /api/events/{id}/ - Update event
- DELETE /api/events/{id}/ - Delete event

### Event Registrations
- GET /api/event-registrations/ - List all registrations
- POST /api/event-registrations/ - Create registration
- GET /api/event-registrations/{id}/ - Get specific registration
- PUT /api/event-registrations/{id}/ - Update registration
- DELETE /api/event-registrations/{id}/ - Delete registration

### Payments
- GET /api/payments/ - List all payments
- POST /api/payments/ - Create payment
- GET /api/payments/{id}/ - Get specific payment
- PUT /api/payments/{id}/ - Update payment
- DELETE /api/payments/{id}/ - Delete payment

## Loading Test Data
To load sample data for testing:
```
# Using Docker
docker-compose exec backend python create_test_data.py

# Without Docker
cd api
python create_test_data.py
```
Test user credentials:
- Regular User/Member: username: john_doe, password: password123
- Speaker: username: expert_speaker, password: password123


# Friend Group Learning Platform - Development Assessment Report

## Project Overview
This project aimed to create a web application for friend groups to organize educational events and connect with speakers. The platform was built using Django REST Framework for the backend and React for the frontend, with Material UI for component design.

## Technical Architecture

### Backend (Django/DRF)
- Implemented a modular design with separate apps for users, groups, events, and speakers
- Used JWT authentication for secure API access
- Structured data models to support complex relationships between users, groups, and events
- Utilized SQLite for development simplicity while maintaining capability to scale to PostgreSQL

### Frontend (React)
- Material UI integration for consistent component design
- JWT-based authentication flow
- Responsive design considerations

## Design Decisions and Rationale

### Database Schema
- Chose to separate speaker profiles from user accounts to allow future expansion of speaker-specific features
- Implemented a flexible group membership system that supports different roles (admin/member)
- Created a mock payment system that could be replaced with real payment processing

### API Design
- RESTful architecture following DRF best practices
- Comprehensive endpoint structure for all major entities
- Token-based authentication for security

## Challenges and Solutions

### Technical Challenges
1. **Django/DRF Learning Curve**
   - Challenge: Limited prior experience with Django REST Framework
   - Solution: Leveraged official documentation and implemented features incrementally
   - Learning: Gained understanding of DRF's powerful model serialization and viewset capabilities

2. **Material UI Integration**
   - Challenge: First time working with Material UI
   - Solution: Started with basic components and gradually incorporated more complex ones
   - Learning: Appreciated the comprehensive component library but noted the importance of customization

### Design Challenges
1. **Absence of UI/UX Design Reference**
   - Challenge: No pre-existing design system or mockups
   - Solution: Focused on functional components first, using Material UI's default styling
   - Impact: Results in a functional but potentially less cohesive user experience
   - Learning: Recognized the importance of having design specifications before development

2. **Requirements Clarity**
   - Challenge: Unclear understanding of some feature requirements
   - Solution: Made assumptions and built flexible foundations that could be adapted
   - Learning: Importance of detailed requirement gathering and user storie

## Areas for Improvement

### Design Phase
- Would benefit from a proper design phase including:
  - User flow diagrams
  - UI/UX mockups
  - Detailed user stories

### Technical Implementation
- Could enhance with:
  - More comprehensive test coverage especially with the
  - Advanced filtering and search capabilities
  - Real-time notifications
  - More sophisticated event management features

## Conclusion
While the project presented challenges in terms of design direction and technical implementation, it served as a valuable learning experience.