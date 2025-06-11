# Finance Portfolio Manager
<img width="1728" alt="Screenshot 2025-06-11 at 11 46 41" src="https://github.com/user-attachments/assets/bcedd8ae-bf0b-40a2-879b-1da6b83814e5" />

A goal-based financial portfolio manager with AI assistant to answer all questions about your financial portfolio and planning 

## Project Structure

```
finance-portfolio-manager/
├── ui/                 # Frontend Next.js application
│   ├── src/           # Source code
│   │   ├── app/       # Next.js app directory
│   │   ├── components/# React components
│   │   ├── utils/     # Utility functions
│   │   └── styles/    # Global styles
│   └── public/        # Static assets
├── backend/           # FastAPI backend
│   ├── app/          # Application code
│   │   ├── api/      # API routes
│   │   ├── models/   # Database models
│   │   └── services/ # Business logic
│   └── tests/        # Backend tests
└── package.json      # Root package.json for managing both frontend and backend
```

## Getting Started

1. Install all dependencies:
```bash
npm run install:all
```

2. Start both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:8000

## Development

### Frontend (UI)
```bash
# Start frontend only
npm run ui:dev

# Build frontend
npm run ui:build

# Start production frontend
npm run ui:start
```

### Backend
To setup backend follow readMe here: [backend/README.md](https://github.com/AparnaPrasad/AI-Portfolio-assistant/blob/main/backend/README.md)
```bash
# Start backend only
npm run backend:dev
```

## Documentation

- Frontend API documentation: http://localhost:3000
- Backend API documentation: http://localhost:8000/docs
