class IngredientsController < ApplicationController
  def index
    if params[:recipe_id]
      @recipe = Recipe.find(params[:recipe_id])
      @ingredients = @recipe.ingredients
    else
      @ingredients = Ingredient.all
    end
  end
end
