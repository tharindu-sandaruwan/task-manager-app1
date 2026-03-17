# 📝 Task Manager Application

A full-stack **Task Management System** built using:

- **Backend:** Spring Boot (Java)
- **Frontend:** React (Vite + Tailwind CSS)
- **Database:** MySQL

This application allows users to create, assign, track, and manage tasks efficiently.

---

## 🚀 Features

### Task Management
- Create tasks (title, description, due date, priority)
- View all tasks
- Update task details
- Delete tasks
- Mark tasks as complete
- Filter tasks by:
  - Status (TODO, IN_PROGRESS, DONE)
  - Assignee
- Sort tasks by:
  - Due Date
  - Priority

### User Management
- Create users
- Assign tasks using user email
- ---

## ⚙️ How to Run the Project Locally

### 🔧 Prerequisites
- Java 17+
- Node.js (v18+ recommended)
- MySQL
- Maven

---

### 1️⃣ Clone the Repository

cd task-manager-app
CREATE DATABASE task_db;

###Update your application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/task_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

###Run Backend (Spring Boot)
- cd backend
- mvn spring-boot:run
- Backend runs on - http://localhost:8080
  
### Run Frontend (React)
- cd frontend
- npm install
- npm run dev
- Frontend runs on - http://localhost:5173

### Database Choice
- Relational structure fits well with User ↔ Task relationship
- Easy integration with Spring Boot (JPA/Hibernate)
- Widely used in industry

### API Endpoints

## Task APIs
Method	Endpoint	                 Description
POST	  /tasks	                   Create a task
GET	    /tasks	                   Get all tasks
GET	    /tasks/status/{status}	   Filter by status
GET	    /tasks/assignee/{email}	   Filter by assignee
GET	    /tasks/sort/dueDate	       Sort by due date
GET	    /tasks/sort/priority	     Sort by priority
PUT	    /tasks/{task-id}	         Update task
DELETE	/tasks/{task-id}	         Delete task
PATCH	 /tasks/{id}/complete	       Mark task as completed

## User APIs
Method	Endpoint	 Description
POST	  /users	   Create user
GET   	/users	   Get all users

### Design Decisions & Assumptions
- Tasks are assigned using email instead of user ID for simplicity
- createdAt is automatically set when task is created
- completedAt is set only when marking task as complete
- Backend handles business logic and validation
- Frontend handles filtering and sorting

### Known Limitations
- No authentication system implemented
- Passwords stored in plain text (not secure)
- No pagination for large datasets
- Limited validation (email format not strictly validated)

### Future Improvement
- Add authentication (JWT / Spring Security)
- Deploy using Docker / AWS
- Add unit & integration testing
- Email notifications for task assignment



