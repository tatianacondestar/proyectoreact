from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# importar rutas
from routes.hortaliza_routes import hortaliza_bp
app.register_blueprint(hortaliza_bp)

# importante para Kubernetes
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)