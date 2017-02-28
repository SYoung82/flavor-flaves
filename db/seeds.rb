# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
ingredient1 = Ingredient.create(name: "Vegetable Oil")
ingredient2 = Ingredient.create(name: "Brocollie Florets")
ingredient3 = Ingredient.create(name: "Bell Pepper")
ingredient4 = Ingredient.create(name: "Carrot")
ingredient5 = Ingredient.create(name: "Soy Sauce")
ingredient6 = Ingredient.create(name: "Minced Garlic")
ingredient7 = Ingredient.create(name: "Ground Beef")
ingredient8 = Ingredient.create(name: "Cheddar Cheese")
ingredient9 = Ingredient.create(name: "Tomato")
ingredient10 = Ingredient.create(name: "Lettuce")
ingredient11 = Ingredient.create(name: "Bun")

recipe1 = Recipe.create(title: "Vegetable Stir Fry", directions: "Heat vegetable oil in a large wok or skillet over
                                                                  medium heat.  Add brocolli, bell pepper, carrot, and garlic.
                                                                  Cook and stir for 2 minutes.  Season with soy sauce.  Cook
                                                                  until vegetables are tender.  Emjoy.")

recipe2 = Recipe.create(title: "Cheeseburgers", directions: "Heat grill to medium.  Seperate ground beef into 4 equal portions
                                                             and form patties.  While grill is heating slice tomatos and Seperate
                                                             and clean 4 lettuce leaves.  Grill burger patties until browned then flip
                                                             and repeat.  Place burger patties on toasted buns and top with tomato,
                                                             lettuce, cheese, and any other desired condiments.")

recipe_ingredient1 = RecipeIngredient.create(recipe_id: 1, ingredient_id: 1, quantity: "1 tbsp")
recipe_ingredient2 = RecipeIngredient.create(recipe_id: 1, ingredient_id: 2, quantity: "1 cup")
recipe_ingredient3 = RecipeIngredient.create(recipe_id: 1, ingredient_id: 3, quantity: "1")
recipe_ingredient4 = RecipeIngredient.create(recipe_id: 1, ingredient_id: 4, quantity: "2")
recipe_ingredient5 = RecipeIngredient.create(recipe_id: 1, ingredient_id: 5, quantity: "3 tbsp")
recipe_ingredient6 = RecipeIngredient.create(recipe_id: 1, ingredient_id: 6, quantity: "1 clove")
recipe_ingredient7 = RecipeIngredient.create(recipe_id: 2, ingredient_id: 7, quantity: "1 lb")
recipe_ingredient8 = RecipeIngredient.create(recipe_id: 2, ingredient_id: 8, quantity: "1/2 cup")
recipe_ingredient9 = RecipeIngredient.create(recipe_id: 2, ingredient_id: 9, quantity: "1 medium")
recipe_ingredient10 = RecipeIngredient.create(recipe_id: 2, ingredient_id: 10, quantity: "4 leaves")
recipe_ingredient11 = RecipeIngredient.create(recipe_id: 2, ingredient_id: 11, quantity: "4")
