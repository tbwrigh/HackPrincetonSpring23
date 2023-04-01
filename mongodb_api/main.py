# fast api server
from fastapi import FastAPI
from pymongo import MongoClient

from bson import ObjectId

app = FastAPI()

# connect to mongodb

client = MongoClient("mongodb+srv://user:oxRRaRUcFKOslIyM@hackprinceton.vpkyri1.mongodb.net/?retryWrites=true&w=majority")

    # Create the database for our example (we will use the same database throughout the tutorial
database = client['hackprinceton']

collection = database['recipes']



@app.get("/cuisine/{cuisine}")
def search_cuisine(cuisine: str):
    res = collection.find({"cuisine": cuisine.title()})
    res = [r for r in res]
    for r in res:
        r['_id'] = str(r['_id'])
    return {"recipes": res}

@app.get("/cost/{cost}")
def search_cost(cost: str):
    res = collection.find({"cost": { "$in": ["$"*i for i in range(len(cost))]}})
    res = [r for r in res]
    for r in res:
        r['_id'] = str(r['_id'])
    return {"recipes": res}

@app.get("/difficulty/{difficulty}")
def search_difficulty(difficulty: str):
    levels = ["easy", "medium", "hard", "expert"]
    res = collection.find({"difficulty": {"$in": levels[:levels.index(difficulty)+1]}})
    res = [r for r in res]
    for r in res:
        r['_id'] = str(r['_id'])
    return {"recipes": res}

@app.get("/query/{cost}/{difficulty}/{cuisines}")
def search_query(cost: str, difficulty: str, cuisines: str):
    cuisines = cuisines.split(",")
    cuisines = [c.title() for c in cuisines]
    levels = ["easy", "medium", "hard", "expert"]
    res = collection.find({"cost": { "$in": ["$"*i for i in range(len(cost))]}, "difficulty": {"$in": levels[:levels.index(difficulty)+1]}, "cuisine": {"$in": cuisines}})
    res = [r for r in res]
    for r in res:
        r['_id'] = str(r['_id'])
    return {"recipes": res}