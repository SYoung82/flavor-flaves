module RecipesHelper

  def build_recipe_ingredients(recipe_params)
    recipe_params[:ingredients_attributes].each do |ingredient_index|
      if recipe_params[:ingredients_attributes][ingredient_index][:name] != ""
        ingredient = Ingredient.find_by(name: recipe_params[:ingredients_attributes][ingredient_index][:name])
        recipe_ingredient = RecipeIngredient.find_by(recipe_id: @recipe.id, ingredient_id: ingredient.id)
        recipe_ingredient.quantity = recipe_params[:ingredients_attributes][ingredient_index][:recipe_ingredients_attributes]["0"][:quantity]
        recipe_ingredient.save
      end
    end
  end

  def build_default_quantities(recipe)
    recipe.recipe_ingredients.each do |recipe_ingredient|
      binding.pry
      if(recipe_ingredient.quantity == nil)
        recipe_ingredient.quantity = '1'
        recipe_ingredient.save
      end
    end
  end

  def create_or_destroy_user_recipe(params)
    ur = UserRecipe.find_by(user_id: params[:user_id], recipe_id: params[:id])
    if ur
      ur.destroy
      redirect_to root_path
    else
      UserRecipe.create(user_id: params[:user_id], recipe_id: params[:id])
      redirect_to root_path
    end
  end
end
