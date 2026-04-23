from config.db import collection
from bson import ObjectId

class HortalizaController:

    @staticmethod
    def crear_hortaliza(datos):
        try:
            nueva = {
                "nombre": datos.get("nombre"),
                "descripcion": datos.get("descripcion"),
                "cantidad": datos.get("cantidad", 0),
                "unidad": datos.get("unidad", "kg"),
                "precio": datos.get("precio", 0)
            }

            result = collection.insert_one(nueva)
            nueva["_id"] = str(result.inserted_id)

            return nueva, 201

        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def obtener_hortalizas():
        hortalizas = []
        for h in collection.find():
            h["_id"] = str(h["_id"])
            hortalizas.append(h)

        return hortalizas, 200

    @staticmethod
    def obtener_hortaliza(id):
        h = collection.find_one({"_id": ObjectId(id)})

        if not h:
            return {"error": "No encontrada"}, 404

        h["_id"] = str(h["_id"])
        return h, 200

    @staticmethod
    def actualizar_hortaliza(id, datos):
        try:
            collection.update_one(
                {"_id": ObjectId(id)},
                {"$set": datos}
            )

            actualizado = collection.find_one({"_id": ObjectId(id)})
            actualizado["_id"] = str(actualizado["_id"])

            return actualizado, 200

        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def eliminar_hortaliza(id):
        try:
            collection.delete_one({"_id": ObjectId(id)})
            return {"mensaje": "Eliminado"}, 200

        except Exception as e:
            return {"error": str(e)}, 400