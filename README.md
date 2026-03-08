# 🎬 Anime Discovery Engine

A modern anime discovery platform built with React and Tailwind CSS that features real-time search, trending analytics via Appwrite, and live data from the Jikan API.

---

## ✨ Key Features

✦ **Real-Time Search:** Enjoy a seamless, lag-free typing experience powered by an 800ms debounce implementation.  
✦ **Trending Analytics:** Automatically tracks user search interest and dynamically ranks top queries using an Appwrite database.  
✦ **Live Anime Data:** Fetches accurate titles, scores, and poster artwork directly from the Jikan API.  
✦ **Sleek UI:** Features a dark-themed, responsive grid layout built with Tailwind CSS, complete with professional 2:3 aspect ratio anime cards.  

---

## 🛠️ Tech Stack

➤ **Frontend:** React (Vite)  
➤ **Styling:** Tailwind CSS  
➤ **Database/BaaS:** Appwrite  
➤ **API:** Jikan (Unofficial MyAnimeList API)  
➤ **Utilities:** `react-use` for custom hooks  

---

## 🔐 Environment Variables

To run this project locally, create a `.env` file in the root directory and add your Appwrite credentials:

```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
