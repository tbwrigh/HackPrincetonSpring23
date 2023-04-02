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

# @app.get("/query/{cost}/{difficulty}/{cuisines}")
# def search_query(cost: str, difficulty: str, cuisines: str):
#     cuisines = cuisines.split(",")
#     cuisines = [c.title() for c in cuisines]
#     levels = ["easy", "medium", "hard", "expert"]
#     res = collection.find({"cost": { "$in": ["$"*i for i in range(len(cost))]}, "difficulty": {"$in": levels[:levels.index(difficulty)+1]}, "cuisine": {"$in": cuisines}})
#     res = [r for r in res]
#     for r in res:
#         r['_id'] = str(r['_id'])
#     return {"recipes": res}

@app.get("/recipe/{id}")
def search_recipe(id: str):
    res = collection.find_one({"_id": ObjectId(id)})
    res['_id'] = str(res['_id'])
    return {"recipe": res}

@app.get("/meal/{meal}")
def search_type(meal: str):
    if (meal == "apps"):
        res = collection.find({"meal": { "$in": ['Appetizers and Snacks', 'Dips and Spreads Recipes']}})
    elif (meal == "sides"):
        res = collection.find({"meal": { "$in": ['Soup Recipes', 'Soups, Stews and Chili Recipes', 'Salad', 'Vegetable Soup Recipes', 'Side Dish', 'Yeast Bread Recipes', 'Quick Bread Recipes', 'Bread']}})
    elif (meal == "breakfast"):
        res = collection.find({"meal": { "$in": ['Breakfast and Brunch']}})
    elif (meal == "lunch"):
        res = collection.find({"meal": { "$in": ['Slow Cooker', 'Main Dishes', 'Beef', 'Pork', 'Seafood Main Dishes', 'Vegetables', 'Pasta and Noodles', 'Casserole Recipes', 'Fruits and Vegetables', 'Seafood', 'Breakfast and Brunch', 'BBQ & Grilling', 'Meat and Poultry', 'Everyday Cooking', 'Soups, Stews and Chili Recipes', 'Pasta', 'Chicken', 'Cuisine', 'African', 'U.S Recipes', 'Thai', 'European', 'Japanese', 'Asian', 'Mexican', 'Korean', 'Indian', 'Latin American', 'Chinese', 'Italian', 'Spanish', 'Cuisine']}})
    elif (meal == "dinner"):
        res = collection.find({"meal": { "$in": ['Slow Cooker', 'Main Dishes', 'Beef', 'Pork', 'Seafood Main Dishes', 'Vegetables', 'Pasta and Noodles', 'Casserole Recipes', 'Fruits and Vegetables', 'Seafood', 'Dinner', 'BBQ & Grilling', 'Meat and Poultry', 'Everyday Cooking', 'Soups, Stews, and Chili Recipes', 'Pasta', 'Chicken', 'Cuisine', 'Christmas', 'Thanksgiving', 'Holidays and Events Recipes', 'African', 'U.S Recipes', 'Thai', 'European', 'Japanese', 'Asian', 'Mexican', 'Korean', 'Indian', 'Latin American', 'Chinese', 'Italian', 'Spanish', 'Cuisine']}})
    elif (meal == "desserts"):
        res = collection.find({"meal": { "$in": ['Fruit Bread Recipes', 'Desserts', 'Pies', 'Cookies']}})
    res = [r for r in res]
    for r in res:
        r['_id'] = str(r['_id'])
    return {"recipes": res}

@app.get("/query/{cost}/{difficulty}/{cuisines}/{meals}")
def search_query(cost: str, difficulty: str, cuisines: str, meals: str):
    cuisines = cuisines.split(",")
    cuisines = [c.title() for c in cuisines]
    levels = ["easy", "medium", "hard", "expert"]
    ms = list()
    if ("app" in meals):
        ms.extend(['Appetizers and Snacks', 'Dips and Spreads Recipes'])
    elif ("side" in meals):
        ms.extend(['Soup Recipes', 'Soups, Stews and Chili Recipes', 'Salad', 'Vegetable Soup Recipes', 'Side Dish', 'Yeast Bread Recipes', 'Quick Bread Recipes', 'Bread'])
    elif ("breakfast" in meals):
        ms.extend(['Breakfast and Brunch'])
    elif ("lunch" in meals):
        ms.extend(['Slow Cooker', 'Main Dishes', 'Beef', 'Pork', 'Seafood Main Dishes', 'Vegetables', 'Pasta and Noodles', 'Casserole Recipes', 'Fruits and Vegetables', 'Seafood', 'Breakfast and Brunch', 'BBQ & Grilling', 'Meat and Poultry', 'Everyday Cooking', 'Soups, Stews and Chili Recipes', 'Pasta', 'Chicken', 'Cuisine', 'African', 'U.S Recipes', 'Thai', 'European', 'Japanese', 'Asian', 'Mexican', 'Korean', 'Indian', 'Latin American', 'Chinese', 'Italian', 'Spanish', 'Cuisine'])
    elif ("dinner" in meals):
        ms.extend(['Slow Cooker', 'Main Dishes', 'Beef', 'Pork', 'Seafood Main Dishes', 'Vegetables', 'Pasta and Noodles', 'Casserole Recipes', 'Fruits and Vegetables', 'Seafood', 'Dinner', 'BBQ & Grilling', 'Meat and Poultry', 'Everyday Cooking', 'Soups, Stews, and Chili Recipes', 'Pasta', 'Chicken', 'Cuisine', 'Christmas', 'Thanksgiving', 'Holidays and Events Recipes', 'African', 'U.S Recipes', 'Thai', 'European', 'Japanese', 'Asian', 'Mexican', 'Korean', 'Indian', 'Latin American', 'Chinese', 'Italian', 'Spanish', 'Cuisine'])
    elif ("dessert" in meals):
        ms.extend(['Fruit Bread Recipes', 'Desserts', 'Pies', 'Cookies'])
    print("\n\n\n")
    print(ms)
    print("\n\n\n")
    res = collection.find({"cost": { "$in": ["$"*i for i in range(len(cost))]}, "difficulty": {"$in": levels[:levels.index(difficulty)+1]}, "cuisine": {"$in": cuisines}, "meal": { "$in": ms}})
    res = [r for r in res]
    for r in res:
        r['_id'] = str(r['_id'])
    return {"recipes": res}