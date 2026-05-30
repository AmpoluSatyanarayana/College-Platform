# CollegeFinder

A full-stack college comparison platform built with Next.js, TypeScript, Prisma, PostgreSQL, and JWT Authentication.

## Features

* User Registration & Login
* JWT Authentication using Cookies
* Search Colleges
* Save / Unsave Colleges
* Compare Multiple Colleges
* College Details Page
* Placement Percentage Comparison
* Responsive Design
* Pagination
* Profile Page

## Tech Stack

### Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* React Icons

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL (Neon)

### Authentication

* JWT (JSON Web Tokens)
* HTTP Cookies

## Project Structure

```txt
src/
├── app/
├── components/
├── context/
├── lib/
├── types/
└── utils/

prisma/
└── schema.prisma
```

## Installation

```bash
git clone <repository-url>
cd College-Platform
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

## Build

```bash
npm run build
```

## Author

Satyanarayana Ampolu
