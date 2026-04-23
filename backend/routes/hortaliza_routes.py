from flask import Blueprint, request, jsonify
from config.db import collection
from bson import ObjectId

hortaliza_bp = Blueprint('hortalizas', __name__, url_prefix='/api/hortalizas')

# 🔹 CREAR
@hortaliza_bp.route('', methods=['POST'])
def crear_hortaliza():
    data = request.json
    result = collection.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return jsonify(data), 201

# 🔹 OBTENER TODAS
@hortaliza_bp.route('', methods=['GET'])
def obtener_hortalizas():
    hortalizas = []
    for item in collection.find():
        item["_id"] = str(item["_id"])
        hortalizas.append(item)
    return jsonify(hortalizas), 200

# 🔹 OBTENER UNA
@hortaliza_bp.route('/<id>', methods=['GET'])
def obtener_hortaliza(id):
    item = collection.find_one({"_id": ObjectId(id)})
    
    if item:
        item["_id"] = str(item["_id"])
        return jsonify(item), 200
    else:
        return jsonify({"error": "No encontrado"}), 404

# 🔹 ACTUALIZAR
@hortaliza_bp.route('/<id>', methods=['PUT'])
def actualizar_hortaliza(id):
    data = request.json
    collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )
    return jsonify({"msg": "actualizado"}), 200

# 🔹 ELIMINAR
@hortaliza_bp.route('/<id>', methods=['DELETE'])
def eliminar_hortaliza(id):
    collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"msg": "eliminado"}), 200