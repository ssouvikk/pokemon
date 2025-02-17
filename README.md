# Pokémon Explorer

## 🌟 Project Overview
Pokémon Explorer is a Next.js-based web application that allows users to search, browse, and explore different Pokémon. It leverages the PokéAPI to fetch Pokémon data and provides an interactive and visually appealing user experience with support for both light and dark modes.

## 🚀 Features
- 🔍 **Search Pokémon** by name in real-time.
- 🃏 **Interactive Pokémon Cards** displaying names and images.
- 🌙 **Dark Mode Support** for an optimized viewing experience.
- 🌟 **Infinite Scrolling** for seamless browsing of Pokémon.
- 🌐 **Responsive Design** that works across all devices.
- ⚡ **Optimized for Performance** with Next.js features.

## 🛠 Installation & Setup

### **Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (v20.11.1)
- **Docker & Docker Compose** (for containerized development)

### **Local Development**
```sh
# Clone the repository
git clone https://github.com/yourusername/pokemon-explorer.git
cd pokemon-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```
Now, visit `http://localhost:3000` to access the application.

### **Running with Docker**
```sh
# Build and start the container
docker-compose up --build
```
This will start the app in a Docker container at `http://localhost:3000`.

## 💼 User Flow
### **1. Browsing Pokémon List**
- Users land on the homepage (`/`) and see a grid layout of Pokémon with names and images.
- Infinite scrolling allows users to browse more Pokémon.
- A search bar is available to find specific Pokémon by name.

### **2. Searching for a Pokémon**
- Users can type a Pokémon's name in the search bar to filter results in real-time.
- Partial or full name searches work.
- If no results match, a "No Pokémon found" message is displayed.

### **3. Viewing Pokémon Details**
- Clicking on a Pokémon navigates to `/pokemon/[id]`.
- The detail page displays:
  - Name & ID
  - Image
  - Type(s)
  - Abilities
  - Stats (HP, Attack, Defense, Speed, etc.)
  - Moveset

### **4. Navigating Back & Exploring More**
- Users can return to the homepage via the "Back to Home" button or browser back button.
- Search filters remain intact when returning to the homepage.
- Users can explore another Pokémon by clicking on a different card.

### **5. Handling Invalid URLs or Missing Data**
- If a user enters an incorrect Pokémon ID or an invalid URL, a "Pokémon Not Found" page appears.
- A "Go Back Home" button allows easy navigation back to the homepage.

### **6. Refreshing & Sharing Pokémon Pages**
- Users can refresh a Pokémon details page, and the data will reload.
- Users can copy and share the URL to specific Pokémon pages.

## 🎼 API Reference
This project uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data.

### **Get Pokémon List**
**Endpoint:** `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`

**Response:**
```json
{
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
  ]
}
```

### **Get Pokémon Details**
**Endpoint:** `GET https://pokeapi.co/api/v2/pokemon/{id}`

**Response:**
```json
{
  "id": 1,
  "name": "bulbasaur",
  "sprites": { "front_default": "https://raw.githubusercontent.com/.../1.png" }
}
```

## 🚀 Deployment Guide (Vercel)
1. **Sign up on Vercel** and install the [Vercel CLI](https://vercel.com/docs/cli).
2. **Login to Vercel**
   ```sh
   vercel login
   ```
3. **Deploy the application**
   ```sh
   vercel --prod
   ```
This will generate a live URL for your Pokémon Explorer app.

## 🤝 Contribution Guidelines
We welcome contributions! Follow these steps:

1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Make your changes and commit** (`git commit -m "Added new feature"`).
4. **Push your branch** (`git push origin feature-branch`).
5. **Open a Pull Request**.

### 💡 Guidelines
- Follow best practices for React and Next.js development.
- Write clean, modular, and well-documented code.
- Ensure your changes do not break existing functionality.

---
### 🏆 **Enjoy Exploring Pokémon!**
Feel free to reach out or raise an issue if you encounter any problems. Happy coding! 🚀

