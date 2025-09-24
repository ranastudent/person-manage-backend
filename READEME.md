# Person Management Backend

This project is a **Node.js + Express.js backend** application for managing people data with features like authentication, role-based access, pagination, search, filtering, sorting, tagging, and file upload support.  

---

## 🚀 Core Features

- **Authentication & Authorization**
  - JWT-based authentication.
  - Role-based authorization (`admin`, `user`).

- **Person Management**
  - Create, Read, Update, Delete (CRUD) operations for persons.
  - Upload profile photos (via Multer).
  - Bulk import from CSV/Excel files.

- **Advanced Features**
  - Pagination with `?page` and `?limit`.
  - Search & filter by name, email, or phone number.
  - Sorting by fields (e.g., `name`, `age`, `createdAt`).
  - Tagging & grouping people (e.g., `Friends`, `Family`, `Colleagues`).

- **Admin Features**
  - Manage all persons.
  - Import/export data.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (or PostgreSQL, depending on your config)
- **ORM/Query Builder:** Sequelize / Prisma (your choice)
- **Authentication:** JWT (jsonwebtoken)
- **File Uploads:** Multer
- **Environment Variables:** dotenv
- **Validation:** express-validator / Joi (if applied)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/person-management-backend.git
   cd person-management-backend

2. Install dependencies
   npm install

3. Create a .env file in the root directory:
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=person_db
   JWT_SECRET=your_jwt_secret


## 📡 API Endpoints

Auth

 POST /api/auth/register – Register a new user.

 POST /api/auth/login – Login and get JWT.

Person

 POST /api/person – Create person (with photo upload).

 GET /api/person – Get all persons (pagination, search, filter, sort, tags).

 GET /api/person/:id – Get single person by ID.

 PUT /api/person/:id – Update person (with photo upload).

 DELETE /api/person/:id – Delete person.

 POST /api/person/import – Bulk import persons (CSV/Excel).