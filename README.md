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
- POST /api/token/ - Get JWT token
- POST /api/token/refresh/ - Refresh JWT token

### Users
- GET /api/users/ - List users
- POST /api/users/ - Create user
- GET /api/users/{id}/ - Get user details

### Groups
- GET /api/groups/ - List groups
- POST /api/groups/ - Create group
- GET /api/groups/{id}/ - Get group details

### Events

- GET /api/events/ - List events
- POST /api/events/ - Create event
- GET /api/events/{id}/ - Get event details

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
   - Learning: Importance of detailed requirement gathering and user stories

## Learning Outcomes

### Technical Skills
- Gained practical experience with Django REST Framework
- Improved understanding of JWT authentication implementation
- First-time experience with Material UI
- Enhanced knowledge of React state management

### Development Process
- Better appreciation for the importance of design specifications
- Understanding of modular backend architecture
- Experience with Docker containerization

## Areas for Improvement

### Design Phase
- Would benefit from a proper design phase including:
  - User flow diagrams
  - UI/UX mockups
  - Detailed user stories

### Technical Implementation
- Could enhance with:
  - More comprehensive test coverage
  - Advanced filtering and search capabilities
  - Real-time notifications
  - More sophisticated event management features

## Conclusion
While the project presented challenges in terms of design direction and technical implementation, it served as a valuable learning experience. The combination of new technologies (Material UI) and frameworks (Django REST Framework) provided opportunities for skill development. Future projects would benefit from more detailed initial planning and design phases, but the current implementation provides a solid foundation for future enhancements.