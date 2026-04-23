from pymongo import MongoClient
import os

# Kubernetes usará esta variable
MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo-service-tatiana:27017/hortalizas_db")

client = MongoClient(MONGO_URI)

db = client["hortalizas_db"]
collection = db["hortalizas"]