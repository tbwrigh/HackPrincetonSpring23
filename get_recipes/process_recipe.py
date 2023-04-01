from bs4 import BeautifulSoup
from urllib.request import urlopen
with urlopen('https://www.allrecipes.com/recipe/20967/amish-sugar-cakes/') as response:
    soup = BeautifulSoup(response, 'html.parser')

    meal = soup.find("li", {"id": "mntl-breadcrumbs__item_1-0-1"})
    meal = meal.text.strip()

    name = soup.find("h1", {"id": "article-heading_1-0"})
    name = name.text.strip()

    total_time_div = soup.findAll("div", string="Total Time:")
    total_time_parent_div = total_time_div[0].parent
    total_time = total_time_parent_div.find("div", {"class": "mntl-recipe-details__value"})
    total_time = total_time.text.strip()

    prep_time_div = soup.findAll("div", string="Prep Time:")
    prep_time_parent_div = prep_time_div[0].parent
    prep_time = prep_time_parent_div.find("div", {"class": "mntl-recipe-details__value"})
    prep_time = prep_time.text.strip()

    serving_div = soup.findAll("div", string="Servings:")
    serving_parent_div = serving_div[0].parent
    serving = serving_parent_div.find("div", {"class": "mntl-recipe-details__value"})
    serving = serving.text.strip()

    rating_div = soup.find("div", {"id": "mntl-recipe-review-bar__rating_1-0"})
    rating = rating_div.text.strip()

    ingredients_list = soup.find_all("li", {"class": "mntl-structured-ingredients__list-item"})

    ingredients = []

    for ingredient_li in ingredients_list:
        ing = ingredient_li.find("span", {"data-ingredient-name": "true"})
        ing = ing.text.strip()

        amount = ingredient_li.find("span", {"data-ingredient-quantity": "true"})
        amount = amount.text.strip()
        unit = ingredient_li.find("span", {"data-ingredient-unit": "true"})
        unit = unit.text.strip()

        ingredients.append((ing, amount, unit))

    
    steps_list = soup.find_all("p", {"class": "mntl-sc-block"})

    steps = []

    for step_p in steps_list:
        step = step_p.text.strip()
        steps.append(step)
    
    calories_td = soup.findAll("td", string="Calories")
    calories_parent_td = calories_td[0].parent
    calories = calories_parent_td.find("td", {"class": "type--dog-bold"})
    calories = calories.text.strip()

    
