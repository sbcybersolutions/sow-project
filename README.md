# 🧾 SOW Cost Calculator

A modular, responsive web app for building and managing Statement of Work (SOW) quotes — including internal cost tracking, billing rates, and Excel exports.

---

## 🧠 Features

- Multi-step quote builder (client/project info + project types)
- Dynamic costing by project type with internal resource breakdown
- Admin panel to manage project types and cost templates (no code required)
- Quote storage using `localStorage` with client filtering
- Export quotes to Excel (with internal breakdowns)
- Built with Vite + React + Bootstrap

---

## 🧱 Tech Stack

| Layer        | Tools                       |
|--------------|-----------------------------|
| Frontend     | React, Vite, Bootstrap 5     |
| State & Storage | React state + `localStorage` |
| Export       | `xlsx`, `file-saver`         |
| Build Tool   | Vite                         |

---

## 🗂️ Project Structure

client/
├── components/
│ ├── Admin/ # Admin panel to manage project types
│ ├── QuoteWizard/ # Multi-step quote builder
│ ├── QuotesList/ # View saved quotes
│ └── Layout/ # Navbar, etc.
├── hooks/
│ └── useProjectCosts.js # Loads project types from localStorage
├── utils/
│ ├── exportToExcel.js # Excel export logic
│ └── projectCostStorage.js # Admin storage utilities
├── assets/ # Logo and shared images


---

## 🛠 Getting Started

### 1. Install dependencies
<code>cd client
npm install</code>

### 2. Run the app
<code> npm run dev</code>

## 🔐 Admin Panel
Visit /admin to:

Add new project types

Define cost breakdowns (roles, hours, rates)

Edit or delete project types

These are saved in localStorage under the key: sow_project_types.

## 📤 Export
From the quote builder, export the current quote to Excel

Includes:

Client/project info

Billing totals

Internal cost breakdown per project

## 🛣 Future Improvements
🔐 Add user authentication (admin vs. staff)

☁️ Store quotes in a backend DB (Firebase, Supabase, MongoDB, etc.)

🧾 Export to PDF (branded quote format)

🎨 Improve Excel styling or use template files

📊 Dashboard with quote analytics



