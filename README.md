# Gym Schedule Application

A comprehensive full-stack gym scheduling system that allows gym administrators to manage trainers, trainees, and training sessions efficiently.

## 🏋️ Project Overview

This application provides a complete gym management solution with:
- **Trainer Management**: Add, edit, and manage gym trainers with their specializations
- **Trainee Management**: Register and manage gym members
- **Session Scheduling**: Create and manage training sessions between trainers and trainees
- **Real-time Updates**: Dynamic interface with instant data synchronization

## 🛠️ Technology Stack

### Backend (Flask REST API)
- **Flask**: Web framework for Python
- **Flask-SQLAlchemy**: ORM for database operations
- **Flask-RESTful**: REST API framework
- **Flask-CORS**: Cross-origin resource sharing
- **SQLite**: Lightweight database for data storage
- **Flask-Migrate**: Database migration management

### Frontend (React TypeScript)
- **React 18**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Axios**: HTTP client for API communication
- **CSS3**: Styling and responsive design

## 📁 Project Structure

```
gym-schedule/
├── flask_restful-api/          # Backend API
│   ├── app.py                  # Main Flask application
│   ├── models.py               # Database models
│   ├── instance/gym.db         # SQLite database
│   └── venv/                   # Python virtual environment
├── gym-app/                    # Frontend React app
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/api.ts     # API service layer
│   │   └── types/index.ts      # TypeScript interfaces
│   └── package.json            # Node.js dependencies
├── start_backend.sh            # Backend startup script
└── start_frontend.sh           # Frontend startup script
```

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- Node.js 16+
- npm or yarn

### 1. Start Backend (Flask API)
```bash
./start_backend.sh
```
API will be available at: http://localhost:5000

### 2. Start Frontend (React App)
```bash
./start_frontend.sh
```
Web app will be available at: http://localhost:3000

**Note**: Make sure to run from the `gym-app` directory:
```bash
cd gym-app
npm start
```

## 📊 Database Schema

### Trainers
- `id`: Primary key
- `name`: Trainer name (unique)
- `bio`: Trainer biography
- `specialization`: Area of expertise
- `phone_number`: Contact number (>10 digits)

### Trainees
- `id`: Primary key
- `name`: Trainee name
- `email`: Email address
- `phone_number`: Contact number
- `age`: Age in years

### Sessions
- `id`: Primary key
- `day`: Session day
- `activity`: Type of training activity
- `trainer_id`: Foreign key to trainers
- `trainee_id`: Foreign key to trainees

## 🔌 API Endpoints

### Trainers
- `GET /trainers` - List all trainers
- `POST /trainers` - Create new trainer
- `GET /trainers/<id>` - Get specific trainer
- `PATCH /trainers/<id>` - Update trainer
- `DELETE /trainers/<id>` - Delete trainer

### Trainees
- `GET /trainees` - List all trainees
- `POST /trainees` - Create new trainee
- `GET /trainees/<id>` - Get specific trainee
- `PATCH /trainees/<id>` - Update trainee
- `DELETE /trainees/<id>` - Delete trainee

### Sessions
- `GET /sessions` - List all sessions
- `POST /sessions` - Create new session
- `GET /sessions/<id>` - Get specific session
- `PATCH /sessions/<id>` - Update session
- `DELETE /sessions/<id>` - Delete session

## 🔧 Manual Setup

### Backend Setup
```bash
cd flask_restful-api
python3 -m venv venv
venv/bin/python -m pip install flask flask-sqlalchemy flask-migrate faker flask-restful flask-cors alembic sqlalchemy pytz setuptools aniso8601 six
venv/bin/python app.py
```

### Frontend Setup
```bash
cd gym-app
npm install
npm start
```

## 🎯 Features

- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant UI updates after data changes
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management
- **RESTful API**: Clean, standardized API endpoints
- **Type Safety**: Full TypeScript implementation

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   - Kill existing process: `lsof -ti:3000 | xargs kill -9`
   - Or use different port: `PORT=3001 npm start`

2. **Backend not starting**
   - Ensure virtual environment is activated
   - Check all dependencies are installed
   - Verify Python version compatibility

3. **CORS errors**
   - Ensure Flask-CORS is installed and configured
   - Check API base URL in frontend

## 📝 Development Notes

- Database migrations are handled automatically
- SQLite database is created in `instance/gym.db`
- Frontend proxy is configured for API calls
- Development servers include hot reloading

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request# gym-scheduler
