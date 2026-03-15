# TripAdvisor Clone

A full-stack travel platform clone built with React, Express, and Tailwind CSS.

## Features

- **Homepage**: Hero search, popular hotels, restaurants, and attractions.
- **Search Page**: Filter results by type, rating, and price.
- **Place Detail**: Image gallery, detailed description, and reviews.
- **Reviews**: Add and view user reviews with ratings.
- **Auth**: Simple mock login system using local storage.
- **Admin Panel**: Add and delete places (accessible via admin role).
- **Maps**: OpenStreetMap integration.

## Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express.
- **Data**: Local JSON files for persistence.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

To access the admin panel:
1. Go to the Login page.
2. Use an email containing "admin" (e.g., `admin@example.com`).
3. An "Admin" link will appear in the navbar.

## Deployment to GitHub

1. Create a new repository on GitHub.
2. Run the following commands:
   ```bash
   git init
   git add .
   git commit -m "TripAdvisor Clone"
   git branch -M main
   git remote add origin https://github.com/USERNAME/tripadvisor-clone.git
   git push -u origin main
   ```
