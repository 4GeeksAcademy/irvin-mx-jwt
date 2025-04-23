"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required
from datetime import timedelta




api = Blueprint('api', __name__)
bcrypt = Bcrypt()
# Allow CORS requests to this API
CORS(api)

@api.route('/hello')
def test():
    return jsonify({'message': 'hellohellohello'}),200


@api.route('/register', methods=['POST'])
def add_user():
    
    try:
        #print(request.get_json())
        email=request.get_json()["email"]
        name=request.get_json()["name"]
        password=request.get_json()["password"]

        if not email or not name or not password:
            return jsonify({"mssg":"missing email, or name or password"})
        
        user_exists = User.query.filter_by(email=email).first()

        if user_exists:
            return jsonify({"mssg":"user already exists"}),409
        

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(email=email, password=password_hash, name=name, is_active=True)

        db.session.add(new_user)
        db.session.commit()

        ok_to_share = {
            "email": new_user.email,
            "name":new_user.name,
            "id" : new_user.id
        }

        

        return jsonify( ok_to_share), 200
    
    except Exception as e:
        return jsonify({'error':str(e)})


@api.route('/token', methods=['POST'])
def get_token():
    try:
        print(request.json.get('email'))
        print(request.json.get('password'))
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        login_user = User.query.filter_by(email=email).one()

        # Verificamos si encontró el usuario por el email
        if not login_user:
            return jsonify({'error': 'Invalid email.'}), 404

        # Verificamos que el password sea correcto:
        password_from_db = login_user.password #  Si loguin_user está vacio, da error y se va al "Except".
        true_o_false = bcrypt.check_password_hash(password_from_db, password)
        
        # Si es verdadero generamos un token y lo devuelve en una respuesta JSON:
        if true_o_false:

            expires = timedelta(days=1)  # pueden ser "hours", "minutes", "days","seconds"

            user_id = str(login_user.id)
            access_token = create_access_token(identity=user_id, expires_delta=expires)
            return jsonify({ 'access_token':access_token}), 200

        else:
            return jsonify({"Error":"Contraseña  incorrecta"}),404
    
    except Exception as e:
        return jsonify({"Error":"El email proporcionado no corresponde a ninguno registrado: " + str(e)}), 500


@api.route('/private')
@jwt_required()
def get_users():
    current_user_id = get_jwt_identity()  # Obtiene la id del usuario del token
    if current_user_id:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                'id': user.id,
                'email': user.email
            }
            user_list.append(user_dict)
        return jsonify(user_list), 200
    else:
        return {"Error": "Token inválido o no proporcionado"}, 401