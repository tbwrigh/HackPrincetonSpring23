from pymongo import MongoClient

client = MongoClient("mongodb+srv://user:oxRRaRUcFKOslIyM@hackprinceton.jweat5l.mongodb.net/?retryWrites=true&w=majority")

db = client['hackprinceton']

# get the "recipes" collection
collection = db['recipes']

recipe = {'cuisine': 'Mexican', 'meal': 'Mexican', 'name': 'Mexican Tinga', 'total_time': '35 mins', 'serving': '8', 'rating': '4.5', 'ingredients': [('olive oil', '2 tablespoons'), ('onion, diced', '1 large'), ('stewed tomatoes', '1 (15 ounce) can'), ('chipotle peppers in adobo sauce, or to taste', '1 (7 ounce) can'), ('shredded cooked chicken meat', '2 pounds'), ('tostada shells', '16 '), ('sour cream', '½ cup')], 'steps': ['Heat oil in a saucepan over medium heat. Add onions and sauté until softened and translucent, about 5 minutes.', 'Meanwhile, purée stewed tomatoes and chipotle peppers in adobo sauce in a blender.', 'Pour puréed mixture over onions in the saucepan; add chicken and stir to combine. Cover and simmer for 20 minutes.', 'Mound chicken mixture onto tostada shells and garnish with sour cream.', 'Please note differences in ingredient amounts when following the magazine version of this recipe.'], 'calories': '402'}

result = collection.insert_one(recipe)
