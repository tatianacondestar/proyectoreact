from models.hortaliza_model import Hortaliza
from config.db import db

class HortalizaController:
    
    @staticmethod
    def crear_hortaliza(datos):
        """Crear una nueva hortaliza"""
        try:
            hortaliza = Hortaliza(
                nombre=datos.get('nombre'),
                descripcion=datos.get('descripcion'),
                cantidad=datos.get('cantidad', 0),
                unidad=datos.get('unidad', 'kg'),
                precio=datos.get('precio', 0)
            )
            db.session.add(hortaliza)
            db.session.commit()
            return hortaliza.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
    
    @staticmethod
    def obtener_hortalizas():
        """Obtener todas las hortalizas"""
        hortalizas = Hortaliza.query.all()
        return [h.to_dict() for h in hortalizas], 200
    
    @staticmethod
    def obtener_hortaliza(id):
        """Obtener una hortaliza por ID"""
        hortaliza = Hortaliza.query.get(id)
        if not hortaliza:
            return {'error': 'Hortaliza no encontrada'}, 404
        return hortaliza.to_dict(), 200
    
    @staticmethod
    def actualizar_hortaliza(id, datos):
        """Actualizar una hortaliza"""
        try:
            hortaliza = Hortaliza.query.get(id)
            if not hortaliza:
                return {'error': 'Hortaliza no encontrada'}, 404
            
            hortaliza.nombre = datos.get('nombre', hortaliza.nombre)
            hortaliza.descripcion = datos.get('descripcion', hortaliza.descripcion)
            hortaliza.cantidad = datos.get('cantidad', hortaliza.cantidad)
            hortaliza.unidad = datos.get('unidad', hortaliza.unidad)
            hortaliza.precio = datos.get('precio', hortaliza.precio)
            
            db.session.commit()
            return hortaliza.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
    
    @staticmethod
    def eliminar_hortaliza(id):
        """Eliminar una hortaliza"""
        try:
            hortaliza = Hortaliza.query.get(id)
            if not hortaliza:
                return {'error': 'Hortaliza no encontrada'}, 404
            
            db.session.delete(hortaliza)
            db.session.commit()
            return {'mensaje': 'Hortaliza eliminada'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
