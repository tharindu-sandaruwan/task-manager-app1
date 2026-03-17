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
- cd task-manager-app
- CREATE DATABASE task_db;

### Update your application.properties
- spring.datasource.url=jdbc:mysql://localhost:3306/task_db?useSSL=false&serverTimezone=UTC
- spring.datasource.username=your_username
- spring.datasource.password=your_password
- spring.jpa.hibernate.ddl-auto=update
- spring.jpa.show-sql=true

### Run Backend (Spring Boot)
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
  
<img width="806" height="749" alt="Screenshot 2026-03-17 154538" src="https://github.com/user-attachments/assets/ab0fe5f8-71a6-4670-93f6-0ac2235358aa" />

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

### Example UI of Working App

<img width="1898" height="989" alt="Screenshot 2026-03-17 151139" src="https://github.com/user-attachments/assets/8b0b2e8c-bb46-48f6-a722-ebd891490eaf" />

<img width="1873" height="963" alt="Screenshot 2026-03-17 151732" src="https://github.com/user-attachments/assets/12e51c5c-70a1-4f1f-a2ae-74ba97a87215" />

<img width="1843" height="968" alt="Screenshot 2026-03-17 152028" src="https://github.com/user-attachments/assets/b4b180b4-45b5-42bc-bab5-ca756d62c68e" />




