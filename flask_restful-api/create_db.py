from app import app, db
from models import Trainer, Trainee, Session

with app.app_context():
    db.create_all()
    print("Database tables created for Trainers, Trainees, and Sessions!")