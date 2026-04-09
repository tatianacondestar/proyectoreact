from flask import Blueprint, request, jsonify
from controllers.hortaliza_controller import HortalizaController

hortaliza_bp = Blueprint('hortalizas', __name__, url_prefix='/api/hortalizas')

@hortaliza_bp.route('', methods=['POST'])
def crear_hortaliza():
    """Crear una nueva hortaliza"""
    datos = request.get_json()
    resultado, status = HortalizaController.crear_hortaliza(datos)
    return jsonify(resultado), status

@hortaliza_bp.route('', methods=['GET'])
def obtener_hortalizas():
    """Obtener todas las hortalizas"""
    hortalizas, status = HortalizaController.obtener_hortalizas()
    return jsonify(hortalizas), status

@hortaliza_bp.route('/<int:id>', methods=['GET'])
def obtener_hortaliza(id):
    """Obtener una hortaliza por ID"""
    resultado, status = HortalizaController.obtener_hortaliza(id)
    return jsonify(resultado), status

@hortaliza_bp.route('/<int:id>', methods=['PUT'])
def actualizar_hortaliza(id):
    """Actualizar una hortaliza"""
    datos = request.get_json()
    resultado, status = HortalizaController.actualizar_hortaliza(id, datos)
    return jsonify(resultado), status

@hortaliza_bp.route('/<int:id>', methods=['DELETE'])
def eliminar_hortaliza(id):
    """Eliminar una hortaliza"""
    resultado, status = HortalizaController.eliminar_hortaliza(id)
    return jsonify(resultado), status
