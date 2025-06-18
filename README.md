# 🚗  Car Dealership Web Application

> A full-stack web application built with **Django** for the frontend and **Express.js + MongoDB** for the backend. This project allows users to view car dealerships, explore details, add reviews, and more.

---

## 🌐 Tech Stack

| Frontend | Backend (API) | Database |
|----------|----------------|----------|
| ![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white) | ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) |

---

## 📊 Application Flow

```

🔵 User visits Django frontend
|
├── 🏠 Home page
├── 🧾 About / Contact / Login / Signup
└── 🚘 Dealership List
|
▼
🔍 Dealer Detail View
|
▼
✍️ Add Review (via Django Form)
|
▼
🛰️ Sends request to Express API ➝ 📦 MongoDB
|
▼
📡 Receives data from API and renders via Django Templates

```

---

## 🏗️ Architecture Diagram

```
            ┌────────────────────────────┐
            │         Client (User)      │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │   Django Frontend (8000)   │
            │  - Templates & Static UI   │
            │  - Forms & Auth Handling   │
            └────────────┬───────────────┘
                         │
                         ▼
          Sends HTTP Requests to Express API
                         │
                         ▼
            ┌────────────────────────────┐
            │  Express Backend (3000)     │
            │  - Dealers API             │
            │  - Reviews API             │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │     MongoDB (Database)     │
            │  - Dealers Collection      │
            │  - Reviews Collection      │
            └────────────────────────────┘
```



---

## 🔧 Project Structure

```

capstone-project/
├── express-server/        # Node.js + MongoDB microservice
│   ├── routes/            # API endpoints
│   ├── models/            # Mongoose schemas
│   ├── db.js              # MongoDB connection
│   ├── seed.js            # Sample data
│   └── server.js
│
├── server/                # Django Project
│   ├── capstone\_project/  # Settings, URLs, WSGI
│   ├── dealership/        # App logic, views, templates
│   └── static/            # CSS, JS, images
│
└── .github/
└── workflows/         # CI/CD workflow for Django

````

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/capstone-project.git
cd capstone-project
````

---

### 2️⃣ Backend: Express Setup

```bash
cd express-server
npm install
node seed.js      # Populate MongoDB with test data
node server.js    # Starts API at http://localhost:3000
```

---

### 3️⃣ Frontend: Django Setup

```bash
cd ../server
python -m venv venv
venv\Scripts\activate        # or source venv/bin/activate
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py runserver   # Starts frontend at http://localhost:8000
```

---

## 👨‍💻 Features

* 🔒 Secure authentication (signup/login)
* 📍 View all available car dealerships
* 📝 View detailed info and add reviews
* 🌍 Connects Django to external API
* 💬 Clean and intuitive UI

---

## 📸 Screenshots

> Add relevant screenshots from your app:

* Home Page
* Dealer Details
* Add Review Form
* Express API JSON Response

---

## ✅ Future Improvements

* 📲 Add mobile responsiveness
* 💡 Add filtering and search options for dealerships
* 📦 Store reviews with user IDs
* ⚙️ Admin dashboard

---

## 👨‍🏫 Developed By

**John Wesley**
Aspiring Web Developer & UI/UX Designer
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat\&logo=linkedin)](https://linkedin.com/in/john-wesley-6707ab258)
📧 [johnwesley8113@gmail.com](mailto:johnwesley8113@gmail.com)

---

