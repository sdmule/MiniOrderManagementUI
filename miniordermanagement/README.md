# Mini Order Management

A full-stack Mini Order Management application built with React and ASP.NET Core Web API.

## Overview

The application provides a complete customer and order management flow:

- Dashboard with customer, order, and revenue statistics
- Customer listing
- Customer details
- Create Customer
- Order listing
- Order details
- Create Order
- Common application layout with Header, Sidebar, Main Content, and Footer
- Redux-based state management
- Loading and error handling
- Success messages after create operations
- Unit tests for backend application logic

## Technology Stack

### Frontend

- React
- Vite
- JavaScript / JSX
- Redux Toolkit
- React Redux
- React Router
- Axios
- Material UI (MUI)

### Backend

- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- MediatR
- Clean Architecture
- Dependency Injection
- RESTful APIs

### Testing and Tools

- xUnit
- Moq
- Swagger
- Postman
- Git
- GitHub
- Visual Studio / Visual Studio Code
- SQL Server Management Studio

## Architecture

The solution is separated into frontend, backend, database, and tests.

```text
MiniOrderManagement
│
├── Backend
│   ├── API
│   ├── Application
│   ├── Domain
│   └── Infrastructure
│
├── Frontend
│   └── React + Vite
│
└── Tests
    └── Unit Tests
```
