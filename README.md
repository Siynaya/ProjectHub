# ProjectHub – Personal Project Management Dashboard

A modern, responsive web application for managing personal projects, organizing tasks, tracking progress, and monitoring productivity.

## Features

- **Dashboard Overview** - Summary cards showing total projects, active projects, completed tasks
- **Project Management** - Create, edit, and delete projects with categories, priorities, and deadlines
- **Task Management** - Kanban-style task board with To Do, In Progress, and Completed columns
- **Progress Tracking** - Automatic progress calculation based on completed tasks
- **Search & Filter** - Search projects and filter by status
- **Dark Mode** - Modern dark-themed interface with toggle
- **Local Storage** - All data persists locally in the browser

## Technology Stack

- **React** (19.3.1) - UI library
- **Vite** (8.3.8) - Build tool and dev server
- **Tailwind CSS** (4.0) - CSS framework
- **Lucide React** - Icon library
- **React Router DOM** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone or navigate to the project directory
cd project

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# The application will be available at http://localhost:3000
```

### Production Build

```bash
# Create an optimized production build
npm run build

# The build output will be in the `dist` directory
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx       - Top navigation header with search and dark mode
│   ├── Sidebar.jsx      - Sidebar navigation
│   ├── StatCard.jsx     - Statistics cards component
│   ├── ProjectCard.jsx  - Project display card
│   ├── TaskCard.jsx     - Task display card
│   ├── ProjectModal.jsx - Modal for creating/editing projects
│   ├── TaskModal.jsx    - Modal for creating/editing tasks
│   └── KanbanBoard.jsx  - Kanban-style task board
├── pages/
│   ├── Dashboard.jsx    - Main dashboard page
│   ├── Projects.jsx     - Projects management page
│   ├── Tasks.jsx        - Tasks management page
│   ├── Analytics.jsx    - Analytics and insights page
│   └── Settings.jsx     - Application settings page
├── hooks/
│   └── useLocalStorage.js - Custom hook for localStorage persistence
├── utils/
│   └── helpers.js       - Utility functions (date formatting, calculations)
├── App.jsx              - Main app component with routing
└── main.jsx             - Entry point with React DOM render
```

## Features Overview

### Dashboard
- Summary statistics (total projects, active projects, completed tasks)
- Recent projects display
- Recent activity feed

### Project Management
- Create new projects with title, description, category, priority, dates
- Edit existing projects
- Delete projects (with confirmation)
- View project details including progress

### Task Management
- Kanban-style three-column layout (To Do, In Progress, Completed)
- Create tasks with title, description, due date, priority
- Edit tasks
- Delete tasks
- Change task status via dropdown or drag-and-drop style selection

### Search & Filter
- Search projects by name
- Filter by status (active, completed)
- Sort by deadline or creation date

### Data Persistence
- All projects and tasks stored in localStorage
- Data persists across browser refreshes
- Clean handling of empty/invalid data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

This application can be deployed to:
- **Vercel** - Connect your repository and deploy
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Use `vite-gh-pages` or similar

## License

MIT
