# ⚙️ Scriptora — AI Content Studio (Backend)

> The robust server-side architecture powering Scriptora. Built with Node.js, Express.js, and MongoDB, handling secure authentication, history storage, and Google Gemini AI content generation.

---

## 🎥 Video Demonstration (Loom Walkthrough)

Watch the complete backend architecture, Postman API testing, and MongoDB database records demonstration:
👉 https://www.loom.com/share/7e5d80bf283d405ab4dd092b8199c689

---

## ✨ Core Features

* **Secure Authentication:** JWT-based user sign-up and login endpoints with password hashing.
* **Google Gemini AI Integration:** Connects securely with the Google Generative AI SDK to process text prompts and generate dynamic content.
* **History Management:** Automatically saves user prompts and generated outputs into MongoDB databases.
* **Protected Routes:** Middleware to secure API routes and verify user tokens.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **AI Engine:** Google Gemini API (`@google/genai` / Generative AI SDK)
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js

---

## 🚀 Getting Started Locally

Follow these steps to set up and run the backend server on your local machine:

### Prerequisites
* Node.js installed on your system.
* MongoDB running locally or via MongoDB Atlas.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   clone [https://github.com/muchaslam7-design/scriptora-backend.git](https://github.com/muchaslam7-design/scriptora-backend.git)

