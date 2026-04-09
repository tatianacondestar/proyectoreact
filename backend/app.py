from flask import Flask
from config.db import init_db

app = Flask(__name__)

# Inicializar base de datos
init_db(app)

# Importar rutas
from routes.hortaliza_routes import hortaliza_bp
app.register_blueprint(hortaliza_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
