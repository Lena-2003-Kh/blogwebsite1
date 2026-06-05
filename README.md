
```markdown
# 📝 Personal Blog Web Application

A clean, responsive, and fully functional full-stack blogging web application. This project features a robust CRUD system allowing users to seamlessly create, read, update, and delete blog posts with a persistent PostgreSQL database backend.

🌐 **Live Demo:** [blogwebsite1-lime.vercel.app](https://blogwebsite1-lime.vercel.app/)

---

## 🚀 Features

* **Full CRUD Operations:** Create, view, modify, and delete blog posts in real time.
* **Persistent Storage:** Backed by a PostgreSQL database utilizing connection pooling for high performance and reliability.
* **Local Time Formatting:** Built-in automatic timestamp processing customized for the `Asia/Amman` timezone.
* **Responsive UI/UX:** Styled completely with vanilla CSS, optimizing readability and structure across mobile, tablet, and desktop viewports.
* **Dynamic Templating:** Server-side rendering using EJS templates for streamlined template structures.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (using `pg.Pool` for managed connection recycling)
* **Frontend:** HTML5, CSS3, EJS (Embedded JavaScript templates)
* **Environment Management:** Dotenv

---

## 📁 Repository Structure

```text
├── public/
│   └── index.css          # Global styling & responsive media queries
├── views/
│   ├── index.ejs          # Homepage displaying the feed of all posts
│   ├── create.ejs         # Interface for drafting a new post
│   ├── edit.ejs           # Interface for modifying existing posts
│   └── delete.ejs         # Confirmation step before item deletion
├── app.js                 # Express server configuration & API routing
├── .env.example           # Reference file for required environment variables
└── README.md              # Project documentation

```

---

## ⚙️ Prerequisites & Setup

Ensure you have [Node.js](https://nodejs.org/) and a [PostgreSQL](https://www.postgresql.org/) database instance installed and configured before running this application locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/Lena-2003-Kh/blogwebsite1.git](https://github.com/Lena-2003-Kh/blogwebsite1.git)
cd blogwebsite1

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Database Schema Setup

Execute the following SQL command within your PostgreSQL query editor or terminal to initialize the storage schema:

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    dates TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

```

### 4. Configure Environment Variables

Create a file named `.env` in the root directory and add your connection string:

```env
DATABASE_URL=postgres://your_username:your_password@your_host:your_port/your_database

```

### 5. Launch the Application

```bash
npm start

```

The application will spin up and run on your local configuration port.

---

## 🔌 API Route Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/` | Home page; queries database and displays all blog posts. |
| **GET** | `/create` | Renders the interface form to draft a new post. |
| **POST** | `/create-post` | Processes submitted form data and saves the post to the database. |
| **GET** | `/edit/:id` | Fetches a unique post by ID and populates it within the edit interface. |
| **POST** | `/edit/:id` | Updates the selected post fields and updates the database timestamp. |
| **GET** | `/delete/:id` | Serves a defensive confirmation step for removing a specific post. |
| **POST** | `/delete/:id` | Drops the specified record line directly from the active database tracking. |

---

## 📜 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

