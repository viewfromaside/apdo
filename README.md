# Customizable Notepad

A modern, extensible notepad application designed to adapt to different workflows. The project is split into two main parts: a **Next.js client** and a **Go (Gin) server**. The goal is to provide a clean, minimal interface with customization options and a robust backend.

<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/ecbbb932-72bf-4107-9591-ffc4a9a91177" />

---


## Features
- Customizable notes with flexible styling and organization
- Minimal and responsive UI
- Smooth animations powered by Framer Motion
- Backend powered by Gin (Go) with Firebase integration
- Planned features: authentication, API integrations, and advanced search

---

## Tech Stack
- **Frontend:** Next.js, TailwindCSS, GSAP, Jotai
- **Backend:** Gin (Go), Firebase
- **Tooling:** ESLint, Prettier

---

## Getting Started

### Prerequisites
- Node.js (>= 18)
- Go (>= 1.20)
- Firebase project (for backend integration)

---

### 1. Client (Next.js)

```bash
# Navigate to client folder
cd client/

# Install dependencies
npm install

# Start development server
npm run dev
```

By default, the app runs on [http://localhost:3000](http://localhost:3000).

---

### 2. Server (Go + Gin)

```bash
# Navigate to server folder
cd server/

# Download Go dependencies
go mod tidy

# Run the server
go run main.go
```

The server will start on [http://localhost:8080](http://localhost:8080) (or the port configured in your code).

---

## Project Structure
```
project-root/
│
├── client/   # Next.js frontend
│   ├── src/
│   └── ...
│
├── server/   # Go backend (Gin + Firebase)
│   ├── main.go
│   └── ...
│
└── README.md
```

---

## Roadmap
- [x] Authentication improvements
- [ ] API integrations
- [x] Smarter search for notes
- [ ] Additional customization options

---

## Contributing
Contributions, feedback, and suggestions are welcome. Please open an issue or submit a pull request if you’d like to contribute.

---

## License
This project is licensed under the MIT License.
