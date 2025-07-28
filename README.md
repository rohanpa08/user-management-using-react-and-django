# react-django-user-management

## 📌 Project Description

**User Management System using React and Django** is a full-stack web application that enables secure and scalable user authentication and profile management. Built with **React** on the frontend and **Django REST Framework** on the backend, it allows users to register, log in, update profiles, and access protected content.

This project demonstrates:
- Integration of React with Django REST API
- Token-based authentication (JWT or Session-based)
- Clean and scalable project architecture

---

## 🛠️ Tech Stack

### Frontend:
- React
- Axios
- React Router DOM
- Bootstrap or Tailwind (optional)

### Backend:
- Django
- Django REST Framework
- MYSQL 

---

## 📁 Folder Structure


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rohanpa08/user-management-using-react-and-django.git
cd user-management-using-react-and-django
cd backend
python -m venv env
source env/bin/activate   # Windows: env\Scripts\activate
pip install -r requirements.txt

# Run migrations and start the server
python manage.py migrate
python manage.py runserver
cd ../frontend
npm install
npm start
