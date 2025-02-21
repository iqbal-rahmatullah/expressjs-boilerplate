# Social Media To-Do

Social Media To-Do is a task management system designed to schedule and manage social media posts efficiently. Built with **Express.js**, **TypeScript**, and **Prisma ORM**, it allows users to organize, track, and automate social media content across multiple platforms.

## Features

- **Post Management**: Create, schedule, and track social media posts.

- **Brand Association**: Link posts to different brands.

- **Platform Support**: Manage posts for multiple social media platforms.

- **Attachments**: Upload images and videos for each post.

- **Tagging System**: Categorize posts with tags.

---

## 📌 Tech Stack

- **Backend**: Express.js (TypeScript)

- **Database**: PostgreSQL

- **ORM**: Prisma

- **Validation**: Zod

- **Documentation**: swagger

---

## 🚀 Installation

### 1. Clone the Repository

```bash

git  clone  https://gitlab.com/iqbalrahmatullah/social-media-todo

cd  social-media-todo

```

### 2. Install Dependencies

```bash

npm  install

```

### 3. Edit env to connect your database

```bash

cp .env.example .env

```

Edit env (Change to your database configuration)

```bash

`DATABASE_URL="postgresql://postgres:@localhost:5432/db_social_media_todo?schema=public"`

```

### 4. Run Database Migrations

```bash

npx prisma  migrate  dev

```

### 6. Run Seeder (for data dummy)

```bash

npm run seed

```

### 7. Start the Server

```bash

npm run dev

```

Server runs at `http://localhost:3000`
Documentation runs at `http://localhost:3000/api/v1/docs`

---
