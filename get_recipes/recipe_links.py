import bs4 as bs
from bs4 import BeautifulSoup
import urllib.request
from urllib.request import urlopen

from pymongo import MongoClient
def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    client = MongoClient("mongodb+srv://user:oxRRaRUcFKOslIyM@hackprinceton.jweat5l.mongodb.net/?retryWrites=true&w=majority")

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
for url in links:
    #print(url.get('href'))
    if 'world-cuisine' in str(url.get("href")) or 'us-recipes' in str(url.get("href")):
        source = urllib.request.urlopen(str(url.get("href"))).read()
        soup = bs.BeautifulSoup(source,'lxml')
        cuisine = url.text.strip()
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
                    'difficulty': 4*float(prep_time)/float(total_time) if prep_time != "?" and total_time != "?" else "?",
                    'serving': serving,
                    'rating': rating,
                    'ingredients': ingredients,
                    'steps': steps,
                    'calories': calories
                }

                insert_one_recipe(recipe)