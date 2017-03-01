module RecipesHelper
  def build_recipe_ingredients(recipe_params)
    recipe_params[:ingredients_attributes].each do |ingredient_index|
      if recipe_params[:ingredients_attributes][ingredient_index][:name] != ""
        ingredient = Ingredient.find_by(name: recipe_params[:ingredients_attributes][ingredient_index][:name])
        recipe_ingredient = RecipeIngredient.find_by(recipe_id: @recipe.id, ingredient_id: ingredient.id)
        recipe_ingredient.quantity = recipe_params[:ingredients_attributes][ingredient_index][:recipe_ingredients_attributes][ingredient_index][:quantity]
        recipe_ingredient.save
      end
    end
  end
end
