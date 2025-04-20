# Water Schedule

A simple web application built with Vite, React, and Material UI to help you keep track of your houseplants' watering needs, utilizing Supabase as the backend.

## Overview

This application provides a clean and intuitive interface with checkboxes for each of your plants. Simply check the box when you water a plant to mark it as done. The application uses Supabase for storing plant data and images, ensuring your information is persistent and accessible.

## Features

* **Clear Visual Overview:** See all your plants and their watering status at a glance.
* **Simple Interaction:** Easily mark plants as watered with a single click.
* **Persistent Data:** Plant information is stored securely using Supabase.
* **Image Storage:** Plant images can be uploaded and managed using Supabase Storage.
* **Built with Modern Technologies:** Leverages the speed and efficiency of Vite, the component-based architecture of React, and the beautiful UI components of Material UI.
* **Backend Powered by Supabase:** Utilizes Supabase for database management and storage.

## Technologies Used

* [Vite](https://vitejs.dev/): A build tool that provides a fast and lean development experience.
* [React](https://react.dev/): A JavaScript library for building user interfaces.
* [Material UI (MUI)](https://mui.com/): A comprehensive suite of UI components following Google's Material Design guidelines.
* [Supabase](https://supabase.com/): An open-source Firebase alternative that provides a PostgreSQL database and storage.

## Supabase Setup

This application relies on a Supabase project with the following setup:

1.  **Create a Supabase Project:**
    If you don't have one already, create a new project on the [Supabase website](https://supabase.com/).

2.  **Database Table: `plants`**
    You need to have a table named `plants` in your Supabase database. While the specific schema might depend on the features you implement, at a minimum, it should likely include fields such as:
    * `id` (primary key, auto-incrementing)
    * `name` (text)
    * `last_watered` (timestamp, or a boolean `is_watered` and a `watered_at` timestamp)
    * `image_url` (text, storing the path to the image in Supabase Storage)
    * ... (other relevant plant details)

3.  **Storage Bucket: `plantimage`**
    You need a storage bucket named `plantimage` in your Supabase project to store the images of your plants. Ensure that the necessary permissions are set up for your application to upload and retrieve images from this bucket.

4.  **Supabase API Keys:**
    You will need to obtain your Supabase API URL and public API key from your project settings. These keys will be used in your React application to interact with your Supabase backend. Make sure to handle these keys securely (e.g., using environment variables).

## Getting Started

To run this application locally, ensure you have a Supabase project set up as described above and your Supabase API URL and key are configured in your application's environment variables. Then, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ToanLe147/water-schedule.git](https://github.com/ToanLe147/water-schedule.git)
    cd water-schedule
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn add
    # or
    pnpm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of your project and add your Supabase API URL and public API key:
    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_API_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLIC_API_KEY
    ```
    Replace `YOUR_SUPABASE_API_URL` and `YOUR_SUPABASE_PUBLIC_API_KEY` with your actual Supabase credentials.

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    This will start the application at `http://localhost:5173` (or a similar port).

## Building for Production

To build a production-ready version of the application:

```bash
npm run build
# or
yarn build
# or
pnpm build
