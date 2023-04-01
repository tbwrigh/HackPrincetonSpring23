import bs4 as bs
from bs4 import BeautifulSoup
import urllib.request
from urllib.request import urlopen

from pymongo import MongoClient

def time_str_to_int(time):
    total = 0
    time = time.split(" ")
    if len(time) == 2:
        if time[1] == "hr" or time[1] == "hrs":
            return int(time[0]) * 60
        elif time[1] == "min" or time[1] == "mins":
            return int(time[0])
    elif len(time) == 4:
        return int(time[0]) * 60 + int(time[2])

def get_difficulty(total_time, prep_time, cook_time, ingredients, steps):
    if total_time == "?" or prep_time == "?" or cook_time == "?" or ingredients == "?" or steps == "?":
        return "medium"
    else:
        total_time = time_str_to_int(total_time)
        prep_time = time_str_to_int(prep_time)
        cook_time = time_str_to_int(cook_time)

        if total_time is None or prep_time is None or cook_time is None:
            return "medium"

        ingredients = len(ingredients)
        steps = len(steps)
        # return "easy" for 0-10, "medium" for 10-20, "hard" for 20-30 and "expert" for 30+ given scoring (prep_time+cook_time)/total_time * (ingredients + steps)
        score = (prep_time + cook_time) / total_time * (ingredients + steps)
        if score <= 10:
            return "easy"
        elif score <= 20:
            return "medium"
        elif score <= 30:
            return "hard"
        else:
            return "expert"
        
    

def get_cost(ing):
    used = 3
    cost = 1

    for i in ing:
        n = i[0].lower()
        if "roast" in n or "shrimp" in n or "oyster" in n or "clam" in n or "fish" in n or "beef" in n or ("ground" in n and ("pork" not in n and "chicken" not in n and "turkey" not in n)):
            cost += 4
            used += 1
        elif "cheese" in n or "butter" in n or "eggs" in n or "pork" in n:
            cost += 3
            used += 1
        elif "chicken" in n or "milk" in n or "can" in n or "fresh" in n:
            cost += 2
            used += 1
        elif "sugar" in n or "flour" in n or "turkey" in n or "bread" in n or "pasta" in n or "noodle" in n:
            cost += 1
            used += 1

        return int(round(cost/used)) * "$"


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    client = MongoClient("mongodb+srv://user:oxRRaRUcFKOslIyM@hackprinceton.vpkyri1.mongodb.net/?retryWrites=true&w=majority")

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['hackprinceton']

def get_collection():
    # Create a collection in the database
    return get_database()['recipes']

def insert_one_recipe(recipe):
    # Insert a document into the collection
    return get_collection().insert_one(recipe)


def process_recipe(url):
    with urlopen(url) as response:
        soup = BeautifulSoup(response, 'html.parser')

        meal = soup.find("li", {"id": "mntl-breadcrumbs__item_1-0-1"})
        if meal is None:
            meal = "?"
        else:
            meal = meal.text.strip()

        name = soup.find("h1", {"id": "article-heading_1-0"})
        if name is None:
            name = "?"
        else:
            name = name.text.strip()

        total_time_div = soup.findAll("div", string="Total Time:")
        if len(total_time_div) == 0:
            total_time = "?"
        else:
            total_time_parent_div = total_time_div[0].parent
            total_time = total_time_parent_div.find("div", {"class": "mntl-recipe-details__value"})
            total_time = total_time.text.strip()

        prep_time_div = soup.findAll("div", string="Prep Time:")
        if len(prep_time_div) == 0:
            prep_time = "?"
        else:
            prep_time_parent_div = prep_time_div[0].parent
            prep_time = prep_time_parent_div.find("div", {"class": "mntl-recipe-details__value"})
            prep_time = prep_time.text.strip()

        cook_time_div = soup.findAll("div", string="Cook Time:")
        if len(cook_time_div) == 0:
            cook_time = "?"
        else:
            cook_time_parent_div = cook_time_div[0].parent
            cook_time = cook_time_parent_div.find("div", {"class": "mntl-recipe-details__value"})
            cook_time = cook_time.text.strip()

        serving_div = soup.findAll("div", string="Servings:")
        if len(serving_div) == 0:
            serving = "?"
        else:
            serving_parent_div = serving_div[0].parent
            serving = serving_parent_div.find("div", {"class": "mntl-recipe-details__value"})
            serving = serving.text.strip()

        rating_div = soup.find("div", {"id": "mntl-recipe-review-bar__rating_1-0"})
        if rating_div is None:
            rating = "?"
        else:
            rating = rating_div.text.strip()

        ingredients_list = soup.find_all("li", {"class": "mntl-structured-ingredients__list-item"})

        ingredients = []

        for ingredient_li in ingredients_list:
            ing = ingredient_li.find("span", {"data-ingredient-name": "true"})
            ing = ing.text.strip()

            amount = ingredient_li.find("span", {"data-ingredient-quantity": "true"})
            amount = amount.text.strip()
            unit = ingredient_li.find("span", {"data-ingredient-unit": "true"})
            if unit is None:
                unit = ""
            else:
                unit = unit.text.strip()

            ingredients.append((ing, amount+" "+unit))

        
        steps_list = soup.find_all("p", {"class": "mntl-sc-block"})

        steps = []

        for step_p in steps_list:
            step = step_p.text.strip()
            steps.append(step)
        
        calories_td = soup.findAll("td", string="Calories")
        if len(calories_td) == 0:
            calories = "?"
        else:
            calories_parent_td = calories_td[0].parent
            calories = calories_parent_td.find("td", {"class": "type--dog-bold"})
            calories = calories.text.strip()

    return (meal, name, total_time, prep_time, cook_time, serving, rating, ingredients, steps, calories)

source = urllib.request.urlopen('https://www.allrecipes.com/cuisine-a-z-6740455').read()
soup = bs.BeautifulSoup(source,'lxml')
links = soup.find_all('a')
meals = set()
for url in links:
    #print(url.get('href'))

    if 'world-cuisine' in str(url.get("href")) or 'us-recipes' in str(url.get("href")):
        source = urllib.request.urlopen(str(url.get("href"))).read()
        soup = bs.BeautifulSoup(source,'lxml')
        cuisine = url.text.strip()
        #print(cuisine)
        names = set()
        food = set()
        for url in soup.find_all('a'):
            if 'recipe/' in str(url.get('href')):

                meal, name, total_time, prep_time, cook_time, serving, rating, ingredients, steps, calories = process_recipe(str(url.get('href')))

                recipe = {
                    'cuisine': cuisine,
                    'meal': meal,
                    'name': name,
                    'total_time': total_time,
                    'prep_time': prep_time,
                    'cook_time': cook_time,
                    'difficulty': get_difficulty(total_time, prep_time, cook_time, ingredients, steps),
                    'serving': serving,
                    'rating': rating,
                    'ingredients': ingredients,
                    'steps': steps,
                    'calories': calories,
                    'cost': get_cost(ingredients)
                }

                #print(recipe)

                # insert_one_recipe(recipe)

                meals.add(meal)
        
#print(meals)

apps = ['Appetizers and Snacks', 'Dips and Spreads Recipes']
sides = ['Soup Recipes', 'Soups, Stews and Chili Recipes', 'Salad', 'Vegetable Soup Recipes', 'Side Dish', 'Yeast Bread Recipes', 'Quick Bread Recipes', 'Bread']
breakfast = ['Breakfast and Brunch']
lunch = ['Slow Cooker', 'Main Dishes', 'Beef', 'Pork', 'Seafood Main Dishes', 'Vegetables', 'Pasta and Noodles', 'Casserole Recipes', 'Fruits and Vegetables', 'Seafood', 'Breakfast and Brunch', 'BBQ & Grilling', 'Meat and Poultry', 'Everyday Cooking', 'Soups, Stews and Chili Recipes', 'Pasta', 'Chicken', 'Cuisine', 'African', 'U.S Recipes', 'Thai', 'European', 'Japanese', 'Asian', 'Mexican', 'Korean', 'Indian', 'Latin American', 'Chinese', 'Italian', 'Spanish', 'Cuisine']
dinner = ['Slow Cooker', 'Main Dishes', 'Beef', 'Pork', 'Seafood Main Dishes', 'Vegetables', 'Pasta and Noodles', 'Casserole Recipes', 'Fruits and Vegetables', 'Seafood', 'Dinner', 'BBQ & Grilling', 'Meat and Poultry', 'Everyday Cooking', 'Soups, Stews, and Chili Recipes', 'Pasta', 'Chicken', 'Cuisine', 'Christmas', 'Thanksgiving', 'Holidays and Events Recipes', 'African', 'U.S Recipes', 'Thai', 'European', 'Japanese', 'Asian', 'Mexican', 'Korean', 'Indian', 'Latin American', 'Chinese', 'Italian', 'Spanish', 'Cuisine']
desserts = ['Fruit Bread Recipes', 'Desserts', 'Pies', 'Cookies']