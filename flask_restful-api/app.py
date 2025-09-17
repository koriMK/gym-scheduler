from flask import Flask, request, make_response, jsonify,json
from flask_migrate import Migrate
from models import db, Trainer, Trainee, Session
from flask_restful import Resource,Api
from werkzeug.exceptions import HTTPException
from flask_cors import CORS

# add the sqlalchemy database configurtion to our app
# initialize our sqlalchemy instance with our app
# initialize our migrate instance with both our app and our DB
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gym.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
CORS(app)
db.init_app(app)
migrate = Migrate(app, db,render_as_batch=True)
api=Api(app)


class Welcome(Resource):
    def get(self):
        resp_body={
            "message":"<h1>Flask App Running Smoothly.....</h1>"
        }
        response = make_response(
            resp_body,
            200
        )
        return response


class Trainers(Resource):
    def get(self):
        trainers = [trainer.to_dict() for trainer in Trainer.query.all()]
        response = make_response(
            trainers,
            200
        )

        return response
            
    def post(self):
        # access trainer data that was sent from client through request
        trainer_data = request.json
        # print(trainer_data)
        # Add this new resource to your database, and ensure it’s saved. i.e create an instance of the trainer class, add it to the session and commit the session
        new_trainer = Trainer(name=trainer_data['name'], bio=trainer_data['bio'], specialization = trainer_data['specialization'], phone_number=trainer_data['phone_number'])
        db.session.add(new_trainer)
        db.session.commit()
        resp = make_response({'success':'Trainer Created'}, 201)
        return resp



class TrainerById(Resource):
    def get(self,id):
        trainer = db.session.query(Trainer).get(id)
        resp = make_response(trainer.to_dict(), 200)
        return resp

    def patch(self,id):
        trainer = db.session.query(Trainer).get(id)
        for attr in request.json:
            setattr(trainer,attr,request.json.get(attr))

        db.session.add(trainer)
        db.session.commit()

        resp_dict = trainer.to_dict()
        response = make_response(
            resp_dict,
            201
        )
        return response

    def delete(self,id):
        trainer = db.session.query(Trainer).get(id)
        db.session.delete(trainer)
        db.session.commit()

        resp_body = {"message":"trainer deleted successfully" }

        response = make_response(
            resp_body,
            200
        )
        return response

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

class Trainees(Resource):
    def get(self):
        trainees = [trainee.to_dict() for trainee in Trainee.query.all()]
        return make_response(trainees, 200)
    
    def post(self):
        data = request.json
        new_trainee = Trainee(name=data['name'], email=data['email'], phone_number=data['phone_number'], age=data['age'])
        db.session.add(new_trainee)
        db.session.commit()
        return make_response({'success': 'Trainee Created'}, 201)

class TraineeById(Resource):
    def get(self, id):
        trainee = Trainee.query.get(id)
        return make_response(trainee.to_dict(), 200)
    
    def patch(self, id):
        trainee = Trainee.query.get(id)
        for attr in request.json:
            setattr(trainee, attr, request.json.get(attr))
        db.session.commit()
        return make_response(trainee.to_dict(), 200)
    
    def delete(self, id):
        trainee = Trainee.query.get(id)
        db.session.delete(trainee)
        db.session.commit()
        return make_response({'message': 'Trainee deleted'}, 200)

class Sessions(Resource):
    def get(self):
        sessions = [session.to_dict() for session in Session.query.all()]
        return make_response(sessions, 200)
    
    def post(self):
        data = request.json
        new_session = Session(day=data['day'], activity=data['activity'], trainer_id=data['trainer_id'], trainee_id=data['trainee_id'])
        db.session.add(new_session)
        db.session.commit()
        return make_response({'success': 'Session Created'}, 201)

class SessionById(Resource):
    def get(self, id):
        session = Session.query.get(id)
        return make_response(session.to_dict(), 200)
    
    def patch(self, id):
        session = Session.query.get(id)
        for attr in request.json:
            setattr(session, attr, request.json.get(attr))
        db.session.commit()
        return make_response(session.to_dict(), 200)
    
    def delete(self, id):
        session = Session.query.get(id)
        db.session.delete(session)
        db.session.commit()
        return make_response({'message': 'Session deleted'}, 200)

api.add_resource(Welcome, '/')
api.add_resource(Trainers, '/trainers')
api.add_resource(TrainerById, '/trainers/<int:id>')
api.add_resource(Trainees, '/trainees')
api.add_resource(TraineeById, '/trainees/<int:id>')
api.add_resource(Sessions, '/sessions')
api.add_resource(SessionById, '/sessions/<int:id>')

if __name__ == "__main__": app.run(debug=True, port=5000)
