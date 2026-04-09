from config.db import db
from datetime import datetime

class Hortaliza(db.Model):
    __tablename__ = 'hortalizas'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text)
    cantidad = db.Column(db.Float, default=0)
    unidad = db.Column(db.String(50), default='kg')
    precio = db.Column(db.Float, default=0)
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'cantidad': self.cantidad,
            'unidad': self.unidad,
            'precio': self.precio,
            'fecha_creacion': self.fecha_creacion.isoformat()
        }
