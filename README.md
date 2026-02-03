# 🚀 Red-Reddit

A robust Django-based backend API handling nested comments, karma-based leaderboards, and concurrency-safe interactions.

---

## 🛠️ Tech Stack

* **Language:** Python 3.9+
* **Framework:** Django & Django REST Framework (DRF)
* **Database:** SQLite (Default for local) / PostgreSQL (Recommended for production)
* **Architecture:** Adjacency List (Comments), Atomic Transactions (Likes)

---

## ⚙️ Local Setup Guide

Follow these steps to get the application running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Ayush-Pathak2006/Playto-s-Asssignment.git
```

### 2. Create a Virtual Environment
It is recommended to use a virtual environment to manage dependencies.

**Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
```

**macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Apply Database Migrations
Set up the database schema (Tables for Users, Posts, Comments, Likes).
```bash
python manage.py migrate
```

### 5. Create a Superuser (Admin)
To access the Django Admin panel:
```bash
python manage.py createsuperuser
```

### 6. Run the Development Server
```bash
python manage.py runserver
```

The API will be available at: `http://127.0.0.1:8000/`


---

## 📚 Documentation

* **Technical Explainer:** Read [EXPLAINER.md](Explainer.md) for a deep dive into the engineering decisions (Nested Comments, N+1 Optimization, Concurrency).

---

## 👤 Author

**Ayush Pathak**
* B.Tech Student | Full-Stack Developer
* **Gmail:** [ayushpathak13022006@gmail.com](mailto:ayushpathak13022006@gmail.com)
