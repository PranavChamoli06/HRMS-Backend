# 🚀 HRMS Backend (Enterprise Spring Boot Project)

A production-ready **Hotel Reservation and Management System (HRMS) backend** built using **Spring Boot**.

This project demonstrates **enterprise backend architecture** including:

* JWT authentication
* Role-based and permission-based authorization
* Reservation management system
* Analytics dashboard APIs
* Flyway database migrations
* Docker containerization
* Swagger API documentation
* Monitoring with Spring Boot Actuator

---

# 📌 Project Overview

This backend provides secure REST APIs for managing **hotel reservations, rooms, users, and analytics dashboards**.

The system is designed following **clean architecture principles** and **enterprise backend best practices**.

Key design goals:

* Scalable architecture
* Secure authentication system
* Versioned database schema
* Containerized deployment
* Production-ready monitoring
* Business rule enforcement
* Analytics-ready backend

---

# 🏗 Architecture

The project follows a **layered architecture**.

```
controller → service → repository → database
```

Project structure:

```
src/main/java/com/example/HRMS
│
├── config          # Security, JWT, CORS, OpenAPI configuration
├── controller      # REST API controllers
├── dto             # Request / Response models
├── entity          # Database entities
├── exception       # Global exception handling
├── repository      # Spring Data JPA repositories
├── service         # Business logic
│   ├── ai          # AI integration scaffold
│   └── impl
└── HRMSApplication
```

---

# 🔐 Security Features

* JWT based authentication
* Refresh token support
* BCrypt password hashing
* Role based access control
* Permission based authorization
* Method level security
* Custom authentication entry points
* Access denied handling
* Secure API endpoints

---

# 🏨 Reservation System Features

Implemented in **Phase 5 Extension (Day 17–21)**.

### Room Management

Each reservation is linked to a **room**.

Room fields:

* Room number
* Room type
* Price per night

### Reservation Management

Reservations contain:

* User
* Room
* Check-in date
* Check-out date
* Reservation status

Reservation status options:

```
PENDING
CONFIRMED
CANCELLED
```

---

# 📅 Reservation APIs

Create reservation

```
POST /api/v1/reservations
```

Get reservations

```
GET /api/v1/reservations
```

Update reservation

```
PUT /api/v1/reservations/{id}
```

Delete reservation

```
DELETE /api/v1/reservations/{id}
```

Update reservation status

```
PATCH /api/v1/reservations/{id}/status
```

---

# 📊 Pagination, Sorting & Filtering

The API supports enterprise-level queries.

Example requests:

Pagination

```
GET /api/v1/reservations?page=0&size=10
```

Sorting

```
GET /api/v1/reservations?page=0&size=10&sort=checkInDate,asc
```

Filtering by user

```
GET /api/v1/reservations?username=admin
```

Filtering by date

```
GET /api/v1/reservations?startDate=2026-04-01
```

---

# ⚙ Business Rules Implemented

The system enforces real-world booking logic.

### Date Validation

```
checkInDate must be before checkOutDate
```

### Overlapping Booking Prevention

The system prevents **double booking of the same room**.

### Reservation Status Rules

Valid transitions:

```
PENDING → CONFIRMED
PENDING → CANCELLED
CONFIRMED → CANCELLED
```

Invalid transitions are rejected.

---

# 📈 Analytics Dashboard APIs

The backend provides analytics data for **admin dashboards**.

### Total Revenue

```
GET /api/v1/analytics/revenue
```

### Room Occupancy Rate

```
GET /api/v1/analytics/occupancy
```

### Monthly Revenue

```
GET /api/v1/analytics/monthly-revenue
```

### Reservation Cancellation Rate

```
GET /api/v1/analytics/cancellation-rate
```

These endpoints are **restricted to ADMIN users**.

---

# 🗄 Database Management

The project uses **Flyway for database migrations**.

Benefits:

* Version controlled database schema
* Safe production deployments
* Automated migrations

Migration scripts are located in:

```
src/main/resources/db/migration
```

Example migrations:

```
V1__initial_schema.sql
V2__room_reservation_schema.sql
```

---

# 🐳 Docker Deployment

The backend can run fully inside Docker.

### Build and Run

```bash
docker-compose up --build
```

This starts:

* Spring Boot application
* MySQL database container

---

# 📑 API Documentation

Swagger UI is available at:

```
http://localhost:8080/swagger-ui/index.html
```

You can test secured APIs directly using the **JWT token**.

---

# 📊 Monitoring

Spring Boot Actuator provides monitoring endpoints.

Health check:

```
http://localhost:8080/actuator/health
```

Application info:

```
http://localhost:8080/actuator/info
```

---

# 🧠 AI Integration (Scaffold)

The project includes a placeholder service for future AI integrations.

Example endpoint:

```
GET /api/v1/ai/analyze
```

This module can later integrate:

* Machine Learning models
* Python microservices
* OpenAI APIs
* Predictive reservation analytics

---

# 🛠 Tech Stack

Backend:

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA

Security:

* JWT Authentication
* BCrypt Encryption

Database:

* MySQL
* Flyway

Infrastructure:

* Docker
* Docker Compose

Documentation:

* Swagger / OpenAPI

Monitoring:

* Spring Boot Actuator

---

# ▶ Running the Project Locally

### 1️⃣ Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/HRMS-Backend.git
```

### 2️⃣ Navigate to project

```bash
cd HRMS-Backend
```

### 3️⃣ Build project

```bash
mvn clean install
```

### 4️⃣ Run application

```bash
mvn spring-boot:run
```

---

# 🌐 Default Endpoints

Authentication

```
POST /api/v1/auth/login
POST /api/v1/auth/refresh
```

Reservation APIs

```
POST /api/v1/reservations
GET /api/v1/reservations
PUT /api/v1/reservations/{id}
DELETE /api/v1/reservations/{id}
```

Analytics APIs

```
GET /api/v1/analytics/revenue
GET /api/v1/analytics/occupancy
GET /api/v1/analytics/monthly-revenue
GET /api/v1/analytics/cancellation-rate
```

AI Module

```
GET /api/v1/ai/analyze
```

---

# 📂 Docker Structure

```
Dockerfile
docker-compose.yml
```

These allow the application to run in containers with MySQL.

---

# 📈 Future Improvements

Planned improvements:

* Frontend dashboard (React)
* AI-powered reservation analytics
* CI/CD pipeline
* Kubernetes deployment
* Microservices architecture
* Real-time booking notifications

---

# 👨‍💻 Author

Developed by **Pranav Chamoli**

---
