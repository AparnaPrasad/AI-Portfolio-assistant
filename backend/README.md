# Portfolio Manager Backend

This is the backend API for the Portfolio Manager application, built with FastAPI and Firebase.

## Prerequisites

1. Firebase Project Setup:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Generate a service account key (Project Settings > Service Accounts > Generate New Private Key)
   - Save the JSON file securely

2. Environment Setup:
   Create a `.env` file in the backend directory with:
   ```
   FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/your/serviceAccountKey.json
   ```

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Portfolios
- GET `/api/portfolios` - Get all portfolios
- GET `/api/portfolios/{portfolio_id}` - Get portfolio by ID (includes stocks) 