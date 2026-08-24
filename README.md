# Results Dashboard (Demo App)

A mobile-first web application built with React, Vite, Tailwind CSS, and Supabase.
This is purely a **demo/results management application** with **no real-money betting, gambling, wallet, payment, or wagering functionality**.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Supabase:**
   - Create a project on Supabase.
   - Run the SQL scripts found in `supabase/migrations/` in your Supabase SQL Editor.
   - Copy `.env.example` to `.env` and fill in your Supabase URL and Anon Key.
   ```bash
   cp .env.example .env
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Features

- **Mobile-First Dark UI**: Crafted with Tailwind CSS.
- **Realtime Updates**: Uses Supabase Realtime subscriptions.
- **Admin Panel**: Add, edit, delete results securely.
- **Charts/History**: View past records easily.
