# Notes App

A modern, responsive note-taking application built with React, TypeScript, and Tailwind CSS.

![Notes App Screenshot](https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=600&fit=crop&crop=center)

## Features

- 🔐 User authentication (signup/login)
- 📝 Create, read, update, and delete notes
- 🔍 Real-time search functionality
- 💫 Smooth animations and transitions
- 🎨 Modern, responsive UI
- 🌙 Clean and intuitive interface
- ⚡ Fast and efficient
- 🔔 Toast notifications
- 💾 Persistent login state

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Vite
- **API Integration**: REST API with JWT authentication

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/           # API integration
├── components/    # Reusable UI components
├── pages/         # Route components
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## API Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/login` - User authentication
- `GET /notes` - Fetch all notes
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##
Created a shred component folder for resubale-components
Used rollup for bundling
pushed as npm package