# Finora

A comprehensive, full-stack personal finance and savings management application. Built with modern web technologies and domain-driven design principles, Finora helps users track their incomes, expenses, and savings goals securely and efficiently.

## 🚀 Features

* **Advanced Financial Tracking:** Categorize and monitor daily transactions (incomes and expenses).
* **Goal-Oriented Savings:** Create custom saving goals, track progress, and transfer funds.
* **Internationalization (i18n):** Multi-language support (English & Turkish) with seamless switching.
* **Dynamic Localization:** Real-time currency formatting and tailored UI preferences tied to user accounts.
* **Secure Authentication:** JWT-based authentication and secure password hashing.
* **Clean Architecture:** Backend structured with strict separation of concerns, utilizing the Repository pattern.
* **Interactive Data Visualization:** Dynamic charts and statistics using Recharts.
* **Fully Containerized:** Docker and Docker Compose setup for seamless development and deployment.

## 💻 Tech Stack

### Frontend
* **Core:** React 18, TypeScript, Vite
* **Styling & UI:** Tailwind CSS, Lucide React, react-hot-toast
* **State Management:** Zustand
* **Routing:** React Router v6
* **Data Visualization:** Recharts
* **Localization:** react-i18next, date-fns

### Backend
* **Core:** ASP.NET Core Web API (.NET)
* **Database:** PostgreSQL, Entity Framework Core
* **Architecture:** Clean Architecture, Repository Pattern
* **Security:** JWT (JSON Web Tokens), Role-based Authorization

### DevOps & Deployment
* **Containerization:** Docker, Docker Compose
* **Hosting:** Vercel (Frontend), Render.com (Backend API & PostgreSQL Database)

## 🛠️ Getting Started (Local Development)

### Prerequisites
* [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose
* [Node.js](https://nodejs.org/) (v18 or higher)
* [.NET SDK](https://dotnet.microsoft.com/)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Okkootsu/Finance-Tracker-App.git
cd Finance-Tracker-App
```

2. **Set up Environment Variables:** Create an `.env` file in the root directory based on the provided configuration
```env
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=FinanceDb
DB_CONNECTION_STRING=Host=db;Port=5432;Database=FinanceDb;Username=postgres;Password=your_password
JWT_KEY=your_super_secret_jwt_key_here
```

3. **Run with Docker Compose:** Build and start the containers using the following command
```bash
docker-compose up -d --build
````
* The backend API will be available at http://localhost:8080
* The frontend application will be available at http://localhost:3000

## 📁 Project Structure

* `/backend` - ASP.NET Core solution adhering to Clean Architecture principles:
  * **API:** Controllers, middleware, and entry point.
  * **Application:** Business logic, interfaces, services, and DTOs.

  * **Domain:** Core entities and enums.

  * **Infrastructure:** Database context, EF Core configurations, and repository implementations.

* `/frontend` - React application structured by features:

  * Components, hooks, context, and utilities organized for maximum reusability and scalability.