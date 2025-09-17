# Gym Management React App

A React TypeScript application that connects to your Flask gym API for efficient trainer management.

## Features

- View all trainers
- Add new trainers
- Edit existing trainers
- Delete trainers
- Responsive design
- TypeScript for type safety
- Efficient API communication with axios

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Your Flask API running on http://localhost:5000

### Installation

1. Navigate to the gym-app directory:
```bash
cd gym-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at http://localhost:3001

### Flask API Setup

Make sure your Flask API is running with CORS enabled. Install flask-cors:

```bash
pip install flask-cors
```

Then add to your Flask app.py:
```python
from flask_cors import CORS
CORS(app)
```

## Project Structure

```
src/
├── components/
│   ├── TrainerList.tsx    # Display and manage trainers
│   └── TrainerForm.tsx    # Add/edit trainer form
├── services/
│   └── api.ts            # API service layer
├── types/
│   └── index.ts          # TypeScript interfaces
├── App.tsx               # Main application component
└── App.css              # Styling
```

## API Endpoints Used

- GET /trainers - Fetch all trainers
- POST /trainers - Create new trainer
- GET /get_trainer_by_id/:id - Get trainer by ID
- PATCH /get_trainer_by_id/:id - Update trainer
- DELETE /get_trainer_by_id/:id - Delete trainer

## Usage

1. Start your Flask API server
2. Start the React app with `npm start`
3. Use the interface to manage trainers efficiently